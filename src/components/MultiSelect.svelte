<script lang="ts">
  import { Chip, Group, NativeSelect, Space } from "@svelteuidev/core";
  let values: string[] = [];

  export let options: string[];
  export let label: string;
  export let description: string;
  export let name: string;
  export let required: boolean;

  let selectValue: string;

  function onOptionSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    values.push(target.value);
    options = options.filter((item) => item !== target.value);
    values = values;
    target.value = "";
  }

  function onOptionRemove(option: string) {
    values = values.filter((item) => item !== option);
    options.push(option);
    options = options.sort((a, b) => a.localeCompare(b));
    selectValue = null;
  }
</script>

<input type="hidden" {name} bind:value={values} />
<NativeSelect data={options} {label} {description} required={required && values.length == 0} placeholder="Bitte auswählen" on:change={onOptionSelect} bind:value={selectValue} />
{#if values.length > 0}
  <Space />
  <Group spacing="md">
    {#each values as item}
      <Chip
        checked={false}
        label={item}
        variant="filled"
        on:click={() => {
          onOptionRemove(item);
        }}
      />
    {/each}
  </Group>
  <Space />
{/if}
