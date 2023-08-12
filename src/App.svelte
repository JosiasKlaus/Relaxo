<script lang="ts">
  import {
    ActionIcon,
    Container,
    Group,
    SvelteUIProvider,
    Text,
    colorScheme,
  } from "@svelteuidev/core";
  import Form from "./views/Form.svelte";
  import { Moon, Sun } from "radix-icons-svelte";

  let currentColorScheme: string;

  colorScheme.subscribe((v) => {
    currentColorScheme = v;
  });

  function toggleTheme() {
    colorScheme.update((v) => (v === "light" ? "dark" : "light"));
  }
</script>

<!-- Meta tag theme handling for page background -->
<svelte:head>
  <meta name="color-scheme" content={currentColorScheme} />
</svelte:head>

<SvelteUIProvider withNormalizeCSS themeObserver={$colorScheme}>
  <Container size="sm" style="padding: 4rem 0;">
    <Form />
  </Container>
  <Group position="center" style="margin-bottom: 1em;">
    <ActionIcon variant="light" on:click={toggleTheme}>
      {#if currentColorScheme === "light"}<Moon />{:else}<Sun />{/if}
    </ActionIcon>
    <Text size="sm" color="dimmed">
      Designt, Entwickelt und Betrieben von © 2022 Josias Klaus
    </Text>
  </Group>
</SvelteUIProvider>
