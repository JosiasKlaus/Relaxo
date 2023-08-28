<script lang="ts">
    import { Button, Checkbox, Divider, Group, NumberInput, Space, Stack, Text, TextInput } from "@svelteuidev/core";
    import { staff_map, material_map, staff_count_map } from "../service";
    import { currencyFormater } from "../utils";

    let staff_cost: number;
    let material_cost: number;
    let staff_count: number;

    let staff_cost_formated: string;
    let staff_cost_upcharged_formated: string;
    let material_cost_formated: string;

    staff_map.subscribe((value) => {
        staff_cost = 0;
        value.forEach((staff) => {
            staff_cost += staff;
        });
        staff_cost_formated = currencyFormater.format(staff_cost);
        staff_cost_upcharged_formated = currencyFormater.format(staff_cost * 1.15);
    });

    material_map.subscribe((value) => {
        material_cost = 0;
        value.forEach((material) => {
            material_cost += material;
        });
        material_cost_formated = currencyFormater.format(material_cost);
    });

    staff_count_map.subscribe((value) => {
        staff_count = 0;
        value.forEach((count) => {
            staff_count += count;
        });
    });
</script>


<input type="hidden" name="cost_staff" value={staff_cost * 1.15} />
<input type="hidden" name="cost_material" value={material_cost} />
<input type="hidden" name="count_staff" value={staff_count} />
<Stack>
    <Text size="lg" weight={"bold"} align="justify" style="line-height: 1.5;">
        Hiermit beantrage ich für die Umsetzung des Landesprogramms „Löwenstark
        – der BildungsKICK“ zusätzliche Mittel in Höhe von
    </Text>
    <Group grow noWrap>
        <TextInput label="Personalkosten" placeholder="0" disabled value={staff_cost_formated} />
        <TextInput label="(inkl. 15% Aufschlag)" placeholder="0" disabled value={staff_cost_upcharged_formated} />
    </Group>
    <TextInput label="Sachkosten" placeholder="0" disabled value={material_cost_formated} />
    <Divider style="margin: 0;" />
    <Text size="lg" weight={"bold"} align="justify" style="line-height: 1.5;">
        {currencyFormater.format(staff_cost * 1.15 + material_cost)} insgesamt
    </Text>
    <Space h="md" />
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
        Die Durchführung aller Angebote steht unter dem Vorbehalt der im
        Haushalt verfügbaren Mittel des aktuellen Haushaltsjahres. Bei der
        Antragsprüfung wird das Datum des elektronischen Eingangs im Hessischen
        Kultusministerium berücksichtigt.
    </Text>
    <Space h="md" />
    <Stack spacing="xl">
        <Group noWrap>
            <Checkbox name="terms_and_conditions" value="true" />
            <Text>Ich habe die
                <Text
                    color="blue" variant="link" root="a"
                    href="https://kultusministerium.hessen.de/Datenschutz">
                    Datenschutzbestimmungen
                </Text>
                gelesen und erkläre mich damit einverstanden. <span class="required">*</span>
            </Text>
        </Group>
        <Button style="margin-left: auto; max-width: fit-content;" type="submit">
            Abschicken
        </Button>
    </Stack>
</Stack>
