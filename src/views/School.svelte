<script lang="ts">
  import { Alert, Group, Stack, TextInput } from "@svelteuidev/core";
  import { getSchoolInfo } from "../utils/service";
  import type { Principal, School } from "../types";
  import { application } from "../utils/service";
  import { t } from "../utils/i18n";

  let displayError: boolean = false;
  let schoolNumber: string;
  let principal: Principal = {};

  $: schoolNumber, updateSchoolInfo();
  $: principal, $application.principal = principal;

  function updateSchoolInfo() {
    if(schoolNumber && schoolNumber.length == 4) {
      getSchoolInfo(schoolNumber)
        .then((data: School) => {
          displayError = false;
          $application.school = data;
        })
        .catch((error) => {
          console.error(error);
          displayError = true;
          $application.school = {};
        });
    }
  }
</script>

<Stack spacing="sm">
  {#if displayError}
    <Alert title="Fehler">
      {$t('school.alert')}
    </Alert>
  {/if}
  <Group grow noWrap>
    <TextInput label={$t('school.number')} placeholder={$t('school.number.placeholder')} maxlength={4} minlength={4} bind:value={schoolNumber} required />
    <TextInput label={$t('school.type')} value={$application.school?.type || null} disabled />
  </Group>

  <Group grow noWrap>
    <TextInput label={$t('school.supervisor')} value={$application.school?.supervisor || null} disabled />
    <TextInput label={$t('school.legal')} value={$application.school?.legal || null} disabled />
  </Group>

  <TextInput label={$t('school.name')} value={$application.school?.name || null} disabled />
  <TextInput label={$t('school.street')} value={$application.school?.street || null} disabled />

  <Group grow noWrap>
    <TextInput label={$t('school.zip')} value={$application.school?.zipcode || null} disabled />
    <TextInput label={$t('school.city')} value={$application.school?.city || null} disabled />
  </Group>

  <Group grow noWrap>
    <TextInput label={$t('school.email')} value={$application.school?.email || null} disabled />
    <TextInput label={$t('school.phone')} value={$application.school?.phone || null} disabled />
  </Group>

  <TextInput label={$t('school.principal.name')} bind:value={principal.name} required />
  <TextInput label={$t('school.principal.email')} bind:value={principal.email} required />
</Stack>
