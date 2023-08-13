<script lang="ts">
  import { Group, NativeSelect, NumberInput, Stack } from "@svelteuidev/core";
  import MultiSelect from "../components/MultiSelect.svelte";
  import { createEventDispatcher } from 'svelte'

  export let index: number;

  /* Native-/Multiselect options */
  const type_options = [
    "zusätzliche Förderkurse", "eine individuelle Lernbegleitung im Unterricht",
    "Unterricht in einem über die Stundentafel hinausgehenden Umfang",
    "eine Hausaufgabenbetreuung", "eine organisierte (Online-) Nachhilfe",
    'eine zweiteilige Teilung von Lerngruppen (sog. "Doppelstreckung")',
    "Lernangebote in den Ferien", "kulturelle Angebote", "Gelegenheiten zur körperlichen Bewegung",
    "sozialpädagogische und psychologische Unterstützung"
  ];

  const staff_options = [
    'kein Personal',
    'Mehrarbeit Teilz. BEA gehob. Dienst',
    'Mehrarbeit Teilz. BEA höh. Dienst',
    'Mehrarb./ÜSt. Teilz. TV-H',
    'Beschäftigung Befristeter TV-H Kräfte',
    'Mehrarbeit. Teilz. Personal zur unterrichtsunterstützenden sozialpädergogischen Förderung'
  ];

  const staff_cost_map = {
    0: 0,
    1: 5.01,
    2: 5.02,
    3: 5.03,
    4: 5.04,
    5: 5.05
  }

  const material_options = [
    "keine Sachmittel", "Sachmittel für sonstige Landesaufgaben (unter 410EUR)",
    "Dienstleistungsvertrag", "Finanzierung von diagnostischen Materialien",
    "Sachmittel im Rahmen des 10.000EUR Erlasses"
  ];

  const grade_options = [
    "Jahrgangsstufe 1", "Jahrgangsstufe 2", "Jahrgangsstufe 3", "Jahrgangsstufe 4",
    "Jahrgangsstufe 5", "Jahrgangsstufe 6", "Jahrgangsstufe 7",  "Jahrgangsstufe 8",
    "Jahrgangsstufe 9", "Jahrgangsstufe 10", "E-Phase", "Q-Phase"
  ];

  const subject_options = [
    "Deutsch", "Englisch", "Mathematik", "Französisch", "Spanisch", "Sport",
    "Religion/Ethik", "Musik", "Kunst", "Biologie", "Chemie", "Physik", "Erdkunde",
    "Politik und Wirtschaft", "Geschichte"
  ];

  /* Event handlers & dispatchers */
  let staff_hours, material_cost;
  let staff_houry_cost = staff_cost_map[0];
  let material_cost_disabled = true;
  const dispatch = createEventDispatcher()

  function onStaffChange(event: CustomEvent<HTMLInputElement>) {
    const value = (event.target as HTMLInputElement).value;
    if (value === staff_options[0]) {
      staff_hours = null;
    }
    staff_houry_cost = staff_cost_map[staff_options.indexOf(value)];
    dispatch('staff_cost_change', { index, value: staff_hours * Number(staff_houry_cost) });
  }
  
  function onMaterialChange(event: CustomEvent<HTMLInputElement>) {
    if ((event.target as HTMLInputElement).value === material_options[0]) {
      material_cost = null;
      material_cost_disabled = true;
    } else {
      material_cost_disabled = false;
    }
  }

  function onStaffHoursChange(event: CustomEvent<number>) {
    dispatch('staff_cost_change', { index, value: event.detail * Number(staff_houry_cost) });
  }

  function onMaterialCostChange(event: CustomEvent<number>) {
    dispatch('material_cost_change', { index, value: event.detail });
  }
</script>

<Stack spacing="sm">
  <NativeSelect
    data={type_options}
    required
    placeholder="Bitte auswählen"
    label="Für welche Art von Maßnahmen sollen die Mittel verwendet werden"
    name="entry_{index}_type"
  />
  <MultiSelect
    name="entry_{index}_grades"
    required
    options={grade_options}
    label="Die Maßnahmen werden in folgenden Jahrgangsstufen durchgeführt:"
    description="Zum Entfernen einer Auswahl, bitte auf die unten erschienene Jahrangsstufe klicken."
  />
  <MultiSelect
    name="entry_{index}_subjects"
    required
    options={subject_options}
    label="In welchen Fächern werden Maßnahmen angeboten"
    description="Zum Entfernen einer Auswahl, bitte auf die unten erschienenes Fach klicken."
  />
  <Group spacing="md" grow>
    <NativeSelect
      data={staff_options}
      required
      placeholder="Bitte auswählen"
      label="Personalkosten"
      name="entry_{index}_staff_type"
      on:change={onStaffChange}
    />
    <NumberInput
      hideControls
      placeholder="0"
      name="entry_{index}_staff_hours"
      label="voraussichtliche Summe der Stunden"
      disabled={staff_houry_cost === staff_cost_map[0]}
      required={staff_houry_cost !== staff_cost_map[0]}
      on:change={onStaffHoursChange}
      bind:value={staff_hours}
    />
  </Group>
  <Group spacing="md" grow>
    <NativeSelect
      data={material_options}
      required
      label="Sachkosten"
      placeholder="Bitte auswählen"
      name="entry_{index}_material_type"
      on:change={onMaterialChange}
    />
    <NumberInput
      hideControls
      placeholder="00,00€"
      name="entry_{index}_material_cost"
      label="voraussichtlicher Gesamtbetrag der Sachkosten"
      disabled={material_cost_disabled}
      required={!material_cost_disabled}
      on:change={onMaterialCostChange}
      bind:value={material_cost}
    />
  </Group>
</Stack>
