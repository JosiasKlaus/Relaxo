<script>
  import { Space, Stack, Text, Title } from "@svelteuidev/core";
  import { t } from "../utils/i18n";
</script>

<Stack>
  <Title order={1}>{$t("header.title")}</Title>
  <Space h="md" />
  <Text size="lg" align="justify" style="line-height: 1.5;">
    {$t("header.intro")}
  </Text>
  <Text size="lg" weight={"bold"} align="justify" style="line-height: 1.5;">
    {$t("header.notice")}
  </Text>
</Stack>
