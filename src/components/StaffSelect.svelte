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
            value.cost = 6746 * value.months.length * (value.percentage / 100);
        }
        dispatch("change", value);
    }
</script>

<Group spacing="md" grow noWrap>
    <NativeSelect
        label="Personalkosten" placeholder="Bitte auswählen"
        name="{prefix}_staff_type" data={staff_options}
        required on:change={() => calculateCost()}
        bind:value={value.type}
    />
    <NumberInput
        label="Voraussichtliche Summe der Stunden (Gesamtzeitraum)"
        placeholder="0" name="{prefix}_staff_hours" min={0}
        disabled={value.type === staff_options[0]}
        required={value.type !== staff_options[0]}
        on:change={() => calculateCost()} bind:value={value.hours}
    />
    <NumberInput
        label="Voraussichtliche Kosten" placeholder="0"
        name="{prefix}_staff_cost" disabled bind:value={value.cost}
        formatter={(value) =>
            !Number.isNaN(parseFloat(value))
            ? currencyFormater.format(parseFloat(value)) : null
        }
    />
</Group>
{#if value.type === staff_options[4]}
    <Stack>
        <NumberInput
            label="In welchem Umfang soll das Personal voraussichtlich beschäftigt werden?"
            placeholder="50%" min={10} max={100} step={10} name="{prefix}_staff_percentage"
            required on:change={() => calculateCost()} bind:value={value.percentage}
        />
        <input type="hidden" name="{prefix}_staff_months" bind:value={value.months} />
        <CheckboxGroup
            label="Es ist der Einsatz für folgende Monate geplant:"
            color="blue" size="sm" items={staff_time_options}
            on:change={() => calculateCost()} bind:value={value.months}
        />
    </Stack>
{/if}
