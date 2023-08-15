<script lang="ts">
    import { Button, Divider, Space } from "@svelteuidev/core";
    import { Eraser, Plus } from "radix-icons-svelte";
    import Entry from "./Entry.svelte";
    import { staff_cost, material_cost } from "../service";

    /* Handles adding and removing entries from group */
    let components = [Entry];

    function addEntry() {
        components = [...components, Entry];
    }

    function removeEntry(index: number) {
        components = components.filter((_, i) => i !== index);
    }

    /* Handling of entry component emitted custom events */
    const entry_costs = new Map<number, { staff: number; material: number }>();

    function onStaff(e: CustomEvent<{ index: number; value: number }>) {
        const { index, value } = e.detail;
        entry_costs.set(index, {
            ...entry_costs.get(index),
            staff: Number(value),
        });
        let cost = 0;
        entry_costs.forEach((entry) => {
            cost += entry.staff ? entry.staff : 0;
        });
        staff_cost.set(cost);
    }

    function onMaterial(e: CustomEvent<{ value: string; index: number }>) {
        const { index, value } = e.detail;
        entry_costs.set(index, {
            ...entry_costs.get(index),
            material: Number(value),
        });
        let cost = 0;
        entry_costs.forEach((entry) => {
            cost += entry.material ? entry.material : 0;
        });
        material_cost.set(cost);
    }
</script>

{#each components as entry, index}
    <Space h="xl" />
    {#if index == 0}
        <Divider label="Maßnahme {index + 1}" labelPosition="center" />
    {:else}
        <Divider labelPosition="center">
            <Button variant="subtle" size="xs" color="red" compact slot="label" type="button" on:click={() => { removeEntry(index); }}>
                <Eraser slot="rightIcon" /> Maßnahme {index + 1}
            </Button>
        </Divider>
    {/if}
    <Space h="xl" />
    <svelte:component this={entry} {index} on:staff={onStaff} on:material={onMaterial} />
{/each}
<Space h="xl" />
<Button type="button" variant="light" on:click={addEntry}>
    <Plus slot="leftIcon" />Weitere Maßnahme hinzufügen
</Button>
