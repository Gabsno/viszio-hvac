# Wiring up Supabase email authentication

This sets up real email + password accounts for Viszio HVAC. Once it's done,
existing testers log in for the first time and their localStorage progress
is migrated to their new account so no data is lost.

Total time: ~10 minutes. No code required from you — just clicking and
copy-pasting.

## 1. Create the Supabase project

1. Go to <https://supabase.com> and sign in (GitHub login is fine).
2. Click **New project** at the top-right.
3. Fill in:
   - **Name** — `viszio-hvac` (or any name you like)
   - **Database password** — generate a strong one. **Save it somewhere
     safe** — Supabase only shows it once.
   - **Region** — pick the closest to your testers. For Ghana, **eu-west-2
     (London)** has the best latency, otherwise the default works.
   - **Pricing plan** — Free. No card needed.
4. Click **Create project**. Wait ~2 minutes for it to provision.

## 2. Disable email confirmations (optional, for fastest beta UX)

By default Supabase sends a confirmation email and blocks login until the
user clicks the link. For a closed beta where you trust testers, it's easier
to disable that step.

1. In the project sidebar: **Authentication → Providers → Email**.
2. Untick **Confirm email**.
3. Click **Save**.

If you want to keep confirmations on (recommended for production), leave
this enabled and configure the SMTP settings under **Authentication →
Settings → SMTP**.

## 3. Get your project URL and anon key

1. In the sidebar: **Project Settings → API**.
2. Copy two values from the **Project API keys** section:
   - **Project URL** — looks like `https://xxxxx.supabase.co`
   - **anon public** — a long string starting with `eyJhbGciOi...`
3. Open `src/config.ts` in this repo.
4. Paste them into the two empty strings:
   ```ts
   export const SUPABASE_URL = 'https://xxxxx.supabase.co';
   export const SUPABASE_ANON_KEY = 'eyJhbGciOi...';
   ```
5. Save.

The anon key is **safe to commit** — Row Level Security (set up in the next
step) is what protects the data.

## 4. Run the SQL migration

This creates the `profiles` and `user_progress` tables and the row-level
security policies that lock data to its owner.

1. In the Supabase sidebar: **SQL Editor → New query**.
2. Open `supabase/migrations/001_initial.sql` in this repo.
3. Copy the entire file content.
4. Paste into the SQL editor.
5. Click **Run** (or press Cmd/Ctrl + Enter).
6. You should see *Success. No rows returned.*

## 5. Build, commit, push, deploy

```bash
npm run build
git add -A
git commit -m "Enable Supabase email authentication"
git push
```

GitHub Actions deploys in ~2 minutes. After that:
- New visitors are sent to the login screen.
- Existing testers log in for the first time and their localStorage
  progress is migrated up to their new account.
- The legacy `delta-tango-7` access code is no longer required.

## 6. Verify it works

1. Open <https://gabsno.github.io/viszio-hvac/> in an **incognito window**.
2. You should see the login screen (not the old access code).
3. Click **Sign up**, enter an email and password.
4. You should land on the home dashboard with a brief "Preparing your
   account…" message while migration runs.
5. Go to **Profile** — your email is shown at the top.

## 7. (Optional) Check the data in Supabase

1. In the Supabase sidebar: **Table Editor → user_progress**.
2. You should see one row per user with their progress blob.
3. Inspect the **data** column to confirm bookmarks/XP/etc. made it across.

## Troubleshooting

| Problem | Fix |
|---|---|
| Login screen says "Email authentication is not configured" | The URL or anon key in `src/config.ts` is still empty — paste them in and rebuild. |
| Signup works but immediate login fails | Email confirmations are still on — check inbox or disable confirmations in **Authentication → Providers → Email**. |
| "Failed to fetch" on signup | The Supabase project may still be provisioning. Wait a minute and try again. |
| Existing testers see zero XP after login | The migration ran on a device with no local data. Their original device still has it — they'll need to log in there once for it to migrate. After that it's saved on their account forever. |

## What's next (Phase 2)

This phase ships the auth layer. Right now progress is read once from the
server on login but writes still go to localStorage only. The next session
will wire **live cloud sync** so changes on phone show up on desktop
immediately.

Until that's in, the app behaves as if each device is its own account — but
the safety net is in place: their email is registered, their first device's
data is on the server, and from there on we just need to add the writer.
