<script lang="ts">
  import { Chip, Group, NativeSelect } from "@svelteuidev/core";
  let values: string[] = [];

  export let options: string[];
  export let label: string;
  export let description: string;
  export let name: string;
  export let required: boolean;

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
    options = options;
  }
</script>

<input type="hidden" {name} bind:value={values} />
<NativeSelect data={options} {label} {description} required={required && values.length == 0} placeholder="Bitte auswählen" on:change={onOptionSelect} />
{#if values.length > 0}
  <Group spacing="md" style="margin-top: 0.5rem;">
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
{/if}
