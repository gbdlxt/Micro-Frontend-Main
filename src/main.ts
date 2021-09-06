import { registerMicroApps, setDefaultMountApp, start } from "qiankun";
import { createApp } from "vue";
import app from "./app.vue";
import { microRouter, defaultApp } from "./router";

registerMicroApps(microRouter);
setDefaultMountApp(defaultApp);
start();
createApp(app).mount("#smart-pole-app");
