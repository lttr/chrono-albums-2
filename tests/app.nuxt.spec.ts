import { describe, it, expect } from "vitest"
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime"
import App from "~/app.vue"

mockNuxtImport("useColorMode", () => {
  return () => ({ preference: "system", value: "light" })
})

describe("App", () => {
  it("mounts successfully", async () => {
    const component = await mountSuspended(App)
    expect(component.vm).toBeTruthy()
  })
})
