# PlumbaFix App Architecture

## Application Overview
PlumbaFix is a comprehensive full-stack plumbing assistant application built with React, TypeScript, and Tailwind CSS.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         PlumbaFix App                            │
│                       (App.tsx - Main Hub)                       │
└─────────────────────────────────────────────────────────────────┘
                                 │
                ┌────────────────┴────────────────┐
                │                                  │
        ┌───────▼────────┐              ┌────────▼────────┐
        │  Customer Flow │              │  Plumber Flow   │
        └────────────────┘              └─────────────────┘
                │                                  │
    ┌───────────┼───────────┐         ┌──────────┼──────────┐
    │           │           │         │          │          │
┌───▼───┐  ┌───▼───┐  ┌───▼───┐  ┌──▼───┐  ┌───▼───┐  ┌──▼───┐
│Welcome│  │  AI   │  │ Quote │  │Quote │  │  Job  │  │ Job  │
│ Login │  │Diag.  │  │System │  │Review│  │Tracker│  │Hist. │
└───────┘  └───┬───┘  └───────┘  └──────┘  └───────┘  └──────┘
               │
        ┌──────┴──────┐
        │             │
    ┌───▼───┐    ┌───▼────┐
    │  DIY  │    │ Request│
    │ Guide │    │ Plumber│
    └───┬───┘    └────────┘
        │
    ┌───▼────┐
    │Rewards │
    │Credits │
    └────────┘
```

## Component Structure

### Core Components (40+ Screens)

#### Authentication & Onboarding
- **Welcome.tsx** - Landing/splash screen
- **Login.tsx** - Authentication with user type selection

#### Customer Journey
1. **Home.tsx** - Main dashboard with quick actions
2. **Diagnostic.tsx** - AI-powered issue detection
3. **CameraInterface.tsx** - Photo capture for analysis
4. **DiagnosticResult.tsx** - AI analysis results
5. **DIYGuide.tsx** - Step-by-step repair instructions
6. **DIYRewards.tsx** - Gamification & credit rewards
7. **JobRequest.tsx** - Professional service request
8. **QuoteBroadcast.tsx** - Quote request broadcasting
9. **QuoteComparison.tsx** - Compare multiple quotes
10. **CustomerQuoteReview.tsx** - Individual quote details
11. **BookingConfirmation.tsx** - Schedule appointment
12. **PaymentScreen.tsx** - Payment with credit redemption
13. **PaymentSuccess.tsx** - Confirmation screen
14. **PlumberMatching.tsx** - Find nearby plumbers
15. **JobTracker.tsx** - Real-time job tracking
16. **Jobs.tsx** - Job history with filters
17. **JobDetails.tsx** - Detailed job information
18. **JobApproval.tsx** - Approve completed work
19. **AIReport.tsx** - Full AI diagnostic report
20. **UserProfile.tsx** - Customer profile & stats
21. **UserSettings.tsx** - Account settings
22. **UserDashboard.tsx** - Overview dashboard
23. **AddressSelect.tsx** - Location management
24. **AddAddressForm.tsx** - Add new address

#### Plumber Journey
1. **PlumberHome.tsx** - Dashboard with active jobs
2. **PlumberQuoteReview.tsx** - Review quote requests
3. **PlumberQuoteSubmitted.tsx** - Quote confirmation
4. **PlumberJobTracker.tsx** - Track active jobs
5. **PlumberJobSubmitted.tsx** - Job completion confirmation
6. **PlumberJobHistory.tsx** - Historical jobs (filtered)
7. **PlumberJobDetails.tsx** - Detailed job view with revision
8. **PlumberEarnings.tsx** - Income tracking
9. **PlumberProfile.tsx** - Plumber profile settings

#### Shared Components
- **Sidebar.tsx** - Desktop navigation with user switching
- **BottomNavigation.tsx** - Mobile customer navigation
- **PlumberBottomNavigation.tsx** - Mobile plumber navigation

### UI Components (40+ from ShadCN)
Located in `/components/ui/`:
- Form controls (button, input, select, checkbox, etc.)
- Overlays (dialog, alert-dialog, sheet, drawer)
- Data display (card, table, badge, avatar)
- Feedback (toast/sonner, progress, skeleton)
- Navigation (tabs, accordion, breadcrumb)
- And many more...

## Data Flow

### State Management
```typescript
App.tsx manages global state:
- currentScreen: Screen      // Current view
- userType: UserType          // 'customer' | 'plumber' | null
- diagnosticData: object      // AI analysis data
- currentJob: JobData         // Active job details
- userProfile: UserProfile    // Credits, badges, level
- allJobs: JobData[]          // Complete job history
- selectedAddress: string     // Current location
- bookingDetails: object      // Appointment info
- creditsRedeemed: number     // Payment credits
```

### Navigation System
```typescript
// Centralized navigation function
const navigate = (screen: Screen) => {
  setCurrentScreen(screen);
}

// All components receive onNavigate prop
<Component onNavigate={navigate} />
```

### Screen Types (74 total screens)
```typescript
type Screen = 
  // Auth
  | 'welcome' | 'login'
  // Customer
  | 'home' | 'diagnostic' | 'camera' | 'diagnostic-result'
  | 'diy-guide' | 'diy-rewards' | 'job-request' | 'quote-broadcast'
  | 'plumber-matching' | 'job-tracker' | 'jobs' | 'job-details'
  | 'job-approval' | 'ai-report' | 'user-dashboard' | 'user-profile'
  | 'user-settings' | 'address-select' | 'add-address'
  | 'quote-comparison' | 'customer-quote-review'
  | 'booking-confirmation' | 'payment' | 'payment-success'
  // Plumber
  | 'plumber-home' | 'plumber-job-tracker' | 'plumber-job-submitted'
  | 'plumber-job-history' | 'plumber-job-details' | 'plumber-earnings'
  | 'plumber-quote-review' | 'plumber-quote-submitted'
```

## Key Features Implementation

### 1. Gamification System
```
DIY Completion → Earn Credits → Unlock Badges → Level Up
     ↓               ↓              ↓             ↓
DIYRewards.tsx → UserProfile → Badge Display → Progress Bar
```

### 2. Quote System
```
Job Request → Broadcast → Receive Quotes → Compare → Select → Book
     ↓           ↓            ↓              ↓         ↓       ↓
JobRequest → QuoteBroadcast → Home → QuoteComparison → 
CustomerQuoteReview → BookingConfirmation
```

### 3. Job Approval Flow
```
Job Complete → Plumber Submit → Customer Review → Approve/Revise
     ↓              ↓                 ↓               ↓
JobTracker → PlumberJobSubmitted → JobApproval → Payment Release
                                        │
                                    Revision ↓
                                PlumberJobDetails → PlumberJobTracker
```

### 4. Payment Integration
```
Select Quote → Book Appointment → Choose Payment Method → 
Apply Credits → Complete Payment → Success Screen
     ↓              ↓                    ↓                  ↓
Quote → BookingConfirmation → PaymentScreen → PaymentSuccess
```

## Styling System

### Tailwind CSS v4.0
- Custom color tokens in `globals.css`
- Design system variables
- Responsive utilities
- Animation classes

### Color Palette
```css
Primary Blue: #007AFF
Background: #F4F8FB
Success Green: #00C853
Warning Amber: #F59E0B
Danger Red: #DC2626
```

### Typography
- Default font sizes and weights
- Responsive text scaling
- Custom heading styles
- Body text hierarchy

## Responsive Design

### Breakpoints
- Mobile: < 768px (full screen, bottom nav)
- Tablet: 768px - 1024px (sidebar, optimized layout)
- Desktop: > 1024px (sidebar + full features)

### Mobile Optimizations
- Bottom navigation bars
- Touch-friendly buttons (min 44px)
- Swipeable cards
- Compact headers
- Full-screen modals

## Performance Optimizations

### Code Splitting
- Lazy loading for routes
- Component-level splitting
- Dynamic imports for heavy features

### State Management
- Minimal re-renders
- Memoization where needed
- Efficient prop passing

### Asset Optimization
- Optimized images (Unsplash CDN)
- SVG icons (Lucide React)
- Minimal CSS bundle

## Security Considerations

### Current Implementation (Demo)
- Simulated authentication
- Mock data storage
- No real payment processing

### Production Requirements
- Real authentication (JWT, OAuth)
- Backend API integration
- Secure payment gateway
- Data encryption
- Input validation
- XSS protection
- CSRF tokens

## Future Enhancements

### Planned Features
1. Real-time notifications (WebSockets)
2. Push notifications (PWA)
3. Chat system (plumber-customer)
4. Video call integration
5. Advanced analytics dashboard
6. Admin panel
7. Multi-language support
8. Dark mode
9. Accessibility improvements (WCAG 2.1)
10. Native mobile apps

### Backend Integration
- REST API or GraphQL
- Database (PostgreSQL, MongoDB)
- File storage (AWS S3, Cloudinary)
- Real-time updates (Socket.io, Pusher)
- Payment processing (Stripe, PayPal)
- SMS notifications (Twilio)
- Email service (SendGrid)

## Testing Strategy

### Recommended Testing
1. **Unit Tests**: Component logic
2. **Integration Tests**: User flows
3. **E2E Tests**: Critical paths
4. **Visual Tests**: UI consistency
5. **Performance Tests**: Load times
6. **Accessibility Tests**: WCAG compliance

### Testing Tools
- Jest + React Testing Library
- Cypress or Playwright
- Lighthouse for performance
- axe-core for accessibility

## Deployment

### Build Process
```bash
npm run build      # Production build
npm run preview    # Preview build
```

### Hosting Options
- Vercel (recommended)
- Netlify
- AWS Amplify
- Google Cloud Platform
- Custom server (Node.js)

### Environment Variables
- API endpoints
- Payment keys
- Analytics IDs
- Feature flags

## Documentation

### Available Guides
1. `BUILD_SUCCESS.md` - Build completion & quick start
2. `QUICK_START.md` - Getting started guide
3. `WEB_APP_GUIDE.md` - Comprehensive app overview
4. `GAMIFICATION_GUIDE.md` - Reward system details
5. `QUOTE_COMPARISON_GUIDE.md` - Quote feature guide
6. `BOOKING_FLOW_GUIDE.md` - Booking process
7. `PAYMENT_FLOW_GUIDE.md` - Payment integration
8. `JOB_APPROVAL_FLOW.md` - Approval workflow
9. `JOB_REVISION_GUIDE.md` - Revision feature
10. `PLUMBER_PENDING_APPROVALS_GUIDE.md` - Plumber approvals
11. `DEPLOYMENT_GUIDE.md` - Production deployment

---

**Architecture Version**: 1.0.0  
**Last Updated**: November 8, 2025  
**Status**: Production Ready (Frontend)
