<script lang="ts">
  import { Divider, Group, TextInput } from "@svelteuidev/core";
  import { application } from "../utils/service";
  import { t, c } from "../utils/i18n";

  export let year: string;
  let staff_cost_year: number, material_cost_year: number;

  $: $application, calculateCost();

  function calculateCost(): void {
    staff_cost_year = 0;
    $application.entries?.forEach((entry) => {
      let staff_cost = 0;
      if (entry.year === year) {
        entry.staff.forEach((staff) => {
          staff_cost += staff.cost || 0;
        });
        entry.summary.staff = staff_cost;
        staff_cost_year += staff_cost;
      }
    });

    material_cost_year = 0;
    $application.entries?.forEach((entry) => {
      let material_cost = 0;
      if (entry.year === year) {
        entry.material.forEach((material) => {
          material_cost += material.cost || 0;
        });
        entry.summary.material = material_cost;
        material_cost_year += material_cost;
      }
    });
  }
</script>

<Divider label={$t("cost.title", { year: year })} labelPosition="center" />
<Group grow noWrap>
  <TextInput label={$t("cost.staff")} placeholder="0" value={c(staff_cost_year)} disabled />
  <TextInput label={$t("cost.surcharge")} placeholder="0" value={c(staff_cost_year * 1.15)} disabled />
  <TextInput label={$t("cost.material")} placeholder="0" value={c(material_cost_year)} disabled />
</Group>
<TextInput label={$t("cost.total")} placeholder="0" disabled value={c(staff_cost_year * 1.15 + material_cost_year)} />
