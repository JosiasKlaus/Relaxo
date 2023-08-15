<script>
    import { Button, Checkbox, Space, Stack, Text } from "@svelteuidev/core";
    import { staff_cost, material_cost } from "../service";

    const formater = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    });
</script>

<Stack>
    <Text size="lg" weight={"bold"} align="justify" style="line-height: 1.5;">
        Hiermit beantrage ich für die Umsetzung des Landesprogramms „Löwenstark
        – der BildungsKICK“ zusätzliche Mittel für in Höhe von
    </Text>
    <Text size="lg" style="line-height: 2;">
        {formater.format($staff_cost)} für Personalausgaben und<br />
        {formater.format($material_cost)} für Sachausgaben
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
