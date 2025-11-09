# PlumbaFix Troubleshooting Guide

## Quick Fixes for Common Issues

### 🔧 Installation Issues

#### Issue: `npm install` fails
**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### Issue: Dependency conflicts
**Solution**:
```bash
# Use legacy peer deps
npm install --legacy-peer-deps
```

---

### 🚀 Build & Run Issues

#### Issue: Port 3000 already in use
**Solution 1**: Kill the process using port 3000
```bash
# On Mac/Linux
lsof -ti:3000 | xargs kill -9

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Solution 2**: Change the port in `vite.config.ts`
```typescript
server: {
  port: 3001, // Change to any available port
  open: true,
}
```

#### Issue: Build fails with type errors
**Solution**:
```bash
# Check for type errors
npm run type-check

# If errors persist, check TypeScript version
npm list typescript

# Ensure it matches tsconfig requirements
```

#### Issue: Hot reload not working
**Solution**:
```bash
# Restart dev server
# Press Ctrl+C to stop
npm run dev
```

---

### 🎨 Styling Issues

#### Issue: Tailwind classes not working
**Solution**:
1. Check that `globals.css` is imported in `main.tsx`
2. Verify Tailwind v4.0 is installed:
```bash
npm list tailwindcss
```
3. Clear build cache:
```bash
rm -rf node_modules/.vite
npm run dev
```

#### Issue: Custom colors not showing
**Solution**:
1. Check `styles/globals.css` for color definitions
2. Verify CSS variables are properly defined
3. Restart dev server

---

### ⚠️ React Warnings

#### Issue: "Function components cannot be given refs"
**Status**: ✅ **FIXED** in AlertDialog component

**What was done**:
- Updated `AlertDialogOverlay` to use `React.forwardRef`
- Updated `AlertDialogContent` to use `React.forwardRef`
- Added proper displayName properties

**If you see this elsewhere**:
- Component needs to wrap with `React.forwardRef()`
- Example:
```typescript
const MyComponent = React.forwardRef<HTMLDivElement, Props>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} {...props} />;
  }
);
MyComponent.displayName = "MyComponent";
```

#### Issue: "Cannot update during render"
**Solution**:
- Don't call setState during render
- Use useEffect for side effects
```typescript
// ❌ Bad
function Component() {
  setCount(count + 1); // Don't do this
  return <div>{count}</div>;
}

// ✅ Good
function Component() {
  useEffect(() => {
    setCount(count + 1);
  }, []);
  return <div>{count}</div>;
}
```

---

### 🗺️ Navigation Issues

#### Issue: Screen not rendering after navigation
**Solution**:
1. Check if screen type is defined in `Screen` type in App.tsx
2. Verify the screen component is imported
3. Ensure the condition in App.tsx matches:
```typescript
{currentScreen === 'your-screen' && <YourScreen onNavigate={navigate} />}
```

#### Issue: Navigation props missing
**Solution**:
All screens should receive `onNavigate` prop:
```typescript
interface YourScreenProps {
  onNavigate: (screen: Screen) => void;
  // other props...
}
```

---

### 💾 State Management Issues

#### Issue: State not updating
**Solution**:
1. Check if you're mutating state directly (don't!)
```typescript
// ❌ Bad - mutating state
state.push(newItem);

// ✅ Good - creating new array
setState([...state, newItem]);
```

2. Ensure state setter is called correctly
3. Use React DevTools to inspect state

#### Issue: Stale closure in useEffect
**Solution**:
Add dependencies to useEffect:
```typescript
useEffect(() => {
  // Using 'count' here
  console.log(count);
}, [count]); // Add to dependencies
```

---

### 🖼️ Image Loading Issues

#### Issue: Images not loading from Unsplash
**Causes**:
- Network issues
- Invalid image URLs
- Rate limiting (rare)

**Solution**:
- Check browser console for errors
- Verify image URLs are valid
- Use ImageWithFallback component (built-in)
- Images will show placeholder if failed

---

### 📱 Responsive Design Issues

#### Issue: Layout broken on mobile
**Solution**:
1. Check breakpoint classes in components
2. Test with browser dev tools (mobile view)
3. Common fixes:
```typescript
// Ensure responsive classes are used
className="w-full lg:w-1/2" // Full width on mobile, half on desktop
className="p-4 lg:p-6"      // Smaller padding on mobile
className="text-sm lg:text-base" // Smaller text on mobile
```

#### Issue: Bottom navigation overlapping content
**Solution**:
Add bottom padding to content container:
```typescript
className="pb-20 lg:pb-0" // Padding for mobile nav
```

---

### 🔐 Mock Data Issues

#### Issue: Jobs/quotes not showing
**Solution**:
1. Check mock data in App.tsx (allJobs, mockQuoteRequests, etc.)
2. Verify data structure matches interface types
3. Check filter logic in Jobs component

#### Issue: User profile data not persisting
**Expected behavior**: Data resets on refresh (no backend)

**Solution for persistence**:
- Add localStorage:
```typescript
// Save to localStorage
useEffect(() => {
  localStorage.setItem('userProfile', JSON.stringify(userProfile));
}, [userProfile]);

// Load from localStorage
useEffect(() => {
  const saved = localStorage.getItem('userProfile');
  if (saved) setUserProfile(JSON.parse(saved));
}, []);
```

---

### 🎮 Gamification Issues

#### Issue: Credits not updating after DIY
**Solution**:
1. Check DIYRewards component `onUpdateProfile` callback
2. Verify App.tsx `setUserProfile` is called
3. Ensure credit calculation is correct

#### Issue: Badges not unlocking
**Solution**:
Check badge unlock conditions in DIYRewards.tsx:
```typescript
// Verify badge unlock logic
if (newDiyCount === 1) {
  // Unlock first badge
}
if (newDiyCount === 3) {
  // Unlock second badge
}
```

---

### 💳 Payment Flow Issues

#### Issue: Payment screen not loading
**Solution**:
Ensure these are set before navigating to payment:
- `selectedCustomerQuote` is not null
- `bookingDetails` is not null
- Navigate from BookingConfirmation screen

#### Issue: Credits not deducting
**Solution**:
Check PaymentScreen `onPaymentComplete` callback:
```typescript
onPaymentComplete={(creditsRedeemed) => {
  setUserProfile({
    ...userProfile,
    credits: userProfile.credits - creditsRedeemed
  });
});
```

---

### 🔨 Plumber Features Issues

#### Issue: Job revision button not working
**Status**: ✅ **IMPLEMENTED**

**Check**:
1. JobType is 'pending-approval'
2. AlertDialog is imported correctly
3. onNavigate prop is passed

#### Issue: Extra costs not saving
**Solution**:
Check PlumberJobTracker component:
1. Verify state management for extraCosts
2. Ensure add/edit/delete functions work
3. Check dialog forms are submitting

---

### 🐛 Console Errors

#### "ResizeObserver loop completed with undelivered notifications"
**Status**: Harmless warning, can be ignored
**Cause**: Browser internal behavior
**If needed**: Suppress in production build

#### "Hydration mismatch" errors
**Cause**: Server/client rendering mismatch
**Solution**: Not applicable (no SSR in this app)

#### Radix UI warnings
**Status**: Should be resolved after ref forwarding fix
**If persists**: Check component is using forwardRef

---

### 🏗️ Build Production Issues

#### Issue: Build size too large
**Check**:
```bash
npm run build
# Check dist/ folder size
```

**Optimize**:
1. Ensure tree-shaking is working
2. Remove unused dependencies
3. Lazy load heavy components
4. Use dynamic imports

#### Issue: Production build works but dev doesn't
**Solution**:
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

---

### 📦 Deployment Issues

#### Issue: 404 on page refresh (SPA routing)
**Solution**: Configure your host for SPA routing

**Vercel**: Add `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**Netlify**: Add `_redirects` in public folder:
```
/*    /index.html   200
```

**Apache**: Add `.htaccess`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

### 🔍 Debugging Tips

#### React DevTools
1. Install React DevTools browser extension
2. Inspect component props and state
3. Check component tree hierarchy

#### Console Logging
```typescript
// Strategic console logs
console.log('Current screen:', currentScreen);
console.log('User profile:', userProfile);
console.log('Current job:', currentJob);
```

#### Network Tab
- Check for failed API calls (if backend added)
- Verify image URLs are loading
- Check for CORS issues

#### Performance Tab
- Check for slow renders
- Identify performance bottlenecks
- Measure component render times

---

### 📞 Still Having Issues?

#### Before Asking for Help
1. ✓ Check this troubleshooting guide
2. ✓ Review relevant documentation files
3. ✓ Check browser console for errors
4. ✓ Try clearing cache and restarting
5. ✓ Verify all dependencies are installed

#### Information to Provide
- Error message (full text)
- Browser and version
- Node.js version (`node -v`)
- NPM version (`npm -v`)
- Steps to reproduce
- Screenshots if applicable

#### Useful Commands
```bash
# Check versions
node -v
npm -v
npm list react
npm list typescript

# Get full dependency tree
npm list

# Check for outdated packages
npm outdated

# Audit for vulnerabilities
npm audit
```

---

### ✅ Preventive Measures

#### Keep Dependencies Updated
```bash
# Check for updates
npm outdated

# Update carefully (test after!)
npm update
```

#### Regular Maintenance
1. Clear cache periodically
2. Delete node_modules and reinstall occasionally
3. Keep Node.js updated (LTS version)
4. Run type-check before committing

#### Best Practices
- Don't ignore TypeScript errors
- Test in multiple browsers
- Use React DevTools for debugging
- Keep components small and focused
- Document complex logic

---

## 🆘 Emergency Reset

If all else fails, complete reset:

```bash
# 1. Backup your changes (if any)
git status
git stash # if using git

# 2. Complete clean
rm -rf node_modules
rm -rf package-lock.json
rm -rf .vite
rm -rf dist

# 3. Reinstall
npm install

# 4. Try running
npm run dev
```

---

**Last Updated**: November 8, 2025  
**Version**: 1.0.0  
**Status**: Active
