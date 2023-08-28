<script lang="ts">
  import { NumberInput, Space, Stack } from "@svelteuidev/core";
  import MultiSelect from "../components/MultiSelect.svelte";
  import OtherSelect from "../components/OtherSelect.svelte";
  import { type_options, grade_options, subject_options } from "../constants";
  import Costs from "./Costs.svelte";
  import { createEventDispatcher } from "svelte";
  import { staff_count_map } from "../service";
  export let index: number;

  const dispatch = createEventDispatcher();

  let staff_count = 0;
  staff_count_map.subscribe((map) => {
    staff_count = map.get(index) || 0;
  });
</script>

<Stack spacing="sm">
  <OtherSelect
    label="Für welche Art von Maßnahmen sollen die Mittel verwendet werden?"
    placeholder="Bitte auswählen"
    name="entry_{index}_type"
    data={type_options}
    required
  />
  <MultiSelect
    label="Die Maßnahmen werden in folgenden Jahrgangsstufen durchgeführt:"
    placeholder="Bitte auswählen"
    description="Mehrfachnennung möglich. Zum Entfernen einer Auswahl bitte auf die unten erschienene Jahrgangsstufe klicken."
    name="entry_{index}_grades"
    data={grade_options}
    root={OtherSelect}
    required
  />
  <MultiSelect
    label="Welche Fächer können der Maßnahme {index + 1} zugeordnet werden?"
    placeholder="Bitte auswählen"
    description="Mehrfachnennung möglich. Zum Entfernen einer Auswahl bitte auf das unten erschienene Fach klicken."
    name="entry_{index}_subjects"
    data={subject_options}
    root={OtherSelect}
    required
  />
  <NumberInput
    label="Wie viele Schülerinnen und Schüler werden mit der Maßnahme {index + 1} gefördert?"
    placeholder="0"
    name="entry_{index}_students"
    required
  />
  <Space />
  <Costs {index} on:staff={(value) => dispatch("staff", value)} />
  <NumberInput
    label="Wie viele Personen werden insgesamt für die Umsetzung der Maßnahme {index + 1} eingesetzt?"
    description="Der hier angegebene Wert wird automatisch anhand der Aufschlüsselung berechnet und dient lediglich der Überprüfung auf Korrektheit."
    placeholder="0"
    name="entry_{index}_staff_count"
    disabled
    bind:value={staff_count}
  />
</Stack>
