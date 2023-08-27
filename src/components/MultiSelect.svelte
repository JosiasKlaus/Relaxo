<script lang="ts">
    import { Chip, Group, Space } from "@svelteuidev/core";
    let values: string[] = [];
  
    export let data: string[];
    export let name: string;
    export let required: boolean = false;
    export let root: any;
  
    let selectValue: string | null;
  
    function onOptionSelect(event: CustomEvent<string>) {
      const value = event.detail ? event.detail : (event.target as HTMLSelectElement).value;
      values.push(value);
      data = data.filter((item) => item !== value);
      values = values;
      selectValue = null;
    }
  
    function onOptionRemove(option: string) {
      values = values.filter((item) => item !== option);
      data.push(option);
      data = data.sort((a, b) => a.localeCompare(b));
      selectValue = null;
    }
  </script>
  
  <input type="hidden" {name} bind:value={values} />
  <svelte:component this={root} {data} required={required && values.length < 1} {...$$restProps} on:change={onOptionSelect} bind:value={selectValue} />
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
  