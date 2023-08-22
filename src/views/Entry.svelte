<script lang="ts">
  import { NumberInput, Space, Stack } from "@svelteuidev/core";
  import MultiSelect from "../components/MultiSelect.svelte";
  import OtherSelect from "../components/OtherSelect.svelte";
  import { type_options, grade_options, subject_options } from "../constants";
  import Costs from "./Costs.svelte";
    import { createEventDispatcher } from "svelte";
  export let index: number;

  const dispatch = createEventDispatcher();
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
    description="Mehrfachnennung möglich. Zum Entfernen einer Auswahl, bitte auf die unten erschienene Jahrangsstufe klicken."
    name="entry_{index}_grades"
    data={grade_options}
    root={OtherSelect}
    required
  />
  <MultiSelect
    label="Welche Fächer können der Maßnahme {index} zugeordnet werden?"
    placeholder="Bitte auswählen"
    description="Mehrfachnennung möglich. Zum Entfernen einer Auswahl, bitte auf die unten erschienenes Fach klicken."
    name="entry_{index}_subjects"
    data={subject_options}
    root={OtherSelect}
    required
  />
  <NumberInput
    label="Wie viele Schülerinnen und Schüler werden mit der Maßnahme {index} gefördert?"
    placeholder="0"
    name="entry_{index}_students"
    required
  />
  <Space />
  <Costs {index} on:staff={(value) => dispatch("staff", value)} />
  <NumberInput
    label="Wie viele Personen werden insgesamt für die Umsetzung der Maßnahme {index} eingesetzt?"
    description="Der hier angegebene Wert wird automatisch anhand der Aufschlüsselung berechnet und dient lediglich der Überprüfung auf Korrektheit."
    placeholder="0"
    name="entry_{index}_staff_count"
    disabled
  />
</Stack>

<!-- Make sure grouped selects are aligned to the bottom of the container. -->
<style>
  :global(.svelteui-NativeSelect-root) {
    margin-top: auto;
  }

  :global(.svelteui-NumberInput-root) {
        margin-top: auto;
    }
</style>
