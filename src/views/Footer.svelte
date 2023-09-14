<script lang="ts">
    import { Button, Checkbox, Group, Space, Stack, Text } from "@svelteuidev/core";
    import { year_options } from "../utils/constants";
    import { t } from "../utils/i18n";
    import CostDisplay from "../components/CostDisplay.svelte";
    import { createEventDispatcher } from "svelte";
    import { terms } from "../utils/service";
    const dispatch = createEventDispatcher();
</script>

<Stack>
    <Text size="lg" weight={"bold"} align="justify" style="line-height: 1.5;">
        {$t('footer.title')}
    </Text>
    {#each year_options as year }
        <CostDisplay year={year} />
    {/each}
    <Space h="md" />
    <Text size="lg" align="justify" style="line-height: 1.5;">
        {$t('footer.address.title')}
    </Text>
    <Text size="lg" weight={"bold"} align="justify" style="line-height: 1.5;">
        Hessisches Kultusministerium<br />
        Referat I.3<br />
        z. Hd. Herrn Florian Dierschke<br />
        Luisenplatz 10<br />
        65185 Wiesbaden<br />
    </Text>
    <Text size="lg" align="justify" style="line-height: 1.5;">
        {$t('footer.notice')}
    </Text>
    <Space h="md" />
    <Stack spacing="xl">
        <Group noWrap>
            <Checkbox bind:checked={$terms} />
            <Text>Ich habe die
                <Text
                    color="blue" variant="link" root="a"
                    href="https://kultusministerium.hessen.de/Datenschutz">
                    Datenschutzbestimmungen
                </Text>
                gelesen und erkläre mich damit einverstanden. <span class="required">*</span>
            </Text>
        </Group>
        <Button style="margin-left: auto; max-width: fit-content;" on:click={() => dispatch('submit')}>
            Abschicken
        </Button>
    </Stack>
</Stack>
