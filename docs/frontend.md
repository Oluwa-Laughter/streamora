# Frontend Architecture

## Overview

The Streamora web application is built with React, TypeScript, and Vite. It provides a user-friendly interface for managing streaming payments on Stellar.

## Stack

- **Framework**: React 18+
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Package Manager**: npm (monorepo)

## Project Structure

```
apps/web/
├── src/
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   │   ├── public/       # Landing and docs pages
│   │   ├── docs/         # Documentation pages
│   │   └── app/          # Application pages (authenticated)
│   ├── hooks/            # Custom React hooks
│   ├── App.tsx           # Main app router
│   ├── main.tsx          # Entry point
│   └── styles/           # Global styles
├── public/               # Static assets
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
└── tsconfig.json        # TypeScript configuration
```

## Key Components

### Navigation

Location: `src/components/Navigation.tsx`

- Header with logo and menu
- Links to all public pages
- App navigation for authenticated users
- Responsive mobile menu

### Footer

Location: `src/components/Footer.tsx`

- Links to docs, community, GitHub
- Copyright notice
- Social links

### Forms

Form components for:
- Stream creation
- Withdrawal requests
- Settings management

## Pages & Routes

### Public Pages

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home | Landing page with hero and features |
| `/how-it-works` | HowItWorks | Stream mechanics explanation |
| `/features` | Features | Feature list and status |
| `/use-cases` | UseCases | Real-world applications |
| `/developers` | Developers | Developer resource hub |
| `/roadmap` | Roadmap | Project timeline and status |
| `/about` | About | Project mission and values |
| `/community` | Community | Contributing and community info |

### Documentation Pages

| Route | Component | Purpose |
|-------|-----------|---------|
| `/docs` | DocsHome | Documentation hub |
| `/docs/getting-started` | GettingStarted | Setup and quickstart |
| `/docs/concepts` | Concepts | Core payment concepts |
| `/docs/smart-contracts` | SmartContracts | Contract architecture |
| `/docs/sdk` | SDK | SDK API reference |
| `/docs/examples` | Examples | Code examples |
| `/docs/security` | Security | Security and threat model |

### Application Pages

| Route | Component | Purpose |
|-------|-----------|---------|
| `/app` | Dashboard | Main dashboard |
| `/app/streams` | Streams | View all streams |
| `/app/streams/create` | CreateStream | Create new stream |
| `/app/streams/:id` | StreamDetail | Stream details and actions |
| `/app/activity` | Activity | Transaction history |
| `/app/settings` | Settings | User settings and config |

## Design System

### Colors

Defined in `src/styles/globals.css`:

```css
--color-navy-900: #0a1628;  /* Dark backgrounds */
--color-navy-50: #f7f9fb;   /* Light backgrounds */
--color-teal-600: #0d9488;  /* Primary accent */
--color-teal-500: #14b8a6;  /* Secondary accent */
```

### Typography

- **Headings**: 3xl, 4xl, 5xl bold
- **Body**: lg, md, sm regular
- **Mono**: `font-mono` for addresses/code

### Components

Tailwind utility classes combined with custom components:

- `.btn-primary`: Primary action button
- `.btn-secondary`: Secondary action button
- `.btn-outline`: Outlined button
- `.card`: Content card with border and shadow
- `.section-container`: Page width and padding

## Wallet Integration (Planned)

### Connection Flow

1. User clicks "Connect Wallet"
2. App prompts with Freighter/wallet choice
3. Wallet grants permission
4. App stores public key
5. User can create/manage streams

### Implementation Notes

- Use official Stellar SDK for wallet integration
- Never store private keys in browser
- Always sign via wallet provider
- Handle wallet rejections gracefully

### Transaction Flow

```
User Action
  ↓
Prepare Transaction (SDK)
  ↓
Show Confirmation (UI)
  ↓
Sign with Wallet
  ↓
Submit to Network
  ↓
Poll for Confirmation
  ↓
Display Result
```

## State Management (Planned)

### Current: Local Component State

Each page manages its own state with `useState`.

### Future: Global State

Options:
- React Context + useReducer
- Zustand (lightweight)
- Redux (if complexity grows)

Would manage:
- Connected wallet
- Stream data cache
- User preferences
- Transaction history

## Styling Approach

### CSS Structure

1. **Base**: Tailwind reset and custom properties
2. **Components**: Reusable utility classes (`.btn`, `.card`)
3. **Utilities**: Tailwind utilities for layout and spacing

### Dark Mode (Planned)

Framework in place for dark mode support. To enable:

```css
@media (prefers-color-scheme: dark) {
  /* Dark mode colors */
}
```

## Responsive Design

### Breakpoints (Tailwind)

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Layout Strategy

- Mobile-first approach
- `grid-cols-1 md:grid-cols-2` patterns
- Flexible spacing with `gap-` utilities
- Touch-friendly targets (44px minimum)

## Performance

### Optimization Strategies

1. **Code Splitting**: React Router lazy loading
2. **Image Optimization**: SVG and optimized PNG
3. **CSS**: Tailwind purging unused styles
4. **Bundle Size**: Monitor with `vite-plugin-visualizer`

### Monitoring

Add Sentry or similar for:
- JavaScript errors
- Performance metrics
- User interactions

## Testing

### Testing Setup

- **Framework**: Vitest for unit tests
- **Component Testing**: React Testing Library
- **E2E**: Playwright or Cypress (planned)

### Test Locations

- `src/components/*.test.tsx`
- `src/pages/*.test.tsx`
- `src/hooks/*.test.ts`

## Accessibility

### Guidelines

- WCAG 2.1 AA compliance target
- Keyboard navigation support
- Screen reader friendly
- Color contrast minimum 4.5:1

### Implementation

- Semantic HTML (`<button>`, `<form>`, `<nav>`)
- ARIA labels where needed
- Focus indicators visible
- Alt text on all images

## Build & Deployment

### Development

```bash
npm run dev
# Opens http://localhost:5173
```

### Production Build

```bash
npm run build
# Output in apps/web/dist/
```

### Deployment Targets

- **Vercel** (recommended)
- **Netlify**
- **Self-hosted** (AWS S3 + CloudFront, etc.)

### Environment Configuration

Use `VITE_*` prefix for environment variables:

```typescript
const contractId = import.meta.env.VITE_CONTRACT_ID;
const network = import.meta.env.VITE_NETWORK;
```

## Future Enhancements

- Real-time stream status updates
- Advanced charting and analytics
- Mobile app (React Native)
- Internationalization (i18n)
- Offline support (Progressive Web App)
