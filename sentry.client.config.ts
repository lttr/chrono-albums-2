import * as Sentry from "@sentry/nuxt"

Sentry.init({
  dsn: "YOUR_SENTRY_DSN_HERE",

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
