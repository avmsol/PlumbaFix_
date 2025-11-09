import { ArrowLeft, CheckCircle, XCircle, MapPin, Clock, DollarSign, Star, Calendar, User, Phone, Mail, MessageSquare, Camera, FileText, AlertCircle, Info, Edit2 } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
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
import { useState } from 'react';
import type { Screen } from '../App';

interface PlumberJobDetailsProps {
  onNavigate: (screen: Screen) => void;
  jobId?: string;
  jobType?: 'completed' | 'not-selected' | 'pending-approval';
}

// Mock data - would come from props/API in real app
const completedJobsData: Record<string, any> = {
  'cj1': {
    id: 'cj1',
    issueType: 'Drain Cleaning',
    customerName: 'Michael Wilson',
    customerPhone: '(555) 123-4567',
    customerEmail: 'michael.wilson@email.com',
    location: '567 Oak Lane, Springfield',
    coordinates: 'Floor 2, Apartment 4B',
    distance: '1.8 mi',
    requestedAt: 'Today, 8:00 AM',
    acceptedAt: 'Today, 8:15 AM',
    arrivedAt: 'Today, 9:30 AM',
    completedAt: 'Today, 11:30 AM',
    duration: '2 hours',
    quotedAmount: 95,
    finalAmount: 95,
    payout: 95,
    paymentMethod: 'Credit Card',
    rating: 5,
    review: 'Excellent work! Very professional and cleaned up everything afterwards. The drain is working perfectly now. Highly recommend!',
    description: 'Kitchen sink drain was completely clogged. Water backing up into the sink.',
    workPerformed: 'Used drain snake to clear blockage. Removed hair and debris buildup. Tested water flow. Applied enzyme treatment to prevent future clogs.',
    partsUsed: 'Enzyme drain treatment',
    photos: ['before', 'during', 'after'],
  },
  'cj2': {
    id: 'cj2',
    issueType: 'Faucet Replacement',
    customerName: 'Sarah Martinez',
    customerPhone: '(555) 234-5678',
    customerEmail: 'sarah.martinez@email.com',
    location: '890 Pine Avenue, Springfield',
    coordinates: 'Kitchen, Main Floor',
    distance: '3.2 mi',
    requestedAt: 'Yesterday, 2:00 PM',
    acceptedAt: 'Yesterday, 2:20 PM',
    arrivedAt: 'Yesterday, 4:00 PM',
    completedAt: 'Yesterday, 6:30 PM',
    duration: '2.5 hours',
    quotedAmount: 180,
    finalAmount: 180,
    payout: 180,
    paymentMethod: 'Credit Card',
    rating: 5,
    review: 'Great job! New faucet looks amazing and works perfectly. Very clean installation.',
    description: 'Old kitchen faucet was leaking and needed replacement.',
    workPerformed: 'Removed old faucet. Installed new Delta faucet with pull-down sprayer. Connected water lines and tested for leaks.',
    partsUsed: 'Delta Faucet, Supply Lines, Plumber\'s Tape',
    photos: ['before', 'during', 'after'],
  },
  'cj3': {
    id: 'cj3',
    issueType: 'Toilet Repair',
    customerName: 'John Davis',
    customerPhone: '(555) 345-6789',
    customerEmail: 'john.davis@email.com',
    location: '234 Maple Drive, Springfield',
    coordinates: 'Bathroom #2, Second Floor',
    distance: '1.5 mi',
    requestedAt: '2 days ago, 10:00 AM',
    acceptedAt: '2 days ago, 10:15 AM',
    arrivedAt: '2 days ago, 11:30 AM',
    completedAt: '2 days ago, 12:45 PM',
    duration: '1.25 hours',
    quotedAmount: 120,
    finalAmount: 120,
    payout: 120,
    paymentMethod: 'Cash',
    rating: 4,
    review: 'Fixed the running toilet issue. Good service, on time.',
    description: 'Toilet was running constantly, wasting water.',
    workPerformed: 'Replaced flapper valve and fill valve. Adjusted water level. Tested flush mechanism.',
    partsUsed: 'Flapper Valve, Fill Valve',
    photos: ['before', 'after'],
  },
};

const pendingApprovalJobsData: Record<string, any> = {
  'pa1': {
    id: 'pa1',
    issueType: 'Toilet Not Flushing',
    customerName: 'Sarah Johnson',
    customerPhone: '(555) 555-1234', // Hidden until approved
    customerEmail: 'sarah.johnson@email.com', // Hidden until approved
    location: '123 Main St, Seattle, WA',
    coordinates: 'Bathroom, First Floor',
    distance: '1.2 mi',
    requestedAt: 'Today, 8:00 AM',
    acceptedAt: 'Today, 8:30 AM',
    arrivedAt: 'Today, 10:00 AM',
    completedAt: 'Today, 1:30 PM',
    submittedAt: 'Today, 1:30 PM',
    duration: '1.5 hours',
    quotedAmount: 68,
    extraCosts: 40,
    extraCostsDescription: 'Flapper Valve Replacement',
    finalAmount: 108,
    expectedPayout: 108,
    status: 'pending-approval',
    description: 'Toilet not flushing properly. Weak flush and water running continuously.',
    workPerformed: 'Replaced flapper valve and adjusted chain tension. Cleaned tank components and tested flush mechanism multiple times. Verified proper water level and seal.',
    partsUsed: 'Flapper Valve ($40)',
    photos: ['before', 'during', 'after'],
    notes: 'Customer mentioned issue started 2 days ago. Recommended annual maintenance check.',
  },
  'pa2': {
    id: 'pa2',
    issueType: 'Leaky Pipe Under Sink',
    customerName: 'Robert Chen',
    customerPhone: '(555) 555-5678', // Hidden until approved
    customerEmail: 'robert.chen@email.com', // Hidden until approved
    location: '456 Elm Avenue, Seattle, WA',
    coordinates: 'Kitchen Sink, Main Floor',
    distance: '2.8 mi',
    requestedAt: 'Yesterday, 2:00 PM',
    acceptedAt: 'Yesterday, 2:45 PM',
    arrivedAt: 'Yesterday, 4:00 PM',
    completedAt: 'Yesterday, 4:45 PM',
    submittedAt: 'Yesterday, 4:45 PM',
    duration: '45 minutes',
    quotedAmount: 85,
    extraCosts: 40,
    extraCostsDescription: 'P-Trap Replacement',
    finalAmount: 125,
    expectedPayout: 125,
    status: 'pending-approval',
    description: 'Slow drip from pipe under kitchen sink. Small puddle forming.',
    workPerformed: 'Replaced corroded P-trap and tightened all connections. Applied plumber\'s tape to ensure proper seal. Tested for leaks by running water for 10 minutes.',
    partsUsed: 'P-Trap ($40)',
    photos: ['before', 'after'],
    notes: 'Old P-trap was severely corroded. Recommended checking other exposed pipes.',
  },
};

const notSelectedJobsData: Record<string, any> = {
  'dq1': {
    id: 'dq1',
    issueType: 'Shower Drain Clog',
    customerName: 'David Thompson',
    customerPhone: '(555) 987-6543',
    customerEmail: 'david.thompson@email.com',
    location: '678 Cedar Street, Springfield',
    coordinates: 'House, Master Bathroom',
    distance: '2.5 mi',
    requestedAt: '2 days ago, 3:00 PM',
    quotedAt: '2 days ago, 3:45 PM',
    declinedAt: '1 day ago, 10:30 AM',
    responseTime: '45 minutes',
    yourQuote: 120,
    selectedQuote: 95,
    quoteDifference: 25,
    numberOfQuotes: 5,
    yourRanking: 3,
    reason: 'Customer chose a lower quote',
    feedback: 'Price was competitive, but customer went with the lowest bid.',
    description: 'Shower drain is draining very slowly. Standing water during showers.',
    urgency: 'Within 48 hours',
  },
  'dq2': {
    id: 'dq2',
    issueType: 'Water Heater Installation',
    customerName: 'Emily Chen',
    customerPhone: '(555) 876-5432',
    customerEmail: 'emily.chen@email.com',
    location: '456 Birch Lane, Springfield',
    coordinates: 'Basement',
    distance: '4.1 mi',
    requestedAt: '3 days ago, 9:00 AM',
    quotedAt: '3 days ago, 10:30 AM',
    declinedAt: '2 days ago, 5:00 PM',
    responseTime: '1.5 hours',
    yourQuote: 850,
    selectedQuote: 750,
    quoteDifference: 100,
    numberOfQuotes: 4,
    yourRanking: 2,
    reason: 'Customer selected a plumber with more availability',
    feedback: 'Your quote was close, but the selected plumber could start immediately.',
    description: 'Need to replace old 40-gallon water heater. Currently not heating properly.',
    urgency: 'ASAP',
  },
  'dq3': {
    id: 'dq3',
    issueType: 'Garbage Disposal Fix',
    customerName: 'Robert Williams',
    customerPhone: '(555) 765-4321',
    customerEmail: 'robert.williams@email.com',
    location: '789 Elm Street, Springfield',
    coordinates: 'Kitchen',
    distance: '2.8 mi',
    requestedAt: '4 days ago, 4:00 PM',
    quotedAt: '4 days ago, 4:20 PM',
    declinedAt: '4 days ago, 6:00 PM',
    responseTime: '20 minutes',
    yourQuote: 95,
    selectedQuote: 85,
    quoteDifference: 10,
    numberOfQuotes: 6,
    yourRanking: 4,
    reason: 'Customer chose a lower quote',
    feedback: 'Quick response time appreciated, but went with lower price.',
    description: 'Garbage disposal is making loud grinding noise and not draining.',
    urgency: 'Within 24 hours',
  },
};

export default function PlumberJobDetails({ onNavigate, jobId, jobType = 'completed' }: PlumberJobDetailsProps) {
  const [showReviseDialog, setShowReviseDialog] = useState(false);

  const job = jobType === 'completed' 
    ? (jobId ? completedJobsData[jobId] : Object.values(completedJobsData)[0])
    : jobType === 'pending-approval'
    ? (jobId ? pendingApprovalJobsData[jobId] : Object.values(pendingApprovalJobsData)[0])
    : (jobId ? notSelectedJobsData[jobId] : Object.values(notSelectedJobsData)[0]);
  const isCompleted = jobType === 'completed';
  const isPendingApproval = jobType === 'pending-approval';

  // If no job data found, show error state
  if (!job) {
    return (
      <div className="h-full flex items-center justify-center bg-[#F4F8FB]">
        <div className="text-center p-6">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl mb-2">Job Not Found</h3>
          <p className="text-gray-600 mb-4">Unable to load job details.</p>
          <Button onClick={() => onNavigate('plumber-job-history')}>
            Back to History
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-[#F4F8FB]">
      {/* Header */}
      <div className={`${
        isPendingApproval 
          ? 'bg-gradient-to-b from-amber-500 to-amber-600' 
          : isCompleted 
          ? 'bg-gradient-to-b from-purple-500 to-purple-600' 
          : 'bg-gradient-to-b from-gray-600 to-gray-700'
      } rounded-b-[40px] p-6 pt-16 pb-8`}>
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => onNavigate('plumber-job-history')}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl text-white mb-1">Job Details</h1>
            <p className="text-sm text-white/80">{job.issueType}</p>
          </div>
          {isPendingApproval ? (
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          ) : isCompleted ? (
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          ) : (
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <XCircle className="w-6 h-6 text-white" />
            </div>
          )}
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <Badge className="bg-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
            {isPendingApproval ? 'Pending Approval' : isCompleted ? 'Completed' : 'Not Selected'}
          </Badge>
          {isCompleted && (
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span className="text-white">{job.rating}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-6 pb-24 space-y-4">
        {/* Pending Approval Notice */}
        {isPendingApproval && (
          <Card className="overflow-hidden border-amber-200 bg-gradient-to-br from-amber-50 to-white">
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-amber-900 mb-1">Awaiting Customer Approval</h3>
                  <p className="text-sm text-amber-700 mb-2">
                    Your job completion has been submitted. The customer will review your work and either approve or request changes.
                  </p>
                  <p className="text-xs text-amber-600">
                    💡 Need to make changes? Use the "Revise Job" button below to update your submission.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Customer Information */}
        <Card className="overflow-hidden border-gray-100">
          <div className="bg-gradient-to-br from-blue-50 to-transparent p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="mb-1">Customer Information</h3>
                <p className="text-sm text-gray-600">{job.customerName}</p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {isCompleted && (
              <>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-900">{job.customerPhone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-900">{job.customerEmail}</span>
                </div>
              </>
            )}
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-900">{job.location}</p>
                <p className="text-xs text-gray-500 mt-1">{job.coordinates}</p>
                <p className="text-xs text-blue-600 mt-1">{job.distance} from your location</p>
              </div>
            </div>
            {isPendingApproval && (
              <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs text-amber-800">
                  <Info className="w-3 h-3 inline mr-1" />
                  Contact details will be available once customer approves the work
                </p>
              </div>
            )}
            {!isCompleted && !isPendingApproval && (
              <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs text-amber-800">
                  <Info className="w-3 h-3 inline mr-1" />
                  Contact details are only available for accepted jobs
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Timeline */}
        <Card className="overflow-hidden border-gray-100">
          <div className="bg-gradient-to-br from-indigo-50 to-transparent p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-indigo-600" />
              </div>
              <h3>Timeline</h3>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Request Submitted</p>
                  <p className="text-xs text-gray-500">{job.requestedAt}</p>
                </div>
              </div>
              
              {isPendingApproval ? (
                <>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">Quote Accepted</p>
                      <p className="text-xs text-gray-500">{job.acceptedAt}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">Arrived at Location</p>
                      <p className="text-xs text-gray-500">{job.arrivedAt}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">Job Completed</p>
                      <p className="text-xs text-gray-500">{job.completedAt}</p>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 mt-1">
                        Total Duration: {job.duration}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-sm">Submitted for Approval</p>
                      <p className="text-xs text-gray-500">{job.submittedAt}</p>
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 mt-1">
                        Awaiting Customer Review
                      </Badge>
                    </div>
                  </div>
                </>
              ) : isCompleted ? (
                <>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">Quote Accepted</p>
                      <p className="text-xs text-gray-500">{job.acceptedAt}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">Arrived at Location</p>
                      <p className="text-xs text-gray-500">{job.arrivedAt}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">Job Completed</p>
                      <p className="text-xs text-gray-500">{job.completedAt}</p>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 mt-1">
                        Total Duration: {job.duration}
                      </Badge>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">Quote Submitted</p>
                      <p className="text-xs text-gray-500">{job.quotedAt}</p>
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 mt-1">
                        Response Time: {job.responseTime}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">Quote Not Selected</p>
                      <p className="text-xs text-gray-500">{job.declinedAt}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* Financial Details */}
        <Card className="overflow-hidden border-gray-100">
          <div className="bg-gradient-to-br from-green-50 to-transparent p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3>{isPendingApproval ? 'Expected Payout' : isCompleted ? 'Payment Details' : 'Quote Details'}</h3>
            </div>
          </div>
          <div className="p-4">
            {isPendingApproval ? (
              <div className="space-y-3">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-amber-800">
                      Payment will be released within 24 hours after customer approval
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Base Service Fee</span>
                  <span className="text-sm">${job.quotedAmount}</span>
                </div>
                {job.extraCosts > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Extra Costs ({job.extraCostsDescription})</span>
                    <span className="text-sm">${job.extraCosts}</span>
                  </div>
                )}
                <div className="h-px bg-gray-200"></div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">Expected Payout</span>
                  <span className="text-xl text-amber-600">${job.expectedPayout}</span>
                </div>
              </div>
            ) : isCompleted ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Quoted Amount</span>
                  <span className="text-sm">${job.quotedAmount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Final Amount</span>
                  <span className="text-sm">${job.finalAmount}</span>
                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-900">Your Payout</span>
                  <span className="text-xl text-green-600">${job.payout}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="text-gray-900">{job.paymentMethod}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-100">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-xs text-gray-600">Your Quote</p>
                      <p className="text-2xl text-gray-900">${job.yourQuote}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">Selected Quote</p>
                      <p className="text-2xl text-green-600">${job.selectedQuote}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-red-700">
                    <AlertCircle className="w-4 h-4" />
                    <span>Price difference: ${job.quoteDifference} higher</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-2xl mb-1">{job.numberOfQuotes}</p>
                    <p className="text-xs text-gray-600">Total Quotes</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-2xl mb-1">#{job.yourRanking}</p>
                    <p className="text-xs text-gray-600">Your Ranking</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Job Description */}
        <Card className="overflow-hidden border-gray-100">
          <div className="bg-gradient-to-br from-orange-50 to-transparent p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <h3>Job Description</h3>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Problem Description</p>
              <p className="text-sm text-gray-900">{job.description}</p>
            </div>
            
            {(isCompleted || isPendingApproval) && (
              <>
                <div className="h-px bg-gray-200"></div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Work Performed</p>
                  <p className="text-sm text-gray-900">{job.workPerformed}</p>
                </div>
                
                {job.partsUsed && (
                  <>
                    <div className="h-px bg-gray-200"></div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Parts Used</p>
                      <p className="text-sm text-gray-900">{job.partsUsed}</p>
                    </div>
                  </>
                )}
                
                {job.notes && isPendingApproval && (
                  <>
                    <div className="h-px bg-gray-200"></div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Additional Notes</p>
                      <p className="text-sm text-gray-900">{job.notes}</p>
                    </div>
                  </>
                )}
              </>
            )}
            
            {!isCompleted && !isPendingApproval && job.urgency && (
              <>
                <div className="h-px bg-gray-200"></div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Requested Timeline</p>
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                    {job.urgency}
                  </Badge>
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Photos (for completed and pending approval jobs) */}
        {(isCompleted || isPendingApproval) && job.photos && job.photos.length > 0 && (
          <Card className="overflow-hidden border-gray-100">
            <div className="bg-gradient-to-br from-pink-50 to-transparent p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <Camera className="w-6 h-6 text-pink-600" />
                </div>
                <h3>Job Photos</h3>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-2">
                {job.photos.map((photo, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">
                {isPendingApproval ? 'Photos submitted with completion request' : 'Before, During, and After photos'}
              </p>
            </div>
          </Card>
        )}

        {/* Customer Review (for completed jobs) */}
        {isCompleted && job.review && (
          <Card className="overflow-hidden border-gray-100">
            <div className="bg-gradient-to-br from-yellow-50 to-transparent p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3>Customer Review</h3>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= job.rating
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-700 italic">"{job.review}"</p>
            </div>
          </Card>
        )}

        {/* Decline Reason (for not selected quotes only) */}
        {!isCompleted && !isPendingApproval && (
          <Card className="overflow-hidden border-gray-100">
            <div className="bg-gradient-to-br from-red-50 to-transparent p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3>Why Not Selected</h3>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Reason</p>
                <p className="text-sm text-gray-900">{job.reason}</p>
              </div>
              <div className="h-px bg-gray-200"></div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Feedback</p>
                <p className="text-sm text-gray-700">{job.feedback}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          {isPendingApproval ? (
            <>
              <Button 
                variant="outline" 
                className="h-12"
                onClick={() => onNavigate('plumber-job-history')}
              >
                Back to History
              </Button>
              <Button 
                className="h-12 bg-blue-600 hover:bg-blue-700 gap-2"
                onClick={() => setShowReviseDialog(true)}
              >
                <Edit2 className="w-5 h-5" />
                Revise Job
              </Button>
            </>
          ) : isCompleted ? (
            <>
              <Button 
                variant="outline" 
                className="h-12"
                onClick={() => onNavigate('plumber-job-history')}
              >
                Back to History
              </Button>
              <Button 
                className="h-12 bg-purple-600 hover:bg-purple-700"
                onClick={() => {/* Handle download receipt */}}
              >
                Download Receipt
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="h-12"
                onClick={() => onNavigate('plumber-job-history')}
              >
                Back to History
              </Button>
              <Button 
                className="h-12 bg-blue-600 hover:bg-blue-700"
                onClick={() => {/* Handle view insights */}}
              >
                View Insights
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Revise Job Confirmation Dialog */}
      <AlertDialog open={showReviseDialog} onOpenChange={setShowReviseDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revise Job Submission?</AlertDialogTitle>
            <AlertDialogDescription>
              This will withdraw your current submission and allow you to make changes. The customer will not see this job completion until you resubmit.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowReviseDialog(false);
                // Navigate back to the job tracker to make revisions
                onNavigate('plumber-job-tracker');
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Revise Job
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
