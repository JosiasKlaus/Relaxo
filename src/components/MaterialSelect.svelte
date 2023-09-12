<script lang="ts">
  import { Group, NativeSelect, NumberInput } from "@svelteuidev/core";
  import { material_options } from "../utils/constants";
  import { type Material } from "../types";
  import { currencyFormater } from "../utils/utils";
  import { application } from "../utils/service";
  export let material: Material;
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
  <NumberInput
    label="voraussichtlicher Gesamtbetrag der Sachkosten (in €)"
    placeholder="0,00€"
    min={0}
    precision={2}
    decimalSeparator=","
    formatter={(value) => {
      value = value?.replace(",", ".");
      if (!value || value == "" || isNaN(parseFloat(value || "0")))
        return value || "";
      return currencyFormater.format(parseFloat(value));
    }}
    disabled={material.type === material_options[0]}
    required={material.type !== material_options[0]}
    bind:value={material.cost}
    on:change={() => ($application = $application)}
  />
</Group>
