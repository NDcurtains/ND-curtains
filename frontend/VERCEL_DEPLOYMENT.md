# Vercel Deployment — Consultation Form

The consultation form now runs on a **Vercel Serverless Function** at
`frontend/api/consultations.js` (route: `/api/consultations`). The separate
FastAPI Python server is **no longer required** for the Vercel deployment.
(`backend/` is kept only for the Emergent dev preview.)

## How routing works
- **Production (Vercel):** the frontend calls the same-origin `/api/consultations`,
  which Vercel serves from the serverless function. No `REACT_APP_BACKEND_URL` needed.
- **Local dev (Emergent preview):** the frontend calls `REACT_APP_BACKEND_URL/api`
  (the FastAPI backend), so the preview keeps working.

## Environment variables to set in Vercel
Vercel → Project → Settings → Environment Variables (Production + Preview):

### Email (required so you receive leads)
Use your own Resend account:
- `RESEND_API_KEY` = your Resend API key (`re_...`)
- `SENDER_EMAIL`   = `ND Curtains <onboarding@resend.dev>`
  (after you verify your domain in Resend, change to e.g. `ND Curtains <hello@ndcurtains.com.au>`)
- `NOTIFY_EMAIL`   = `info@ndcurtains.com.au`  (where lead emails are sent)

> Note: With the shared `onboarding@resend.dev` sender, Resend only delivers to
> your Resend account owner address and to `delivered@resend.dev` until you
> verify your domain. Verify your domain to reliably deliver to
> `info@ndcurtains.com.au`, then update `SENDER_EMAIL`.

### Storage (optional — leads are emailed regardless)
To also persist submissions, add a MongoDB Atlas database:
- `MONGODB_URI` = your Atlas connection string (`mongodb+srv://...`)
- `DB_NAME`     = `nd_curtains`

If `MONGODB_URI` is not set, submissions are emailed but not stored, and
`GET /api/consultations` returns an empty list.

## After setting variables
Redeploy on Vercel so the functions pick up the new environment variables.
