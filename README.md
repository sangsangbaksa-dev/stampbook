# Stampbook

A stamp card for prepaid lessons (tutors, coaches, instructors). Static site, no server, data in localStorage. 5 languages (en, ko, ja, zh, es). Free: 3 active packs. Pro: unlimited packs, balance links, CSV.

## Features

- **Packs**: one stamp card per prepaid pack, with a progress ring showing lessons used. Tap a circle to stamp a lesson, mark no-shows and excused cancellations, make-up lessons, and a per-pack lesson log with notes.
- **Search and filter**: search by student name; filter to All, Needs attention, Unpaid or Ended (complete or expired). Group by student to see one heading per client with lessons left across their packs. Shown from 4 packs up, and the filter and grouping reset when hidden.
- **End of pack**: a copyable end-of-pack message appears on completed packs.
- **Reminders**: packs on their last lesson, expiring within 7 days, or expired with lessons left are flagged; a copyable renewal or payment reminder, and a warning when the pace will not finish before expiry.
- **Templates**: the three most-used pack terms are one-tap presets in the new-pack form. Renew one pack, or renew all that are due. Duplicate a pack to start a new term with the same student, price and weekly days.
- **Calendar**: month view; tap a day to see who was stamped, planned and skipped lessons.
- **Schedule**: weekly days and time per pack, one-off planned lessons added by date (quick entry on each pack; a date outside the pack, already stamped or on a class closure is refused with the reason), a Today list with one-tap stamping, a `.ics` calendar file.
- **Insights**: this month and last month summaries (lessons given, earned), 6-month trend, busiest weekdays, per-student attendance, students gone quiet, forecast for the next 30 days, income by month, unpaid packs, note search.
- **Receipts and reports**: receipt copy and print, month report per pack, activity report to save as PDF.
- **Backup**: JSON backup download; restore either replaces data or merges by id (stamps are never lost). Unusable records in a file are skipped on restore. Settings show the last backup date, and a nudge appears after 14 days.
- **Pro**: unlimited packs, balance links and QR codes, CSV exports (per student, per month, income, stats, lesson log, and a lesson log per student from the group view).
- **Appearance**: light, dark or match-device; five languages (en, ko, ja, zh, es).

- `index.html` landing, `app/` the app, `privacy.html`
- Tabs: Packs, Calendar (month view, tap a day to see who was stamped) and Insights (6-month trend, busiest weekdays, per-student attendance, students gone quiet). Each pack can also have a weekly schedule (days + time): a Today list with one-tap stamping, planned days in the calendar, a `.ics` export, and a backup nudge after 14 days. Packs can be marked unpaid (shown in Insights with the amount awaiting), Insights also forecasts the next 30 days and searches lesson notes. Each pack can copy a month report for the student, and the new-pack form offers your most-used terms as one-tap presets. A planned lesson can be skipped (holiday) and restored from the Today list or calendar. Restoring a backup can merge into current data (stamps are unioned by id) instead of replacing it. Insights can export per-student stats as CSV (Pro). Make-up lessons: a lesson cancelled in time (Excused) is owed back; a one-tap Make-up lesson button pays it back and Insights lists who is owed. Packs that will not finish before they expire (based on the recent pace) get a warning on the card and in Insights. Each pack can copy a receipt, and deleting a pack is undoable. Logic is in `app/core.js` (`monthGrid`, `dayMap`, `monthlyTrend`, `studentStats`, `quiet`, `overview`).
- Tests: `node --test test/*.test.js` (unit), `NODE_PATH=$(npm root -g) node test/e2e.js` and `node test/insights-e2e.js` and `node test/schedule-e2e.js` and `node test/features-e2e.js` (Playwright)
- Launch: see `docs/launch-checklist.md`. All launch values live in `config.js`; `node scripts/build.js` (run by Vercel on deploy) regenerates the per-language landing pages, legal pages, sitemap and robots from it.
- Hosting: Cloudflare Pages (`docs/cloudflare-pages.md`; `functions/api/license.js`, `_headers`, `_redirects`, build `node scripts/build.js --dist`). Vercel config (`vercel.json`, `api/license.js`) is kept for the existing deployment. Shared logic: `lib/license-core.js`.
- `api/license.js`: Lemon Squeezy licence-key check, enabled by env vars `LEMONSQUEEZY_PRODUCT_ID (optional)` (see `docs/license-server.md`).
- Old note, still true until those env vars are set: placeholders to replace before charging: `config.js` (`checkoutUrl`, `supportEmail`), the Pro link in `index.html`, contact in `privacy.html`. The offline licence check in `app/core.js` is a placeholder scheme (anyone can mint keys) and must be replaced with vendor-issued keys.

## 배포 전 검증

설치·빌드·브라우저 검사·Cloudflare 배포 파일 구성은 [PREDEPLOY.md](PREDEPLOY.md)를 참고하세요. `codex/predeploy-2026-11-06` 브랜치의 검증 워크플로에는 배포 단계가 없습니다.
