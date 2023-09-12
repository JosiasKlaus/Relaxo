<script lang="ts">
    import { Button, Divider, Space } from "@svelteuidev/core";
    import { Eraser, Plus } from "radix-icons-svelte";
    import type { Entry } from "../types";
    import Action from "./Action.svelte";
    import { application } from "../utils/service";

    function addEntry() {
        $application.entries = [...$application.entries || [], { staff: [{}], material: [{}], summary: {}}];
    }

    function removeEntry(entry: Entry) {
        $application.entries?.filter((e) => e !== entry);
    }
</script>

{#each $application.entries || [] as entry, index}
    <Space h="xl" />
    {#if index == 0}
        <Divider label="Maßnahme {index + 1}" labelPosition="center" />
    {:else}
        <Divider labelPosition="center">
            <Button variant="subtle" size="xs" color="red" compact slot="label" type="button" on:click={() => { removeEntry(entry); }}>
                <Eraser slot="rightIcon" /> Maßnahme {index + 1}
            </Button>
        </Divider>
    {/if}
    <Space h="xl" />
    <Action {entry} {index} />
{/each}
<Space h="xl" />
<Button type="button" variant="light" on:click={addEntry}>
    <Plus slot="leftIcon" />Weitere Maßnahme hinzufügen
</Button>
