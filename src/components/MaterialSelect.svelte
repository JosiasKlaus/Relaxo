<script lang="ts">
  import { Group, NativeSelect, NumberInput, TextInput } from "@svelteuidev/core";
  import { material_options } from "../utils/constants";
  import { type Material } from "../types";
  import { application } from "../utils/service";
  import { c } from "../utils/i18n";
  export let material: Material;
  let text: any = 0;

  function handleBlur() {
    material.cost = parseFloat(text.replaceAll(".", "").replaceAll(",", "."))
    text = c(material.cost);
    $application = $application;
  }
</script>

<Group spacing="md" grow noWrap>
  <NativeSelect
    label="Sachkosten"
    placeholder="Bitte auswählen"
    data={material_options}
    required
    bind:value={material.type}
    on:change={() => {
      if (material.type === material_options[0]) material.cost = 0;
      $application = $application;
    }}
  />
  <TextInput
    label="voraussichtlicher Gesamtbetrag der Sachkosten (in €)"
    placeholder="0,00€"
    disabled={material.type === material_options[0]}
    required={material.type !== material_options[0]}
    bind:value={text}
    on:blur={handleBlur}
  />
</Group>
