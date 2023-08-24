<script lang="ts">
    import { Group, NativeSelect, NumberInput } from "@svelteuidev/core";
    import { material_options, type Material } from "../constants";
    import { createEventDispatcher } from "svelte";

    export let prefix: string;
    let value: Material = { prefix: prefix, type: material_options[0], cost: 0 };

    const dispatch = createEventDispatcher();
</script>

<Group spacing="md" grow noWrap>
    <NativeSelect
        label="Sachkosten" placeholder="Bitte auswählen"
        name="{prefix}_material_type" data={material_options}
        required bind:value={value.type}
    />
    <NumberInput
        label="voraussichtlicher Gesamtbetrag der Sachkosten (in €)"
        placeholder="0,00€" name="{prefix}_material_cost" min={0}
        disabled={value.type === material_options[0]}
        required={value.type !== material_options[0]}
        on:change={() => dispatch("change", value)}
        bind:value={value.cost}
    />
</Group>