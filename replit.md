# PlumbaFix Mobile App Design

## Overview
PlumbaFix is a comprehensive plumbing service application built with React, TypeScript, and Vite. This app connects customers with certified plumbers for plumbing diagnostics, repairs, and maintenance services. It features AI-powered diagnostics, real-time job tracking, quote comparison, and payment processing.

## Project Type
Frontend-only React web application with mobile-responsive design

## Tech Stack
- **Framework**: React 18.3.1
- **Build Tool**: Vite 6.3.5
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4.1.3 (pre-compiled in index.css)
- **UI Components**: Radix UI (accordion, dialogs, dropdowns, etc.)
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Animations**: Motion library
- **Charts**: Recharts
- **Notifications**: Sonner (toast notifications)

## Project Structure
```
src/
├── components/          # All React components
│   ├── ui/             # Reusable UI components (buttons, cards, etc.)
│   ├── figma/          # Figma-related components
│   └── *.tsx           # Feature components (Home, Login, Jobs, etc.)
├── index.css           # Pre-compiled Tailwind CSS v4.1.3
├── App.tsx             # Main app component with routing logic
└── main.tsx            # Entry point
```

## Styling Notes
The project uses pre-compiled Tailwind CSS v4.1.3 (stored in `src/index.css`). This file contains all the generated Tailwind utility classes and is imported in `main.tsx`. If you need to modify Tailwind styles, you'll need to set up a proper Tailwind build pipeline or regenerate the CSS file.

## Key Features
- **Customer Flow**: Welcome → Login → Diagnostic → DIY Guide or Job Request → Plumber Matching → Job Tracking → Payment
- **Plumber Flow**: Home → Job Acceptance → Quote Submission → Job Tracking → Earnings
- **AI-Powered Diagnostics**: Camera interface for problem detection
- **Quote Comparison**: Compare multiple plumber quotes
- **Real-Time Tracking**: Track job progress in real-time
- **Payment Integration**: Secure payment processing
- **Gamification**: DIY rewards system

## Development
The application runs on port 5000 with Vite's dev server configured for the Replit environment.

### Running Locally
```bash
npm install
npm run dev
```

### Building for Production
```bash
npm run build
```

## Configuration
- **Port**: 5000 (configured for Replit webview)
- **Host**: 0.0.0.0 (allows Replit proxy access)
- **Allowed Hosts**: true (bypasses host header verification)

## Recent Changes (November 9, 2025)
- Imported project from GitHub
- Configured Vite for Replit environment (port 5000, host 0.0.0.0, allowedHosts)
- Set up development workflow on port 5000
- Added .gitignore for Node.js projects
- Configured deployment settings for autoscale
- Fixed CSS loading issue: Changed import from `./styles/globals.css` to `./index.css` to use pre-compiled Tailwind CSS

## Deployment
The app is configured for Replit's autoscale deployment:
- Build command: `npm run build`
- Run command: `npx vite preview --host 0.0.0.0 --port 5000`

## Original Design
This project was originally designed in Figma and exported as a code bundle. The original design is available at: https://www.figma.com/design/wGT5ilhXzRqZJ2WBm4I0w3/PlumbaFix-Mobile-App-Design
