import * as Sentry from "@sentry/nuxt"

Sentry.init({
  dsn: "YOUR_SENTRY_DSN_HERE",

  // Performance monitoring - capture all transactions
  tracesSampleRate: 1.0,

  // Enable server-side log collection
  enableLogs: true,

  // Capture user PII
  sendDefaultPii: true,

  // Debug mode disabled
  debug: false,
})
