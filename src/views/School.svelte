<script lang="ts">
  import { Group, NumberInput, Stack, TextInput } from "@svelteuidev/core";
  import { BACKEND_URL } from "../main";
  
  let school: School = {};
  function onSchoolNumberChange(e: CustomEvent<number>) {
    const value: string = e.detail.toString();
    if (value.length == 4) {
      fetch(`${BACKEND_URL}/info?schoolNumber=${value}`)
        .then((response) => {
          if(!response.ok) throw new Error(response.statusText);
          response.json().then((data: School) => {
            console.log("1");
            school = data; console.log(data);
          }).catch((error) => {
            console.log("2");
            console.error(error);
          });
        })
        .catch((error) => {
          console.log("3");
          console.error(error);
        });
    }
  }
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
    <TextInput label="Schultyp" disabled bind:value={school.type} />
  </Group>

  <Group grow>
    <TextInput label="Schulaufsicht" bind:value={school.supervisor} disabled />
    <TextInput label="Rechtsstellung" bind:value={school.legal} disabled />
  </Group>

  <TextInput label="Name der Schule" bind:value={school.name} disabled />
  <TextInput label="Straße & Hausnummer" bind:value={school.address} disabled />

  <Group grow>
    <TextInput label="Postleitzahl" bind:value={school.zipcode} disabled />
    <TextInput label="Ort" bind:value={school.city} disabled />
  </Group>

  <Group grow>
    <TextInput label="E-Mail" bind:value={school.email} disabled />
    <TextInput label="Telefonnummer" bind:value={school.phone} disabled />
  </Group>

  <TextInput label="Name der Schulleitung" required={true} name="name" />
  <TextInput label="E-Mail der Schulleitung" required={true} name="email" />
</Stack>
