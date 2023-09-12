<script lang="ts">
  import { Button, NativeSelect, NumberInput, Space, Stack, Text, Title } from "@svelteuidev/core";
  import { type_options, grade_options, subject_options, year_options, staff_options } from "../utils/constants";
  import { Plus } from "radix-icons-svelte";
  import type { Entry } from "../types";

  import MultiSelect from "../components/MultiSelect.svelte";
  import OtherSelect from "../components/OtherSelect.svelte";
  import StaffSelect from "../components/StaffSelect.svelte";
  import MaterialSelect from "../components/MaterialSelect.svelte";

  import { t } from "../utils/i18n";
  import { application } from "../utils/service";
  
  export let entry: Entry;
  export let index: number;
  $: $application, entry.staff_count = entry.staff.filter((staff) => staff.type && staff.type !== staff_options[0]).length;
</script>

<Stack spacing="sm">
  <NativeSelect
    label={$t('entry.type.label')} placeholder={$t('select.placeholder')}
    data={year_options} bind:value={entry.year} on:change={() => $application = $application} required
  />
  <OtherSelect
    label={$t('entry.type.label')} placeholder={$t('select.placeholder')}
    data={type_options} bind:value={entry.type} required
  />
  <MultiSelect
    label={$t('entry.grades.label')} placeholder={$t('select.placeholder')}
    description={$t('entry.grades.description')} data={grade_options}
    root={OtherSelect} bind:value={entry.grades} required
  />
  <MultiSelect
    label={$t('entry.subjects.label', { index: index + 1 })} placeholder={$t('select.placeholder')}
    description={$t('entry.subjects.description')} data={subject_options}
    root={OtherSelect} bind:value={entry.subjects} required
  />
  <NumberInput
    label={$t('entry.students.label', { index: index + 1 })} placeholder="0"
    bind:value={entry.students} required
  />
  <Space />
  <Title order={3}>{$t('entry.cost.title')}</Title>
  <Space />
  <Text size="lg" align="justify" style="line-height: 1.5;">
    {$t('entry.cost.intro')}
  </Text>
  <Text size="lg" weight={"bold"} align="justify" style="line-height: 1.5;">
    {$t('entry.cost.notice')}
  </Text>
  <Space />
  {#each entry.staff as staff}
    <StaffSelect {staff} {entry} />
  {/each}
  <Button type="button" variant="light" on:click={() => (entry.staff = [...entry.staff, {}])}>
    <Plus slot="leftIcon" />{$t('entry.cost.button.staff')}
  </Button>
  <Space />
  {#each entry.material as material}
    <MaterialSelect {material} on:change={() => $application = $application}/>
  {/each}
  <Button type="button" variant="light"on:click={() => (entry.material = [...entry.material, {}])}>
    <Plus slot="leftIcon" />{$t('entry.cost.button.material')}
  </Button>
  <Space />
  <NumberInput
    label={$t('entry.staff.label')} placeholder="0"
    description={$t('entry.staff.description')}
    value={entry.staff_count} disabled
  />
</Stack>
