<script lang="ts">
  import { ActionIcon, Container, Divider, Group, Space, SvelteUIProvider, Text, colorScheme } from "@svelteuidev/core";
  import { Moon, Sun } from "radix-icons-svelte";
  import { submitFormData } from "./service";

  import Header from "./views/Header.svelte";
  import School from "./views/School.svelte";
  import EntryGroup from "./views/EntryGroup.svelte";
  import Footer from "./views/Footer.svelte";
    import { createNestedObject } from "./utils";

  let currentColorScheme: string;
  colorScheme.subscribe((v) => {
    currentColorScheme = v;
  });

  function toggleTheme() {
    colorScheme.update((v) => (v === "light" ? "dark" : "light"));
  }

  function onSubmit(e: Event) {
    const formData = new FormData(e.target as HTMLFormElement);
    if(formData.get("terms_and_conditions") != "true") return alert("Bitte akzeptieren Sie die Datenschutzbestimmungen.");

    const nestedData = createNestedObject(Object.fromEntries(formData));
    submitFormData(nestedData).then((response) => {
      let blob = new Blob([response], { type: response.type });
      let url = window.URL.createObjectURL(blob);
      let pwa = window.open(url);
      if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert('Please disable your Pop-up blocker and try again.');
      }
    });
  }
</script>

<!-- Meta tag theme handling for page background -->
<svelte:head>
  <meta name="color-scheme" content={currentColorScheme} />
</svelte:head>

<!-- Main application context -->
<SvelteUIProvider withNormalizeCSS>
  <Container size={768} style="padding: 4rem 4rem;">
    <form on:submit|preventDefault={onSubmit}>
      <Header />
      <Space h="xl" />
      <Divider label="Schulinformationen" labelPosition="center" />
      <Space h="xl" />
      <School />
      <EntryGroup />
      <Space h="xl" />
      <Divider label="Zusammenfassung" labelPosition="center" />
      <Footer />
    </form>
  </Container>
  <Group position="center">
    <ActionIcon variant="light" on:click={toggleTheme}>
      {#if currentColorScheme === "light"}<Moon />{:else}<Sun />{/if}
    </ActionIcon>
    <Text size="sm" color="dimmed">
      Designt, Entwickelt und Betrieben von © 2022 Josias Klaus
    </Text>
  </Group>
  <Space h="md" />
</SvelteUIProvider>

<!-- Make sure required indicator is red -->
<style>
  :global(span.required) {
    color: red;
  }

  :global(.svelteui-NativeSelect-root) {
    margin-top: auto;
  }

  :global(.svelteui-NumberInput-root) {
    margin-top: auto !important;
  }
</style>
