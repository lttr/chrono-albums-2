import * as Sentry from "@sentry/nuxt"

Sentry.init({
  dsn: "https://5dd7848ee75830557bec36d912a8ea3b@o4510533326602240.ingest.de.sentry.io/4510624742244432",

  // Error filtering
  ignoreErrors: [
    // View transition skipped when iOS Safari uses native swipe-back animation
    /Skipping view transition because skipTransition\(\) was called/,
  ],

  // Performance monitoring - capture all transactions
  tracesSampleRate: 1.0,

  // Enable client-side log collection
  enableLogs: true,

  // Capture user PII
  sendDefaultPii: true,

  // Debug mode disabled in production
  debug: false,
})
