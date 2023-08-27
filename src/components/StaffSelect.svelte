<script lang="ts">
    import { CheckboxGroup, Group, NativeSelect, NumberInput, Stack } from "@svelteuidev/core";
    import { staff_options, staff_time_options, type Staff } from "../constants";
    import { createEventDispatcher } from "svelte";
    import { currencyFormater } from "../utils";

    export let prefix: string;
    let value: Staff = { prefix: prefix };

    const dispatch = createEventDispatcher();

    function calculateCost() {
        if(!value.type || value.hours == null || value.hours == undefined) return;
        if(value.type === staff_options[1]) {
            value = { ...value, cost: value.hours*40 };
        } else if(value.type === staff_options[2]) {
            value = { ...value, cost: value.hours*46 };
        } else if(value.type === staff_options[3]) {
            value = { ...value, cost: value.hours*41 };
        } else if (value.type === staff_options[4]) {
            if(!value.percentage || !value.months || value.months.length < 1) return;
            value.cost = 6746 * value.months.length * (value.percentage / 100);
        }
        dispatch("change", value);
    }
</script>

<input type="hidden" name="{prefix}_cost" bind:value={value.cost} />
<Group spacing="md" grow noWrap>
    <NativeSelect
        label="Personalkosten" placeholder="Bitte auswählen"
        name="{prefix}_type" data={staff_options}
        required on:change={() => calculateCost()}
        bind:value={value.type}
    />
    <NumberInput
        label="Voraussichtliche Summe der Stunden (Gesamtzeitraum)"
        placeholder="0" name="{prefix}_hours" min={0}
        disabled={value.type === staff_options[0]}
        required={value.type !== staff_options[0]}
        on:change={() => calculateCost()} bind:value={value.hours}
    />
    <NumberInput
        label="Voraussichtliche Kosten" placeholder="0"
        disabled bind:value={value.cost}
        formatter={(value) =>
            value && !Number.isNaN(parseFloat(value))
            ? currencyFormater.format(parseFloat(value))
            : currencyFormater.format(0)
        }
    />
</Group>
{#if value.type === staff_options[4]}
    <Stack>
        <NumberInput
            label="In welchem Umfang soll das Personal voraussichtlich beschäftigt werden?"
            placeholder="50%" min={10} max={100} step={10} name="{prefix}_staff_percentage"
            required on:change={() => calculateCost()} bind:value={value.percentage}
            formatter={(value) =>
                value && !Number.isNaN(parseInt(value)) ? value + "%" : "0%"
            }
            parser={(value) =>
                value && !Number.isNaN(parseInt(value)) ? `${parseInt(value.replace("%", "")) % 10 * 10}` : "0"
            }
        />
        <input type="hidden" name="{prefix}_staff_months" bind:value={value.months} />
        <CheckboxGroup
            label="Es ist der Einsatz für folgende Monate geplant:"
            color="blue" size="sm" items={staff_time_options}
            on:change={() => calculateCost()} bind:value={value.months}
        />
    </Stack>
{/if}
