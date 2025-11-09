import { ArrowLeft, CheckCircle2, Camera, DollarSign, AlertCircle, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useState } from 'react';
import type { Screen } from '../App';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface JobApprovalProps {
  onNavigate: (screen: Screen) => void;
}

export default function JobApproval({ onNavigate }: JobApprovalProps) {
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const baseCost = 68;
  const extraCosts = [
    { description: 'Replacement flapper valve', amount: 15, category: 'parts' },
    { description: 'Additional labor - pipe adjustment', amount: 25, category: 'labor' },
  ];
  const totalExtraCosts = extraCosts.reduce((sum, cost) => sum + cost.amount, 0);
  const totalCost = baseCost + totalExtraCosts;

  const handleApprove = () => {
    setShowApprovalDialog(false);
    // In a real app, this would:
    // 1. Update job status to 'completed'
    // 2. Release payment to plumber
    // 3. Send confirmation to both parties
    
    // Show success toast
    toast.success('Work Approved!', {
      description: `Payment of $${totalCost.toFixed(2)} has been released to your plumber.`,
    });
    
    // Navigate back to jobs
    setTimeout(() => {
      onNavigate('jobs');
    }, 500);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      return;
    }
    setShowRejectDialog(false);
    setRejectionReason('');
    // In a real app, this would send feedback to the plumber
    
    // Show info toast
    toast.info('Issue Reported', {
      description: 'Your feedback has been sent to the plumber and our support team.',
    });
    
    setTimeout(() => {
      onNavigate('jobs');
    }, 500);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#007AFF] to-[#0051D5] text-white p-6 pt-16">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onNavigate('jobs')}
          className="mb-4 text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl mb-2">Review Completed Job</h1>
        <p className="text-white/90">Approve the work to release payment</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-32 space-y-6">
        {/* Status Alert */}
        <Card className="p-5 border-[#007AFF] bg-[#007AFF]/5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#007AFF] rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-[#007AFF] mb-1">Awaiting Your Approval</h3>
              <p className="text-sm text-gray-600">
                Your plumber has completed the work. Please review the details below and approve to release payment.
              </p>
            </div>
          </div>
        </Card>

        {/* Job Details */}
        <Card className="p-5 border-gray-100">
          <h3 className="mb-3">Job Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Issue</p>
              <p className="text-gray-900">Toilet Not Flushing</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Plumber</p>
              <p className="text-gray-900">Mike Johnson</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Service Date</p>
              <p className="text-gray-900">Today, 2:30 PM</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <Badge className="bg-green-100 text-green-800">
                Completed
              </Badge>
            </div>
          </div>
        </Card>

        {/* Work Summary */}
        <Card className="p-5 border-gray-100">
          <h3 className="mb-3">Work Summary</h3>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-gray-700 text-sm leading-relaxed">
              Replaced the faulty flapper valve which was preventing proper flushing. Also adjusted the fill valve height for optimal water level. Tested multiple flushes to ensure proper operation. Additionally, tightened the water supply pipe connection that was slightly loose.
            </p>
          </div>
        </Card>

        {/* Work Photos */}
        <Card className="p-5 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="w-5 h-5 text-gray-600" />
            <h3>Work Documentation</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
            <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">Photos uploaded by plumber</p>
        </Card>

        {/* Cost Breakdown */}
        <Card className="p-5 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-gray-600" />
            <h3>Payment Summary</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Base Service Fee</p>
              <p className="text-gray-900">${baseCost.toFixed(2)}</p>
            </div>
            
            {extraCosts.length > 0 && (
              <>
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-sm text-gray-700 mb-2">Additional Costs</p>
                  <div className="space-y-2">
                    {extraCosts.map((cost, index) => (
                      <div key={index} className="flex items-start justify-between gap-3 pl-3">
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{cost.description}</p>
                          <p className="text-xs text-gray-500 capitalize">{cost.category}</p>
                        </div>
                        <p className="text-sm text-gray-900">${cost.amount.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <p className="text-sm text-gray-500">Extra Costs Subtotal</p>
                  <p className="text-gray-900">${totalExtraCosts.toFixed(2)}</p>
                </div>
              </>
            )}

            <div className="flex items-center justify-between pt-3 border-t-2 border-gray-200">
              <p className="text-gray-900">Total Amount</p>
              <p className="text-2xl text-[#007AFF]">${totalCost.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        {/* Questions Section */}
        <Card className="p-5 border-gray-100 bg-blue-50/50">
          <div className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-[#007AFF] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-gray-900 mb-1">Questions or Concerns?</h3>
              <p className="text-sm text-gray-600 mb-3">
                If you have any questions about the work or costs, contact your plumber before approving.
              </p>
              <Button variant="outline" className="rounded-xl text-sm">
                Contact Plumber
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 pb-8 space-y-3 lg:relative lg:border-t-0">
        <Button 
          onClick={() => setShowApprovalDialog(true)}
          className="w-full h-14 bg-[#00C853] hover:bg-green-700 rounded-2xl gap-2"
        >
          <CheckCircle2 className="w-5 h-5" />
          Approve & Release Payment
        </Button>
        <Button 
          onClick={() => setShowRejectDialog(true)}
          variant="outline" 
          className="w-full h-12 rounded-2xl border-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          Report Issue
        </Button>
      </div>

      {/* Approval Confirmation Dialog */}
      <AlertDialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Completed Work?</AlertDialogTitle>
            <AlertDialogDescription>
              By approving this job, you confirm that the work has been completed satisfactorily. 
              Payment of ${totalCost.toFixed(2)} will be released to the plumber.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleApprove}
              className="bg-[#00C853] hover:bg-green-700 rounded-xl"
            >
              Approve & Pay
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rejection Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Report an Issue</AlertDialogTitle>
            <AlertDialogDescription>
              Please describe the issue with the completed work. This will be sent to the plumber and our support team.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Describe the issue with the work..."
              className="min-h-[100px] rounded-xl"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleReject}
              disabled={!rejectionReason.trim()}
              className="bg-red-600 hover:bg-red-700 rounded-xl"
            >
              Submit Issue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
