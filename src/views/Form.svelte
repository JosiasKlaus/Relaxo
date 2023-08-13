<script lang="ts">
  import {
    Title,
    Text,
    Stack,
    Group,
    Checkbox,
    Button,
    Divider,
    Space,
  } from "@svelteuidev/core";
  import School from "./School.svelte";
  import Entry from "./Entry.svelte";
  import { Container, Eraser, Plus } from "radix-icons-svelte";

  let components = [Entry];
  function addEntry() {
    components = [...components, Entry];
  }

  function removeEntry(index: number) {
    components = components.filter((_, i) => i !== index);
  }

  function onSubmit(e: Event) {
    const data = new FormData(e.target as HTMLFormElement);
    const json = Object.fromEntries(data.entries());
    console.log(json);
  }

  /* Handling of entry component emitted custom events to display cost sums */
  const entry_costs = new Map<number, { staff: number; material: number }>();
  let staff_cost = 0,
    material_cost = 0;

  function onStaffCostChange(e: CustomEvent<{ index: number; value: number }>) {
    const { index, value } = e.detail;
    entry_costs.set(index, { ...entry_costs.get(index), staff: Number(value) });
    staff_cost = 0;
    entry_costs.forEach(
      (costs) => (staff_cost += costs.staff ? costs.staff : 0)
    );
  }

  function onMaterialCostsChange(
    e: CustomEvent<{ value: string; index: number }>
  ) {
    const { index, value } = e.detail;
    entry_costs.set(index, {
      ...entry_costs.get(index),
      material: Number(value),
    });
    material_cost = 0;
    entry_costs.forEach(
      (costs) => (material_cost += costs.material ? costs.material : 0)
    );
  }
</script>

<form on:submit|preventDefault={onSubmit}>
  <!-- Header -->
  <Stack>
    <Title order={1}>Antragsformular Löwenstark</Title>
    <Space h="md" />
    <Text size="lg" align="justify" style="line-height: 1.5;">
      Das Hessische Landesprogramm „Löwenstark – der BildungsKICK“ unterstützt
      Schülerinnen und Schüler dabei, die entstandenen Lernrückstände infolge
      der Corona-Pandemie zu kompensieren. Zu Beginn des Schuljahres 2023/2024
      besteht für öffentliche Schulen die Möglichkeit, zusätzliche Mittel (für
      Personal- oder Sachkosten) zur Kompensation pandemiebedingter
      Förderbedarfe zu beantragen.
    </Text>
    <Text size="lg" weight={"bold"} align="justify" style="line-height: 1.5;">
      Wichtig! Bitte beachten Sie, dass für die Verausgabung von Maßnahmen
      entsprechend des Erlasses vom 01.08.2023 „Dezentrale
      Kompensationsmaßnahmen für pandemiebedingte Förderbedarfe“ grundsätzlich
      gilt, dass es sich um eine Maßnahme zur Kompensation pandemiebedingter
      Förderbedarfe handeln muss, damit diese über das zweckgebundene Budget
      finanziert werden kann. Eine Abstimmung mit dem zuständigen staatlichen
      Schulamt ist wie je nach Art und Umfang der Maßnahme erforderlich.
    </Text>
  </Stack>

  <!-- School -->
  <Space h="xl" />
  <Divider
    label="Schulinformationen"
    labelPosition="center"
  />
  <Space h="xl" />
  <School />

  <!-- Entries -->
  {#each components as component, index}
    <Space h="xl" />
    {#if index == 0}
      <Divider
        label="Maßnahme {index + 1}"
        labelPosition="center"
      />
    {:else}
      <Divider labelPosition="center">
        <Button
          variant="subtle"
          size="xs"
          color="red"
          compact
          slot="label"
          type="button"
          on:click={() => {
            removeEntry(index);
          }}
        >
          <Eraser slot="rightIcon" /> Maßnahme {index + 1}
        </Button>
      </Divider>
    {/if}
    <Space h="xl" />
    <svelte:component
      this={component}
      {index}
      on:staff_cost_change={onStaffCostChange}
      on:material_cost_change={onMaterialCostsChange}
    />
  {/each}
  <Space h="xl" />
  <Button type="button" variant="light" on:click={addEntry}>
    <Plus slot="leftIcon" />Weitere Maßnahme hinzufügen
  </Button>

  <!-- Footer -->
  <Space h="xl" />
  <Divider
    label="Zusammenfassung"
    labelPosition="center"
  />
  <Space h="xl" />
  <Stack>
    <Text size="lg" weight={"bold"} align="justify" style="line-height: 1.5;">
      Hiermit beantrage ich für die Umsetzung des Landesprogramms „Löwenstark –
      der BildungsKICK“ zusätzliche Mittel für in Höhe von
    </Text>
    <Text size="lg" style="line-height: 2;">
      {staff_cost}€ für Personalausgaben und<br />
      {material_cost}€ für Sachausgaben
    </Text>
    <Text size="lg" align="justify" style="line-height: 1.5;">
      Bitte senden Sie das Formular nach dem Ausfüllen ab. Drucken Sie das
      Formular aus und senden Sie den unterschriebenen Ausdruck an:
    </Text>
    <Text size="lg" weight={"bold"} align="justify" style="line-height: 1.5;">
      Hessisches Kultusministerium<br />
      Referat I.3<br />
      z. Hd. Herrn Florian Dierschke<br />
      Luisenplatz 10<br />
      65185 Wiesbaden<br />
    </Text>

    <Text size="lg" align="justify" style="line-height: 1.5;">
      Die Durchführung aller Angebote steht unter dem Vorbehalt der im Haushalt
      verfügbaren Mittel des aktuellen Haushaltsjahres. Bei der Antragsprüfung
      wird das Datum des elektronischen Eingangs im Hessischen Kultusministerium
      berücksichtigt.
    </Text>
    <Space h="xl" />
    <Group noWrap>
      <Checkbox
        label="Ich habe die Datenschutzbestimmungen gelesen und erkläre mich damit einverstanden."
        name="terms_and_conditions"
      />
      <Button style="margin-left: auto; max-width: fit-content;" type="submit"
        >Abschicken</Button
      >
    </Group>
  </Stack>
</form>
