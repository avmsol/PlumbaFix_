# Quote Broadcast Feature - Implementation Guide

## Overview

The Quote Broadcast screen visualizes the process of sharing a plumbing job request to all certified plumbers in the user's area. This creates transparency and excitement as users see their request being distributed in real-time.

## User Flow

```
Request Quote Page → Click "Get Quote from Plumbers" → Quote Broadcast Screen → My Jobs Screen
```

## Screen Components

### 1. **Quote Broadcast Screen** (`/components/QuoteBroadcast.tsx`)

**Purpose**: Visualize the quote request being broadcast to nearby plumbers

**Key Features**:
- **Animated Map Visualization**: Shows a circular area representing the service radius
- **Central Location Pin**: Displays the user's service address at the center
- **Ripple Animation**: Broadcasts waves emanating from the center location
- **Plumber Avatars**: 8 plumber avatars positioned around a circle showing nearby professionals
- **Real-time Notifications**: Plumbers "receive" the notification with animated checkmarks
- **Progress Counter**: Shows how many plumbers have been notified (e.g., "5 / 8")
- **Distance Badges**: Each plumber shows their distance from the job location
- **Auto-redirect**: Automatically navigates to "My Jobs" screen after completion

### 2. **Animation Stages**

The screen progresses through 3 stages:

#### Stage 1: Broadcasting (1.5 seconds)
- Shows ripple effects emanating from center
- Header: "Broadcasting Request..."
- Subtext: "Searching for certified plumbers in your area"

#### Stage 2: Receiving (Variable duration - ~1.6 seconds)
- Plumbers appear one by one around the circle
- Each plumber gets a green checkmark when notified
- Counter increments: "1 / 8", "2 / 8", etc.
- Header: "Plumbers Receiving Request"
- Subtext: "Notifying 8 available plumbers nearby"

#### Stage 3: Complete (2 seconds before redirect)
- All plumbers notified with checkmarks
- Success icon appears in stats card
- Header: "Request Sent Successfully!"
- Subtext: "You'll receive quotes from interested plumbers soon"
- Shows "Redirecting to your jobs..." message

### 3. **Visual Elements**

#### Central Pin
- 80px circular pin with gradient background (#007AFF to #0051D5)
- MapPin icon from Lucide
- Address label below showing job location
- Continuous ripple effects during broadcast stage

#### Plumber Avatars
- 8 plumbers positioned in a circle (360° / 8 = 45° spacing)
- 140px radius from center
- Each avatar:
  - 64px × 64px circular image
  - White border (4px)
  - Drop shadow
  - Green checkmark badge when notified
  - Distance label below (e.g., "1.2 mi", "2.4 mi")

#### Range Circle
- Dashed border circle showing service area
- 90% of container size
- Light blue background with transparency
- Represents the search radius for plumbers

#### Stats Card
- Shows real-time counter: "Plumbers Notified: X / 8"
- Users icon with gradient background
- Success message on completion
- Smooth animations for all state changes

## Technical Implementation

### Props
```typescript
interface QuoteBroadcastProps {
  onNavigate: (screen: Screen) => void;
  jobAddress: string;
}
```

### Mock Data
The screen uses mock data for 8 nearby plumbers with:
- Unique IDs
- Names
- Profile photos
- Distances (1.2 mi - 3.5 mi)
- Angular positions (0° - 315°)
- Staggered animation delays

### Animations (Motion/React)
- **Initial Load**: Header and central pin scale and fade in
- **Ripples**: Continuous expanding circles during broadcast
- **Plumber Appearance**: Spring animation with staggered delays
- **Notification Pulse**: Green pulse effect when plumber is notified
- **Stats Counter**: Scale bounce effect when number changes
- **Success Icon**: Rotate and scale spring animation

### Timing
- Broadcasting stage: 1.5 seconds
- Each plumber notification: 200ms interval
- Complete stage display: 1 second
- Auto-redirect delay: 3 seconds after completion
- **Total duration**: ~6.5 seconds

## Integration with App Flow

### App.tsx Changes

1. **Import added**:
```typescript
import QuoteBroadcast from './components/QuoteBroadcast';
```

2. **Screen type updated**:
```typescript
export type Screen = 
  | ...
  | 'quote-broadcast'
  | ...
```

3. **Navigation flow updated**:
```typescript
// JobRequest onConfirm now navigates to:
navigate('quote-broadcast'); // Instead of 'jobs'
```

4. **Screen rendering added**:
```typescript
{currentScreen === 'quote-broadcast' && currentJob && (
  <QuoteBroadcast 
    onNavigate={navigate}
    jobAddress={currentJob.address || selectedAddress}
  />
)}
```

## Design System Adherence

### Colors
- Primary Blue: `#007AFF`
- Secondary Blue: `#0051D5`
- Success Green: `#00C853`
- Background: `#F4F8FB`
- Gradient: `from-[#007AFF]/5 via-[#F4F8FB] to-purple-50`

### Components Used
- Card (shadcn/ui)
- Motion (Framer Motion)
- Lucide Icons: MapPin, CheckCircle, Radio, Users

### Typography
- Headers: 2xl/3xl size with default system font weights
- Body text: Gray-600 for secondary text
- Stats: 2xl for numbers, small for labels

## User Experience Benefits

1. **Transparency**: Users see exactly what happens after submitting a request
2. **Trust Building**: Visual confirmation that real plumbers are being notified
3. **Engagement**: Animated experience keeps users interested during processing
4. **Expectation Setting**: Clear messaging about what happens next
5. **Geographical Context**: Shows plumber distances and locations
6. **Smooth Transitions**: Auto-redirect eliminates extra clicks

## Future Enhancements

Potential improvements for production:

1. **Real-time Data**: Connect to actual plumber database
2. **Dynamic Radius**: Adjust search radius based on availability
3. **Map Integration**: Show actual map with pins (Google Maps/Mapbox)
4. **Push Notifications**: Real-time updates when plumbers respond
5. **Preference Filters**: Filter by ratings, distance, availability
6. **Manual Skip**: Allow users to skip animation and go directly to jobs
7. **Sound Effects**: Subtle notification sounds for each plumber
8. **Haptic Feedback**: Vibration on mobile when plumbers are notified

## Testing Checklist

- [ ] Animation timing is smooth and not too fast/slow
- [ ] All 8 plumbers appear correctly around the circle
- [ ] Counter increments properly (0→1→2...→8)
- [ ] Auto-redirect works after completion
- [ ] Responsive design works on mobile and desktop
- [ ] Address displays correctly from job data
- [ ] Back button/navigation interrupts work properly
- [ ] Memory cleanup (timers cleared on unmount)

## Related Files

- `/components/QuoteBroadcast.tsx` - Main component
- `/App.tsx` - Navigation and state management
- `/components/JobRequest.tsx` - Previous screen (triggers broadcast)
- `/components/Jobs.tsx` - Next screen (destination after broadcast)

---

**Last Updated**: January 2025
**Status**: ✅ Implemented and Ready for Use
