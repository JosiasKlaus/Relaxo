<script lang="ts">
  import { Space, Stack, Text, TextInput, Title, Button } from "@svelteuidev/core";
  import { ChevronRight } from "radix-icons-svelte";
  import { loggedin } from "../utils/service";
  import { t } from "../utils/i18n";
  let password: string;
  let error: boolean;

  function handleLogin() {
    if(password === import.meta.env.VITE_LOGIN_PASSWORD) {
        $loggedin = true;
    } else {
        error = true;
    }
  }
</script>

<Stack>
  <Title order={1}>{$t("login.title")}</Title>
  <Space />
  <Text size="lg" align="justify" style="line-height: 1.5;">
    {$t("login.intro")}
  </Text>
  <Space />
  <TextInput label={$t("login.password")} type="password" bind:value={password} {error}/>
  <Button style="margin-left: auto;" on:click={handleLogin}>
    {$t("login.submit")}
    <ChevronRight slot="rightIcon" />
  </Button>
</Stack>
