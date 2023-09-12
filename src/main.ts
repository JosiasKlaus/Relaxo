import App from "./App.svelte";

console.warn = () => {};

const app = new App({
  target: document.getElementById("app"),
});

export default app;
