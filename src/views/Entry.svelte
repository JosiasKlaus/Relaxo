<script lang="ts">
  import { Group, NativeSelect, NumberInput, Stack } from "@svelteuidev/core";
  import MultiSelect from "../components/MultiSelect.svelte";
  export let index: number;

  const type_options = [
    "zusätzliche Förderkurse",
    "eine individuelle Lernbegleitung im Unterricht",
    "Unterricht in einem über die Stundentafel hinausgehenden Umfang",
    "eine Hausaufgabenbetreuung",
    "eine organisierte (Online-) Nachhilfe",
    'eine zweiteilige Teilung von Lerngruppen (sog. "Doppelstreckung")',
    "Lernangebote in den Ferien",
    "kulturelle Angebote",
    "Gelegenheiten zur körperlichen Bewegung",
    "sozialpädagogische und psychologische Unterstützung",
  ];

  const staff_options = [
    "kein Personal",
    "Mehrarbeit Teilz. BEA gehob. Dienst",
    "Mehrarbeit Teilz. BEA höh. Dienst",
    "Mehrarb./ÜSt. Teilz. TV-H",
    "Beschäftigung Befristeter TV-H Kräfte",
    "Mehrarbeit. Teilz. Personal zur unterrichtsunterstützenden sozialpädergogischen Förderung",
  ];

  const material_options = [
    "keine Sachmittel",
    "Sachmittel für sonstige Landesaufgaben (unter 410EUR)",
    "Dienstleistungsvertrag",
    "Finanzierung von diagnostischen Materialien",
    "Sachmittel im Rahmen des 10.000EUR Erlasses",
  ];

  const grade_options = [
    "Jahrgangsstufe 1",
    "Jahrgangsstufe 2",
    "Jahrgangsstufe 3",
    "Jahrgangsstufe 4",
    "Jahrgangsstufe 5",
    "Jahrgangsstufe 6",
    "Jahrgangsstufe 7",
    "Jahrgangsstufe 8",
    "Jahrgangsstufe 9",
    "Jahrgangsstufe 10",
    "E-Phase",
    "Q-Phase",
  ];

  const subject_options = [
    "Deutsch",
    "Englisch",
    "Mathematik",
    "Französisch",
    "Spanisch",
    "Sport",
    "Religion/Ethik",
    "Musik",
    "Kunst",
    "Biologie",
    "Chemie",
    "Physik",
    "Erdkunde",
    "Politik und Wirtschaft",
    "Geschichte",
  ];

  let personal_cost_disabled = true;
  function onStaffChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    personal_cost_disabled = value === staff_options[0];
  }

  let material_const_disabled = true;
  function onMaterialChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    material_const_disabled = value === material_options[0];
  }
</script>

<Stack spacing="sm">
  <NativeSelect
    data={type_options}
    label="Für welche Art von Maßnahmen sollen die Mittel verwendet werden"
  />
  <MultiSelect
    name="grades"
    options={grade_options}
    label="Die Maßnahmen werden in folgenden Jahrgangsstufen durchgeführt:"
    description="Zum Entfernen einer Auswahl, bitte auf die unten erschienene Jahrangsstufe klicken."
  />
  <MultiSelect
    name="subjects"
    options={subject_options}
    label="In welchen Fächern werden Maßnahmen angeboten"
    description="Zum Entfernen einer Auswahl, bitte auf die unten erschienenes Fach klicken."
  />
  <Group spacing="md" grow>
    <NativeSelect
      data={staff_options}
      label="Personalkosten {index}"
      on:change={onStaffChange}
    />
    <NumberInput
      hideControls
      placeholder="0"
      label="voraussichtliche Summe der Stunden"
      disabled={personal_cost_disabled}
      required={!personal_cost_disabled}
    />
  </Group>
  <Group spacing="md" grow>
    <NativeSelect
      data={material_options}
      label="Sachkosten"
      on:change={onMaterialChange}
    />
    <NumberInput
      hideControls
      placeholder="00,00€"
      label="voraussichtlicher Gesamtbetrag der Sachkosten"
      disabled={material_const_disabled}
      required={!material_const_disabled}
    />
  </Group>
</Stack>
