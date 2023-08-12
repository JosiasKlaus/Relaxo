<script lang="ts">
  import {
    Title,
    Text,
    Stack,
    Group,
    Checkbox,
    Button,
    Divider,
  } from "@svelteuidev/core";
  import School from "./School.svelte";
  import Entry from "./Entry.svelte";
  import { Plus } from "radix-icons-svelte";

  let components = [Entry];

  function addEntry() {
    components = [...components, Entry];
  }
</script>

<form>
  <!-- Header -->
  <Stack>
    <Title order={1} style="margin-bottom: 2rem;"
      >Antragsformular Löwenstark</Title
    >
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
  <Divider
    style="margin: 2rem 0;"
    label="Schulinformationen"
    labelPosition="center"
  />
  <School />

  <!-- Entries -->
  {#each components as component, index}
    <Divider
      style="margin: 2rem 0;"
      label="Maßnahme {index + 1}"
      labelPosition="center"
    />
    <svelte:component this={component} {index} />
  {/each}
  <Button type="button" variant="light" on:click={addEntry}>
    <Plus slot="leftIcon" />Weitere Maßnahme hinzufügen
  </Button>

  <!-- Footer -->
  <Divider
    style="margin: 2rem 0;"
    label="Zusammenfassung"
    labelPosition="center"
  />
  <Stack>
    <Text size="lg" weight={"bold"} align="justify" style="line-height: 1.5;">
      Hiermit beantrage ich für die Umsetzung des Landesprogramms „Löwenstark –
      der BildungsKICK“ zusätzliche Mittel für in Höhe von
    </Text>
    <Text size="lg" style="line-height: 2;">
      0,00€ für Personalausgaben und<br />
      0,00€ für Sachausgaben
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
    <Group noWrap style="margin-top: 2rem;">
      <Checkbox
        label="Ich habe die Datenschutzbestimmungen gelesen und erkläre mich damit einverstanden."
        name="terms_and_conditions"
        style="flex-grow: 1;"
      />
      <Button style="margin-left: auto; max-width: fit-content;" type="button"
        >Abschicken</Button
      >
    </Group>
  </Stack>
</form>
