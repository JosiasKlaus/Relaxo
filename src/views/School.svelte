<script lang="ts">
  import { Group, NumberInput, Stack, TextInput } from "@svelteuidev/core";
  import { createEventDispatcher } from "svelte";

  function onSchoolNumberChange(e: CustomEvent<number>) {
    const value: string = e.detail.toString();
    if (value.length == 4) {
      dispatch("schoolNumberChange", value);
    }
  }

  const dispatch = createEventDispatcher();
</script>

<Stack spacing="sm">
  <Group grow>
    <NumberInput
      hideControls
      placeholder="0001"
      label="Schulnummer"
      name="school_number"
      maxlength={4}
      minlength={4}
      required={true}
      on:change={onSchoolNumberChange}
    />
    <TextInput label="Schultyp" disabled required={false} name="school_type" />
  </Group>

  <Group grow>
    <TextInput
      label="Schulaufsicht"
      disabled
      required={false}
      name="school_supervisor"
    />
    <TextInput
      label="Rechtsstellung"
      disabled
      required={false}
      name="school_legaltype"
    />
  </Group>

  <TextInput
    label="Name der Schule"
    disabled
    required={false}
    name="school_name"
  />

  <Group grow>
    <TextInput label="Straße" disabled required={false} name="school_street" />
    <TextInput
      label="Hausnummer"
      disabled
      required={false}
      name="school_number"
    />
  </Group>

  <Group grow>
    <TextInput
      label="Postleitzahl"
      disabled
      required={false}
      name="school_zipcode"
    />
    <TextInput label="Ort" disabled required={false} name="school_city" />
  </Group>

  <Group grow>
    <TextInput label="E-Mail" disabled required={false} name="school_email" />
    <TextInput
      label="Telefonnummer"
      disabled
      required={false}
      name="school_phone"
    />
  </Group>

  <TextInput
    label="Name der Schulleitung"
    required={true}
    name="school_principal_name"
  />
  <TextInput
    label="E-Mail der Schulleitung"
    required={true}
    name="school_principal_email"
  />
</Stack>
