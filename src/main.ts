import App from "@/App.vue"
import { createPinia } from "pinia"
import { createApp } from "vue"

import "@/main.css"

const pinia = createPinia()

createApp(App).use(pinia).mount("#app")
