<script lang="ts">
    import { NativeSelect, TextInput } from "@svelteuidev/core";
    import { createEventDispatcher, onMount } from "svelte";

    export let value: string | undefined;
    export let data: string[];

    const dispatch = createEventDispatcher();
    let selectValue: string | undefined;
    
    $: selectValue, handleSelect()

    function handleSelect() {
        if(selectValue === "Sonstiges") {
            value = "";
        } else {
            value = selectValue;
        }
    }

    onMount(() => {
        if(!data.includes("Sonstiges")) data = [...data, "Sonstiges"];
    });
</script>

<NativeSelect {data} {...$$restProps} bind:value={selectValue} on:change={() => dispatch('change', value)} />
{#if selectValue === "Sonstiges" }
    <TextInput placeholder="Bitte eingeben" bind:value on:change={() => dispatch('change', value)} />
{/if}
