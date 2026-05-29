# SubShield

SubShield is a React frontend prototype for subcontractor insurance compliance:

- Vault carrier-issued policy documents
- Track expiration risk and compliance score
- Manage GC certificate holder data
- Route COI packages with a review step

## Stack

- React 19
- Webpack 5 (no Vite)
- ESLint 9
- Lucide React icons

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

```bash
npm run dev    # webpack dev server
npm run build  # production build into dist/
npm run lint   # eslint
```

## Project structure

```text
src/
  App.jsx
  main.jsx
  subshield/
    SubShieldComplete.jsx
    data.js
    icons.js
    styles.css
    utils.js
    components/
      ActivityView.jsx
      AddGCModal.jsx
      ContractorsView.jsx
      CopyButton.jsx
      EditHolderModal.jsx
      Layout.jsx
      Modal.jsx
      ProfileView.jsx
      ScanModal.jsx
      ScoreRing.jsx
      SendModal.jsx
      SuccessModal.jsx
      VaultView.jsx
```

## Notes

- App state persists to `localStorage` using key `subshield.complete.v2`.
- This repo is frontend-only and uses seeded mock data from `src/subshield/data.js`.
