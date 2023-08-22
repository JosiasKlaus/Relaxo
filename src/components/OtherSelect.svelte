<script lang="ts">
    import { NativeSelect, TextInput } from "@svelteuidev/core";
    import { createEventDispatcher } from "svelte";

    let value: string;
    let other: boolean = false;
    export let data: string[];
    export let name: string | null = null;

    const dispatch = createEventDispatcher();
    
    function onSelectionChange(event: CustomEvent<string>) {
        const selectValue = (event.target as HTMLSelectElement).value;
        if(selectValue === "Sonstiges") {
            other = true;
        } else {
            other = false;
            value = selectValue;
            dispatch("change", value);
        }
    }

    function onOtherChange(event: CustomEvent<string>) {
        const inputValue = (event.target as HTMLInputElement).value;
        value = inputValue;
        dispatch("change", inputValue);
    }

    // Make sure other option exists in list of options
    if(!data.includes("Sonstiges")) {
        data.push("Sonstiges");
    }
</script>

{#if name != null}
    <input type="hidden" {name} bind:value={value} />
{/if}
<NativeSelect {data} {...$$restProps} on:change={onSelectionChange} />
{#if other }
    <TextInput placeholder="Bitte eingeben" on:change={onOtherChange} />
{/if}
