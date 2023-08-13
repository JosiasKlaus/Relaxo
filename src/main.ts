import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app"),
});

export const BACKEND_URL: string = "https://lerncamp.its-hosted.de/api";
export default app;
