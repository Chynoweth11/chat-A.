# SubShield Project Status

## Current app entry

- Root mount: `src/main.jsx`
- App root: `src/App.jsx`
- Main orchestrator: `src/subshield/SubShieldComplete.jsx`

## Current architecture

- `src/subshield/data.js`: seed mock data
- `src/subshield/utils.js`: pure helpers (storage, scoring, dates, ids)
- `src/subshield/icons.js`: policy type to icon mapping
- `src/subshield/styles.css`: design system and responsive styles
- `src/subshield/components/`: views, modals, shared UI blocks

## Working features

- Policy vault with status, details, and document list
- Live compliance score calculation
- Policy renew and rate-shop flows
- Simulated document vault flow
- GC directory add/edit/remove/search
- COI package review and send simulation
- Activity feed grouped by relative day
- Profile stats and reset-to-seed action
- Local persistence in `localStorage`
- Responsive layout across desktop/tablet/mobile

## Tooling

- Bundler/dev server: webpack 5
- Linting: ESLint 9
- CI: `.github/workflows/ci.yml` (install, lint, build)

## Out of scope (future backend work)

- Authentication and user accounts
- Real file upload and object storage
- OCR and policy metadata extraction
- Real outbound email integration
- Persistent database and audit logs
- Billing and subscription management
