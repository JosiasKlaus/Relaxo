<script lang="ts">
    import { CheckboxGroup, Group, NativeSelect, NumberInput, Stack } from "@svelteuidev/core";
    import { staff_options, staff_time_options_2023, staff_time_options_2024, year_options } from "../utils/constants";
    import { type Entry, type Staff } from "../types";
    import { currencyFormater } from "../utils/utils";
    import { application } from "../utils/service";
    import { onMount } from "svelte";

    export let staff: Staff;
    export let entry: Entry;
    let year: string;

    $: entry.year, resetEntry();
    onMount(() => {
        year = entry.year!;
    })

    function calculateCost() {
        if(!staff.type) return;
        if(staff.type === staff_options[1]) {
            staff.cost = ((staff.hours || 0)*40);
        } else if(staff.type === staff_options[2]) {
            staff.cost = ((staff.hours || 0)*46);
        } else if(staff.type === staff_options[3]) {
            staff.cost = ((staff.hours || 0)*41);
        } else if(staff.type === staff_options[4]) {
            staff.cost = 6746 * (staff.months || []).length * ((staff.percentage || 0) / 100);
        } else {
            staff.cost = 0;
        }
        $application = $application;
    }

    function onStaffTypeChange(event: CustomEvent<string>) {
        const selectValue = (event.target as HTMLSelectElement).value;
        if(selectValue === staff_options[0] || selectValue === staff_options[4]) {
            staff.hours = 0;
        }
        calculateCost();
    }

    function resetEntry() {
        if(entry.year !== year && staff.type === staff_options[4]) {
            year = entry.year!;
            staff.months = [];
            staff.cost = 0;
        }
    }
</script>

<Group spacing="md" grow noWrap>
    <NativeSelect
        label="Personalkosten" placeholder="Bitte auswählen"
        data={staff_options}
        required on:change={onStaffTypeChange}
        bind:value={staff.type}
    />
    <NumberInput
        label="Voraussichtliche Summe der Stunden (Gesamtzeitraum)"
        placeholder="0" min={0}
        disabled={staff.type === staff_options[0] || staff.type === staff_options[4]}
        required={staff.type !== staff_options[0] || staff.type !== staff_options[4]}
        on:change={() => calculateCost()} bind:value={staff.hours}
    />
    <NumberInput
        label="Voraussichtliche Kosten" placeholder="0"
        disabled bind:value={staff.cost} style="margin-top: auto;"
        formatter={(value) =>
            value && !Number.isNaN(parseFloat(value))
            ? currencyFormater.format(parseFloat(value))
            : currencyFormater.format(0)
        }
    />
</Group>
{#if staff.type === staff_options[4]}
    <Stack>
        <NumberInput
            label="In welchem Umfang soll das Personal voraussichtlich beschäftigt werden?"
            placeholder="50%" min={10} max={100} step={10}
            required on:change={() => calculateCost()} bind:value={staff.percentage}
            formatter={(value) =>
                value && !Number.isNaN(parseInt(value)) ? value + "%" : "0%"
            }
            parser={(value) =>
                value && !Number.isNaN(parseInt(value)) ? `${parseInt(value.replace("%", "")) % 10 * 10}` : "0"
            }
        />
        <CheckboxGroup
            label="Es ist der Einsatz für folgende Monate geplant:"
            color="blue" size="sm" items={entry.year == year_options[0] ? staff_time_options_2023 : staff_time_options_2024}
            on:change={() => calculateCost()} bind:value={staff.months}
        />
    </Stack>
{/if}
