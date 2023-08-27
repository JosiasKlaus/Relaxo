<script lang="ts">
    import { Button, Space, Text, Title } from "@svelteuidev/core";
    import { type Material, type Staff } from "../constants";
    import StaffSelect from "../components/StaffSelect.svelte";
    import MaterialSelect from "../components/MaterialSelect.svelte";
    import { Plus } from "radix-icons-svelte";
    import { material_map, staff_map } from "../service";
    
    export let index: number;

    /* Event handlers & dispatchers */
    let staff_components = [StaffSelect];
    let material_components = [MaterialSelect];

    let staff_cost: Map<string, number> = new Map<string, number>();
    let material_cost: Map<string, number> = new Map<string, number>();

    let staff_sum: number = 0;
    let material_sum: number = 0;

    function addStaff() {
        staff_components = [...staff_components, StaffSelect];
    }

    function addMaterial() {
        material_components = [...material_components, MaterialSelect];
    }

    function onStaffChange(event: CustomEvent<Staff>) {
        if(!event.detail.cost) return;
        staff_cost.set(event.detail.prefix, event.detail.cost);
        const cost = [...staff_cost.values()].reduce((a, b) => a + b, 0);
        staff_sum = cost;
        staff_map.update((map) => map.set(index, cost));
    }

    function onMaterialChange(event: CustomEvent<Material>) {
        if(!event.detail.cost) return;
        material_cost.set(event.detail.prefix, event.detail.cost);
        const cost = [...material_cost.values()].reduce((a, b) => a + b, 0);
        material_sum = cost;
        material_map.update((map) => map.set(index, cost));
    }
</script>

<Title order={3}>Angaben zu geplanten Personal- und Sachkosten</Title>
<Space />
<Text size="lg" align="justify" style="line-height: 1.5;">
    Bitte schlüsseln Sie das voraussichtlich eingesetzte Personal nach dem
    Anstellungsverhältnis und nach dem voraussichtlichen Unterrichtseinsatz
    (Gesamtanzahl der Stunden) auf. Befindet sich die Maßnahme noch in Planung,
    geben Sie bitte eine Schätzung an.
</Text>
<Text size="lg" weight={"bold"} align="justify" style="line-height: 1.5;">
    Bitte beachten Sie, dass der Durchschnittswert ausschließlich als Grundlage
    zur Berechnung dient und nicht das zu erwartende Gehalt der jeweiligen
    Personen darstellt.
</Text>
<Space />
{#each staff_components as component, staff_index}
    <svelte:component this={component} prefix="entry_{index}_cost_staff_{staff_index}" on:change={onStaffChange} />    
{/each}
<Button type="button" variant="light" on:click={() => addStaff()}>
    <Plus slot="leftIcon" />Weiteres Personal hinzufügen
</Button>
<Space />
{#each material_components as component, material_index}
    <svelte:component this={component} prefix="entry_{index}_cost_material_{material_index}" on:change={onMaterialChange} />    
{/each}
<Button type="button" variant="light" on:click={() => addMaterial()}>
    <Plus slot="leftIcon" />Weitere Sachkosten hinzufügen
</Button>
<Space />
<input type="hidden" name="entry_{index}_cost_sum_staff" bind:value={staff_sum} />
<input type="hidden" name="entry_{index}_cost_sum_material" bind:value={material_sum} />
