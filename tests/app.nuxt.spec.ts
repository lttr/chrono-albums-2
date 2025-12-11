import { describe, it, expect } from "vitest"
import { mountSuspended } from "@nuxt/test-utils/runtime"
import App from "~/app.vue"

describe("App", () => {
  it("mounts successfully", async () => {
    const component = await mountSuspended(App)
    expect(component.vm).toBeTruthy()
  })
})
