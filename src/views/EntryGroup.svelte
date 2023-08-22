<script lang="ts">
    import { Button, Divider, Space } from "@svelteuidev/core";
    import { Eraser, Plus } from "radix-icons-svelte";
    import Entry from "./Entry.svelte";

    /* Handles adding and removing entries from group */
    let components = [Entry];

    function addEntry() {
        components = [...components, Entry];
    }

    function removeEntry(index: number) {
        components = components.filter((_, i) => i !== index);
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
    <svelte:component this={entry} {index} />
{/each}
<Space h="xl" />
<Button type="button" variant="light" on:click={addEntry}>
    <Plus slot="leftIcon" />Weitere Maßnahme hinzufügen
</Button>
