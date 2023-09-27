<script lang="ts">
  import {
    ActionIcon,
    Center,
    Container,
    Divider,
    Group,
    Space,
    SvelteUIProvider,
    Text,
    colorScheme,
  } from "@svelteuidev/core";
  import { Moon, Sun } from "radix-icons-svelte";
  import {
    downloadBlob,
    loggedin,
    submitFormData,
    validateApplication,
  } from "./utils/service";
  import { application, terms } from "./utils/service";
  import { onMount } from "svelte";

  import Header from "./views/Header.svelte";
  import School from "./views/School.svelte";
  import EntryGroup from "./views/EntryGroup.svelte";
  import Footer from "./views/Footer.svelte";
  import Login from "./views/Login.svelte";
  import Success from "./views/Success.svelte";

  let SUCCESS: boolean = false;

  function onSubmit() {
    if (!$terms) {
      alert("Bitte akzeptieren Sie die Datenschutzbestimmungen.");
      return;
    }

    try {
      validateApplication($application);
    } catch (error) {
      alert(error);
      return;
    }

    SUCCESS = true;
    submitFormData($application)
      .then((response) => {
        downloadBlob(response);
      })
      .catch((error) => {
        alert(error);
      });
  }

  // Make sure to create the first (required) entry
  onMount(() => {
    $application.entries = [{ material: [{}], staff: [{}], summary: {} }];
  });
</script>

<!-- Meta tag theme handling for page colors -->
<svelte:head>
  <meta name="color-scheme" content={$colorScheme} />
</svelte:head>

<!-- Main application context -->
<SvelteUIProvider withNormalizeCSS>
  {#if !$loggedin}
    <Center>
      <Container size={768} style="padding: 4rem 4rem; height:100%;">
        <Login />
      </Container>
    </Center>
  {:else}
  {#if !SUCCESS}
    <Container size={768} style="padding: 4rem 4rem;">
      <Header />
      <Space h="xl" />
      <Divider label="Schulinformationen" labelPosition="center" />
      <Space h="xl" />
      <School />
      <EntryGroup />
      <Space h="xl" />
      <Divider label="Zusammenfassung" labelPosition="center" />
      <Footer on:submit={onSubmit} />
    </Container>
    <Group position="center">
      <ActionIcon
        variant="light"
        on:click={() =>
          ($colorScheme = $colorScheme === "light" ? "dark" : "light")}
      >
        {#if $colorScheme === "light"}<Moon />{:else}<Sun />{/if}
      </ActionIcon>
      <Text size="sm" color="dimmed">
        Designt, Entwickelt und Betrieben von © 2022 Josias Klaus
      </Text>
    </Group>
    <Space h="md" />
  {:else}
    <Container size={768} style="padding: 4rem 4rem;">
      <Success />
    </Container>
  {/if}
  {/if}
</SvelteUIProvider>

<!-- Make sure required indicator is red and  -->
<style>
  :global(span.required) {
    color: red;
  }

  :global(.svelteui-InputWrapper-root) {
    margin-top: auto !important;
  }
</style>
