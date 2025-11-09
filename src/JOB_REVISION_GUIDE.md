# Job Revision Feature Guide

## Overview
Plumbers can now revise their job submissions while they are pending customer approval. This allows them to correct mistakes, update costs, or make any necessary changes before the customer reviews the work.

## How It Works

### For Pending Approval Jobs

1. **Access Job Details**
   - Navigate to Job History → Pending Approval tab
   - Click "View Details" on any pending approval job

2. **Review Current Submission**
   - See all submitted information including:
     - Work performed
     - Parts used
     - Additional notes
     - Job photos
     - Extra costs
     - Total expected payout

3. **Revise the Job**
   - Click the blue "Revise Job" button at the bottom
   - A confirmation dialog will appear explaining that:
     - Your current submission will be withdrawn
     - The customer will not see the job completion until you resubmit
     - You can make any necessary changes

4. **Make Changes**
   - After confirming, you'll be taken back to the PlumberJobTracker screen
   - The job status will be set to "completed" (editable state)
   - You can:
     - Update status
     - Add/edit/remove extra costs
     - Update job notes
     - Add more photos
     - Change any other details

5. **Resubmit**
   - Once you've made your changes, click "Complete & Submit for Approval" again
   - The updated submission will be sent to the customer for approval

## Visual Indicators

### Pending Approval Page
- **Amber header** with clock icon - indicates awaiting approval status
- **Info banner** at the top explaining the pending status and revision option
- **Revise Job button** - prominent blue button to start revision process
- **Expected payout display** - shows how much you'll earn when approved

## User Experience Flow

```
Pending Approval Job Details
        ↓
Click "Revise Job"
        ↓
Confirmation Dialog
        ↓
Click "Revise Job" (confirm)
        ↓
Navigate to PlumberJobTracker
        ↓
Make necessary changes
        ↓
Click "Complete & Submit for Approval"
        ↓
Back to Pending Approval status
```

## Best Practices

1. **Double-check before initial submission** - Review all details carefully to minimize the need for revisions

2. **Clear communication** - If you need to revise, ensure all changes are accurate and complete

3. **Timely revisions** - Make revisions quickly to avoid keeping the customer waiting

4. **Professional notes** - Always provide clear notes about the work performed and parts used

## Technical Notes

- Revisions withdraw the current submission from customer view
- No approval history is shown to the customer for withdrawn submissions
- You can revise as many times as needed before customer approval
- Once the customer approves, the job cannot be revised
