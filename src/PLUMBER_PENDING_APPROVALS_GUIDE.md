# Plumber Pending Approvals - Quick Reference Guide

## 🎯 Overview

When a plumber completes a job, it requires customer approval before payment is released. This guide shows exactly where plumbers can track these pending approvals.

---

## 📍 Where to Find Pending Approvals

### 1. 🏠 **Home Dashboard** (Primary Alert)

**Path**: Plumber Dashboard → Home

**What You'll See**:
```
┌─────────────────────────────────────────────────┐
│ 🕐 Pending Customer Approval            [2]    │
│                                                  │
│ You have 2 completed jobs waiting for          │
│ customer approval. Payment will be released     │
│ once approved.                                  │
│                                                  │
│ [ View Pending Jobs → ]                        │
└─────────────────────────────────────────────────┘
```

**Features**:
- ⚠️ Amber/yellow alert card (can't miss it!)
- 🔢 Badge showing count of pending jobs
- 🔘 Quick link to full job history
- 📍 Always at top of dashboard when jobs pending

**When to Check**: Every time you open the app

---

### 2. 📋 **Job History Screen** (Detailed List)

**Path**: Bottom Navigation → History Icon → "Pending" Tab

**What You'll See**:

#### Header Stats:
```
┌──────────┐  ┌──────────┐  ┌──────────┐
│ 🕐  [2]  │  │ ✓   [3]  │  │ ✗   [1]  │
│ Pending  │  │Completed │  │ Declined │
└──────────┘  └──────────┘  └──────────┘
```

#### Tab Navigation:
```
┌─────────────────┐ ┌─────────────┐
│ 🕐 Pending [2] │ │ ✓ Done [3] │
└─────────────────┘ └─────────────┘
┌──────────────────────────────────┐
│    ✗ Not Selected [1]           │
└──────────────────────────────────┘
```

#### Pending Job Cards:
```
┌─────────────────────────────────────────────────┐
│ 🕐  Toilet Not Flushing              [Pending] │
│     👤 Sarah Johnson                            │
│                                                  │
│ 📍 123 Main St, Seattle, WA                     │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ Base Fee              $68.00                │ │
│ │ Extra Costs           $40.00                │ │
│ │ ────────────────────────────────────────── │ │
│ │ Expected Payout       $108.00               │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ Submitted Today, 1:30 PM           2h ago       │
│                                                  │
│        [ View Details → ]                       │
└─────────────────────────────────────────────────┘
```

**Features**:
- 📊 Stats showing pending count
- 🎨 Amber-themed tab and cards
- 💰 Expected payout breakdown
- ⏰ Time since submission
- ℹ️ Info banner explaining approval timeline
- 👆 Tap any job to see full details

**Default View**: Opens to "Pending" tab automatically

---

### 3. 📄 **Job Details Screen** (Individual Job)

**Path**: Job History → Pending Tab → View Details

**What You'll See**:
```
┌─────────────────────────────────────────────────┐
│ ← Toilet Not Flushing    [Pending Approval]   │
│                                                  │
│ 👤 Customer: Sarah Johnson                     │
│ 📍 123 Main St, Seattle, WA                     │
│ 📅 Submitted: Nov 8, 2025 at 1:30 PM          │
│ ⏰ 2 hours ago                                  │
│                                                  │
│ 💼 Work Summary:                                │
│ • Replaced flapper valve                       │
│ • Cleaned tank components                      │
│ • Tested flush mechanism                       │
│                                                  │
│ 💰 Payment Details:                             │
│ • Base Service Fee: $68.00                     │
│ • Parts (Flapper Valve): $40.00               │
│ • ────────────────────────                     │
│ • Expected Total: $108.00                      │
│                                                  │
│ ⚠️ Status: Awaiting customer approval          │
│    Payment will be released within 24h         │
│    of approval                                  │
│                                                  │
│ 🔒 Customer contact details will be shown      │
│    after approval for privacy                   │
└─────────────────────────────────────────────────┘
```

**Features**:
- 🏷️ "Pending Approval" status badge
- 💵 Expected payout (not confirmed yet)
- 📝 Work summary you submitted
- 🔐 Privacy protection (no contact until approved)
- 📸 Photos you uploaded (if any)

---

### 4. 🏁 **After Submission** (Confirmation Screen)

**Path**: Job Tracker → Mark as Complete → Submit for Approval

**What You'll See**:
```
┌─────────────────────────────────────────────────┐
│                                                  │
│               ✅                                │
│                                                  │
│     Job Submitted Successfully!                 │
│                                                  │
│ Your completed work has been sent to the        │
│ customer for approval.                          │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ 🕐 What's Next?                             │ │
│ │                                              │ │
│ │ The customer will review your work and      │ │
│ │ approve it. Once approved, your payment     │ │
│ │ will be processed and released within       │ │
│ │ 24 hours.                                   │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ Expected Payout                                 │
│ • Base Service Fee     $68.00                  │
│ • Additional Costs     $40.00                  │
│ • ─────────────────────────                    │
│ • Total Payout         $108.00                 │
│                                                  │
│        [ 🏠 Back to Home ]                      │
└─────────────────────────────────────────────────┘
```

**Features**:
- ✨ Success confirmation
- 💡 Explanation of next steps
- 💰 Payment breakdown
- ⏱️ Timeline expectations

---

## 🔔 Notification Strategy

### Immediate Notifications:
- ✅ Job submission confirmed
- 💰 Payment released (when approved)
- ⭐ Customer rating received

### Dashboard Alerts:
- 🏠 Home screen alert (always visible)
- 🔴 Badge on History tab icon
- 📊 Stats card showing count

### No Spam:
- ❌ No hourly reminders
- ❌ No pushy notifications
- ✅ Customer has reasonable time to review

---

## ⏰ Payment Timeline

```
Job Completed
    ↓
Submit for Approval (You) ────────────────┐
    ↓                                      │
Pending Approval Status                    │
    ↓                                      │
Customer Reviews (Their Time)              │ Visible in
    ↓                                      │ Pending Tab
Customer Approves ─────────────────────────┘
    ↓
Payment Processing
    ↓
💰 Payment Released (Within 24h)
    ↓
Shows in "Completed" Tab
```

**Typical Timeline**:
- Customer reviews: Usually within 4-8 hours
- Payment release: Within 24 hours of approval
- Total turnaround: 1-2 days average

---

## 💡 Pro Tips

### ✅ Best Practices:
1. **Add Photos**: Jobs with photos get approved faster
2. **Detailed Notes**: Explain what you did and why
3. **Accurate Costs**: Break down extra costs clearly
4. **Quality Work**: Speak for itself!

### 📱 Daily Routine:
1. Open app → Check home dashboard alert
2. If pending jobs → Tap "View Pending Jobs"
3. Review status and timeline
4. Continue with new quote requests

### 🎯 When to Follow Up:
- After 24 hours: Normal wait time
- After 48 hours: May want to check in
- After 72 hours: Contact support if needed

### ⚠️ What NOT to Do:
- Don't contact customer directly about approval
- Don't worry if it takes a day or two
- Don't add fake extra costs to inflate payout

---

## 🆘 Troubleshooting

### "Where's my payment?"
→ Check if status is still "Pending Approval" in History tab
→ Customer hasn't approved yet - give them time

### "It's been 3 days, no approval"
→ Navigate to Job Details
→ Look for any customer notes/feedback
→ Contact PlumbaFix support if needed

### "How do I check specific job?"
→ Bottom Nav → History Icon
→ "Pending" Tab
→ Find your job → "View Details"

### "Can I message the customer?"
→ Not until job is approved (privacy)
→ Customer can reach out to you if needed

---

## 📊 Quick Stats Meaning

| Icon | Status | What It Means |
|------|--------|---------------|
| 🕐 | Pending | Job completed, awaiting customer approval |
| ✓ | Completed | Customer approved, payment released |
| ✗ | Declined | Your quote wasn't selected by customer |

---

## 🎨 Visual Cues

### Color Coding:
- 🟡 **Amber/Yellow**: Pending approval (waiting)
- 🟣 **Purple**: Completed and paid (success)
- ⚫ **Gray**: Not selected (declined quote)
- 🔵 **Blue**: Active job in progress

### Badge Numbers:
- Red badge: Urgent attention needed
- Yellow badge: Pending items to track
- Purple badge: Completed items count

---

## 📖 Related Guides

- **Job Approval Flow**: See `/JOB_APPROVAL_FLOW.md` for full workflow
- **Payment Guide**: See `/PAYMENT_FLOW_GUIDE.md` for payment details
- **Quick Start**: See `/QUICK_START.md` for app basics

---

## 🚀 Quick Actions

**Want to see your pending approvals right now?**

1. Open PlumbaFix app
2. Look at the top of home screen (amber alert card)
3. Tap "View Pending Jobs"
4. Review your jobs in the "Pending" tab

**Need to submit a job for approval?**

1. Navigate to active job tracker
2. Mark status as "Completed"
3. Add any extra costs
4. Upload photos (optional)
5. Add notes
6. Tap "Complete & Submit for Approval"
7. See confirmation screen
8. Job now appears in "Pending" tab

---

*Last Updated: November 8, 2025*
