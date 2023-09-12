<script lang="ts">
    import { Chip, Group, Space } from "@svelteuidev/core";
    let values: string[] = [];
  
    export let value: string | undefined;
    export let data: string[];
    export let required: boolean = false;
    export let root: any;
  
    let unique = {}
    let selectValue: string | undefined;

    function addOption() {
      if (selectValue) {
        values = [...values, selectValue];
        data = data.filter((item) => item !== selectValue);
        value = values.join(", ");
        unique = {}
      }
    }
  
    function onOptionRemove(option: string) {
      values = values.filter((item) => item !== option);
      data.push(option);
      data = data.sort((a, b) => a.localeCompare(b));
      unique = {}
    }
  </script>
  
  {#key unique}
    <svelte:component this={root} {data} required={required && values.length < 1} {...$$restProps} bind:value={selectValue} on:change={addOption} />
  {/key}
  {#if values.length > 0}
    <Space />
    <Group spacing="md">
      {#each values as item}
        <Chip label={item} variant="filled" on:click={() => {
            onOptionRemove(item);
          }}
        />
      {/each}
    </Group>
    <Space />
  {/if}
  