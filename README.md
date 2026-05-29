# SubShield - Insurance Compliance Vault

A modern React application for subcontractors to manage insurance policies, track compliance, and route COI packages to general contractors.

**Built with:** React 19 + Vite 6 + Lucide Icons

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Features

✅ **Policy Vault**
- Track multiple insurance policies
- Real-time compliance scoring
- Document verification and storage
- Policy renewal tracking

✅ **GC Directory**
- Save contractor details and certificate holders
- One-tap COI routing
- Project history and delivery preferences

✅ **COI Management**
- Review packages before sending
- Email preview with cover letter
- Activity tracking and logging

✅ **Data Persistence**
- LocalStorage integration
- Automatic save on every action
- One-click reset to demo state

✅ **Responsive Design**
- Mobile (≤560px)
- Tablet (≤900px)  
- Desktop (1240px max-width)

✅ **Accessibility**
- ARIA labels and roles
- Keyboard navigation (ESC to close modals)
- Screen reader support

## Architecture

```
src/
├── main.jsx                    React entry point
├── App.jsx                     Root component
└── subshield/
    ├── SubShieldComplete.jsx   State orchestrator
    ├── data.js                 Mock data and seed state
    ├── utils.js                Helper functions (storage, scoring, formatting)
    ├── icons.js                Icon mappings
    ├── styles.css              Complete design system
    └── components/
        ├── Layout.jsx          Sidebar, header, navigation
        ├── VaultView.jsx       Policy list and detail
        ├── ContractorsView.jsx GC directory
        ├── ActivityView.jsx    Event log
        ├── ProfileView.jsx     Account and settings
        ├── Modal.jsx           Base modal component
        ├── SendModal.jsx       COI package review
        ├── ScanModal.jsx       Document upload
        ├── AddGCModal.jsx      New contractor form
        ├── EditHolderModal.jsx Edit contractor
        ├── SuccessModal.jsx    Send confirmation
        ├── ScoreRing.jsx       SVG compliance ring
        └── CopyButton.jsx      Clipboard utility
```

## State Management

All state is managed in `SubShieldComplete.jsx` using React hooks:
- `useState` for local state (view, modals, selections)
- `useMemo` for derived values (score, docs, critical policies)
- `useEffect` for side effects (selector validation, toast cleanup, localStorage)

No external state library needed for this prototype.

## Data Model

### Policies
```javascript
{
  id: string,
  type: 'workers' | 'liability' | 'auto' | 'umbrella' | 'license',
  name: string,
  carrier: string,
  policyNumber: string,
  daysRemaining: number,
  expires: string (ISO),
  premium: number,
  limit: string,
  statusNote: string,
  documents: string[]
}
```

### Contractors (GCs)
```javascript
{
  id: string,
  name: string,
  initials: string,
  contact: string,
  email: string,
  delivery: string,
  holder: string,
  requirements: string,
  projects: string[]
}
```

### Activity
```javascript
{
  id: string,
  title: string,
  body: string,
  time: string
}
```

## Styling

All styles in `src/subshield/styles.css`:
- Design tokens (colors, shadows, radii)
- CSS custom properties for easy theming
- Mobile-first responsive breakpoints
- Smooth animations and transitions

## Production Roadmap

When ready to ship, add:
- [ ] Real authentication (Clerk, Supabase)
- [ ] Backend API (Node.js, Python, etc.)
- [ ] Database (PostgreSQL, MongoDB)
- [ ] PDF upload to S3 or R2
- [ ] OCR / document extraction
- [ ] Email delivery (SendGrid, Resend)
- [ ] Stripe billing
- [ ] E2E tests (Playwright, Cypress)
- [ ] Audit logging

## Development

```bash
# Lint check
npm run lint

# Format code (add prettier if needed)
npx prettier --write .
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

MIT
