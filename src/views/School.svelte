<script lang="ts">
  import { Alert, Group, NumberInput, Stack, TextInput } from "@svelteuidev/core";
  import { InfoCircled } from "radix-icons-svelte";
  import { getSchoolInfo } from "../service";

  let displayError: boolean = false;
  let school: School = {};

  function onChange(e: CustomEvent<number>) {
    const value: string = e.detail.toString();
    if (value.length == 4) {
      getSchoolInfo(value)
        .then((data: School) => {
          displayError = false;
          school = data;
        })
        .catch((error) => {
          console.error(error);
          displayError = true;
          Object.keys(school).forEach((key) => (school[key] = null));
        });
    }
  }
</script>

<Stack spacing="sm">
  {#if displayError}
    <Alert icon={InfoCircled} title="Fehler">
      Die angegebene Schulnummer ist entweder nicht gültig oder ein Fehler bei
      der Serverkommunikation ist Aufgetreten. Bitte überprüfen Sie Ihre Eingabe
      oder versuchen Sie es später erneut. Sollte der Fehler weiterhin bestehen,
      wenden Sie sich bitte an den Support.
    </Alert>
  {/if}
  <Group grow noWrap>
    <NumberInput hideControls required label="Schulnummer" placeholder="0001" name="number" maxlength={4} minlength={4} on:change={onChange} />
    <TextInput label="Schultyp" disabled bind:value={school.type} />
  </Group>

  <Group grow noWrap>
    <TextInput label="Schulaufsicht" bind:value={school.supervisor} disabled />
    <TextInput label="Rechtsstellung" bind:value={school.legal} disabled />
  </Group>

  <TextInput label="Name der Schule" bind:value={school.name} disabled />
  <TextInput label="Straße & Hausnummer" bind:value={school.street} disabled />

  <Group grow noWrap>
    <TextInput label="Postleitzahl" bind:value={school.zipcode} disabled />
    <TextInput label="Ort" bind:value={school.city} disabled />
  </Group>

  <Group grow noWrap>
    <TextInput label="E-Mail" bind:value={school.email} disabled />
    <TextInput label="Telefonnummer" bind:value={school.phone} disabled />
  </Group>

  <TextInput label="Name der Schulleitung" required name="name" />
  <TextInput label="E-Mail der Schulleitung" required name="email" />
</Stack>
