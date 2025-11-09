# Job Approval Flow Guide

This guide explains the job completion approval workflow implemented in PlumbaFix.

## Overview

When a plumber completes a job, it now requires customer approval before payment is released. This ensures quality work and gives customers confidence that the job meets their expectations.

## Flow Diagram

```
Plumber Completes Work
    ↓
Plumber Submits for Approval (PlumberJobTracker)
    ↓
Job Status: 'pending-approval'
    ↓
Plumber Sees Confirmation (PlumberJobSubmitted)
    ↓
Customer Notified (Jobs Screen - "Pending Approval" Tab)
    ↓
Customer Reviews Work (JobApproval Screen)
    ↓
Customer Decision:
    ├─ Approve → Payment Released → Job Status: 'completed'
    └─ Report Issue → Feedback Sent → Discussion/Resolution
```

## Components

### For Plumbers

#### 1. PlumberHome
- **Location**: `/components/PlumberHome.tsx`
- **Purpose**: Main plumber dashboard
- **New Features**:
  - **Pending Approval Alert Card**: Shows count of jobs awaiting customer approval
  - Prominent notification at top of dashboard
  - Quick link to view all pending jobs in history
  - Visual amber/yellow theme to draw attention
- **Navigation**: Links to `plumber-job-history` screen

#### 2. PlumberJobHistory
- **Location**: `/components/PlumberJobHistory.tsx`
- **Purpose**: Shows all plumber's job history with filtering
- **New Features**:
  - **New "Pending Approval" Tab**: Dedicated tab for jobs awaiting approval
  - Updated stats cards (3 columns: Pending, Completed, Declined)
  - Shows expected payout for pending jobs
  - Displays time since submission (hours ago)
  - Cost breakdown (base fee + extra costs)
  - Info banner explaining payment timeline
- **Tabs**:
  1. **Pending Approval**: Jobs completed and submitted, waiting for customer
  2. **Completed**: Jobs approved and paid
  3. **Not Selected**: Quotes that customer didn't choose

#### 3. PlumberJobTracker
- **Location**: `/components/PlumberJobTracker.tsx`
- **Purpose**: Allows plumber to track job progress and submit completed work
- **Key Features**:
  - Status updates (On the Way, Arrived, Working, Completed)
  - Add extra costs for parts/labor during the job
  - Photo documentation upload
  - Job notes
  - Submit for approval button (when status = 'completed')
  - Info banner explaining approval process
- **Navigation**: `plumber-job-submitted` screen on completion

#### 4. PlumberJobSubmitted
- **Location**: `/components/PlumberJobSubmitted.tsx`
- **Purpose**: Confirmation screen for plumber after submitting work
- **Key Features**:
  - Success confirmation message
  - Expected payout breakdown
  - Information about approval process
  - Timeline expectations (24 hours for payment after approval)
- **Navigation**: Back to plumber home

#### 5. PlumberJobDetails
- **Location**: `/components/PlumberJobDetails.tsx`
- **Purpose**: Shows detailed information about a specific job
- **Updates**:
  - Supports `pending-approval` status
  - Shows approval status badge
  - Displays expected payout vs. confirmed payout
  - Customer contact info hidden until approval

### For Customers

#### 2. Jobs Screen
- **Location**: `/components/Jobs.tsx`
- **Purpose**: Shows all customer jobs with filtering
- **Key Features**:
  - Added "Pending Approval" tab
  - Shows count badge for pending approvals
  - Alert card explaining approval is needed
  - Quick "Approve" button on job cards
  - Navigate to JobApproval for detailed review
- **New Status**: `pending-approval` added to job status types

#### 3. JobApproval
- **Location**: `/components/JobApproval.tsx`
- **Purpose**: Detailed review screen for customer to approve completed work
- **Key Features**:
  - Job information summary
  - Work summary from plumber
  - Photo documentation
  - Cost breakdown (base fee + extra costs)
  - Approve or report issue options
  - Contact plumber button
- **Actions**:
  - **Approve**: Releases payment, updates status to 'completed', shows success toast
  - **Report Issue**: Sends feedback to plumber/support, opens discussion

### For Customers

#### 4. JobDetails
- **Location**: `/components/JobDetails.tsx`
- **Purpose**: Shows comprehensive job details
- **Updates**:
  - Added support for `pending-approval` status
  - Shows alert and review button for pending approval jobs
  - Updated status badge configuration

## Job Statuses

### New Status: `pending-approval`
- **When**: Set after plumber marks job as completed and submits
- **Who Sees**: Both plumber and customer
- **Next Steps**: Customer must approve or report issue
- **Payment**: Held until approval

### Status Flow
1. `pending` → Job request sent, waiting for quotes
2. `accepted` → Plumber accepted job
3. `on-the-way` → Plumber traveling to location
4. `on-site` → Plumber arrived and working
5. **`pending-approval`** → Work completed, awaiting customer approval ⭐ NEW
6. `completed` → Customer approved, payment released

## Data Structure Updates

### JobData Type
```typescript
export interface JobData {
  // ... existing fields
  status: 'pending' | 'accepted' | 'on-the-way' | 'on-site' | 'completed' | 'left' | 'pending-approval';
  // ... existing fields
}
```

### Sample Pending Approval Job
```typescript
{
  id: 'APPR-001',
  status: 'pending-approval',
  jobType: 'plumber',
  paymentStatus: 'pending',
  // ... other fields
}
```

## Where Plumbers See Pending Approvals

Plumbers can track jobs awaiting customer approval in multiple places:

### 1. **PlumberHome Dashboard** (Primary Alert)
- **Location**: Main plumber dashboard
- **What They See**:
  - Prominent amber/yellow alert card at the top
  - "Pending Customer Approval" heading
  - Count badge showing number of pending jobs (e.g., "2")
  - Brief message: "You have 2 completed jobs waiting for customer approval"
  - "View Pending Jobs" button → navigates to Job History
- **When**: Always visible when there are pending approvals
- **Purpose**: Immediate awareness of pending payments

### 2. **PlumberJobHistory Screen** (Detailed List)
- **Location**: Job History → "Pending Approval" Tab
- **Access**: Via bottom navigation or from alert on home screen
- **What They See**:
  - Dedicated "Pending" tab (amber/yellow theme)
  - Count badge on tab
  - List of all jobs awaiting approval
  - Each card shows:
    - Job type and customer name
    - Location and time since submission (e.g., "2h ago")
    - Expected payout breakdown (base fee + extra costs)
    - Status: "Pending" badge
    - "View Details" button
  - Info banner explaining payment timeline
- **Stats**: Header shows count of pending jobs in stats cards
- **Purpose**: Detailed tracking and management

### 3. **PlumberJobDetails Screen** (Individual Job)
- **Location**: Accessible from Job History pending list
- **What They See**:
  - Full job information
  - "Pending Approval" status badge
  - Expected payout (not yet confirmed)
  - Submission timestamp
  - Cannot contact customer until approved (privacy)
- **Purpose**: Review specific job details while waiting

### 4. **Summary Stats** (Quick Reference)
- **Location**: Top of PlumberJobHistory screen
- **What They See**:
  - Three stat cards:
    1. **Pending**: Count with amber clock icon
    2. **Completed**: Approved and paid jobs
    3. **Declined**: Not selected quotes
- **Purpose**: At-a-glance status overview

## User Experience

### For Plumbers
1. Update job status to "Completed" in tracker
2. Add any extra costs for parts/labor
3. Upload photos of completed work
4. Add job notes
5. Click "Complete & Submit for Approval"
6. See confirmation screen with expected payout
7. Wait for customer approval (notified when approved)
8. Payment released within 24 hours of approval

### For Customers
1. Receive notification that job is completed
2. See "Pending Approval" badge in Jobs screen
3. Click "Approve" or "View Details"
4. Review work summary, photos, and costs
5. Options:
   - **Approve**: Payment released immediately
   - **Report Issue**: Send feedback to plumber
   - **Contact Plumber**: Ask questions before approving

## Payment Flow

### Before Approval
- Payment held in escrow
- Plumber sees "Payment Pending Approval"
- Customer sees total amount to be charged

### After Approval
- Payment released to plumber
- Customer charged (or credits deducted)
- Both parties receive confirmation
- Job marked as completed
- Receipt available for download

## Benefits

### For Customers
- ✅ Quality assurance before payment
- ✅ Review work documentation
- ✅ Verify costs match quote
- ✅ Dispute resolution process

### For Plumbers
- ✅ Protection against unfair disputes
- ✅ Professional documentation process
- ✅ Clear completion criteria
- ✅ Fair payment release timeline

## Testing the Flow

1. **Start a Plumber Job**: Navigate to PlumberJobTracker
2. **Update Status**: Mark as "Completed"
3. **Add Extra Costs**: Click "Add Cost" and enter parts/labor
4. **Submit**: Click "Complete & Submit for Approval"
5. **Switch to Customer**: See pending approval in Jobs screen
6. **Review**: Click job to see JobApproval screen
7. **Approve**: Click "Approve & Release Payment"
8. **Confirm**: See success toast and return to jobs

## Future Enhancements

- [ ] Email/SMS notifications for approval requests
- [ ] Dispute resolution workflow
- [ ] Photo comparison (before/after)
- [ ] Video documentation support
- [ ] Customer signature for approval
- [ ] Partial approval (approve base cost, dispute extras)
- [ ] Timer for auto-approval after X days
- [ ] Rating prompt after approval
