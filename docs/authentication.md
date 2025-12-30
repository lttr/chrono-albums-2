# Authentication

## Overview

The app uses [better-auth](https://www.better-auth.com/) with Google OAuth for authentication. Users sign in with their Google account, but access to projects requires explicit invitation by a project owner.

## How It Works

1. User clicks "Sign in with Google"
2. Google authenticates the user and redirects back to the app
3. better-auth creates a session and stores user info in the database
4. User can access projects they've been invited to
5. After sign-in, user is redirected to the original page (or `/admin` by default)

## Environment Variables

| Variable                | Description                                  |
| ----------------------- | -------------------------------------------- |
| `BETTER_AUTH_SECRET`    | Random 32+ char string for signing tokens    |
| `BETTER_AUTH_URL`       | App base URL (e.g., `http://localhost:3000`) |
| `GOOGLE_CLIENT_ID`      | From Google Cloud Console                    |
| `GOOGLE_CLIENT_SECRET`  | From Google Cloud Console                    |
| `NUXT_PUBLIC_MOCK_AUTH` | Set to `true` to bypass auth (dev only)      |

## Google OAuth Setup

1. Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Configure OAuth consent screen (External, add email/profile scopes)
3. Create OAuth 2.0 credentials (Web application type)
4. Add authorized origins and redirect URIs for each environment:
   - Origin: `https://your-app.com`
   - Redirect: `https://your-app.com/api/auth/callback/google`

## Mock Auth Mode

For local development without Google OAuth setup, set `NUXT_PUBLIC_MOCK_AUTH=true`. This bypasses real authentication and uses a predefined mock user.

## Key Design Decision

**Membership requires invitation** - Signing in with Google does not grant access to any project. Users must be explicitly invited by a project owner before they can view or manage content.
