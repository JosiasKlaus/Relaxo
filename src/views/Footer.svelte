<script lang="ts">
    import { Button, Checkbox, Space, Stack, Text } from "@svelteuidev/core";
    import { staff_map, material_map } from "../service";
    import { currencyFormater } from "../utils";

    let staff_cost: number;
    let material_cost: number;

    staff_map.subscribe((value) => {
        staff_cost = 0;
        value.forEach((staff) => {
            staff_cost += staff;
        });
    });

    material_map.subscribe((value) => {
        material_cost = 0;
        value.forEach((material) => {
            material_cost += material;
        });
    });
</script>

<Stack>
    <Text size="lg" weight={"bold"} align="justify" style="line-height: 1.5;">
        Hiermit beantrage ich für die Umsetzung des Landesprogramms „Löwenstark
        – der BildungsKICK“ zusätzliche Mittel in Höhe von
    </Text>
    <Text size="lg" style="line-height: 2;">
        {currencyFormater.format(staff_cost * 1.15)} für Personalausgaben (inkl. 15% Aufschlag) und<br />
        {currencyFormater.format(material_cost)} für Sachausgaben<br />
        {currencyFormater.format(staff_cost * 1.15 + material_cost)} insgesamt
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
        Die Durchführung aller Angebote steht unter dem Vorbehalt der im
        Haushalt verfügbaren Mittel des aktuellen Haushaltsjahres. Bei der
        Antragsprüfung wird das Datum des elektronischen Eingangs im Hessischen
        Kultusministerium berücksichtigt.
    </Text>
    <Space h="md" />
    <Stack spacing="xl">
        <Checkbox
            label="Ich habe die Datenschutzbestimmungen gelesen und erkläre mich damit einverstanden."
            name="terms_and_conditions"
        />
        <Button style="margin-left: auto; max-width: fit-content;" type="submit">Abschicken</Button>
    </Stack>
</Stack>
