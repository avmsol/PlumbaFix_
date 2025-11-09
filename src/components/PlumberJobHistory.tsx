import { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, MapPin, ChevronRight, Info, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import PlumberBottomNavigation from './PlumberBottomNavigation';
import type { Screen } from '../App';

interface PlumberJobHistoryProps {
  onNavigate: (screen: Screen) => void;
  onSelectJob?: (jobId: string, jobType: 'completed' | 'not-selected' | 'pending-approval') => void;
}

type HistoryTab = 'completed' | 'not-selected' | 'pending-approval';

// Declined Quotes - Quotes not selected by customer
const declinedQuotes = [
  {
    id: 'dq1',
    issueType: 'Shower Drain Clog',
    customerName: 'David Thompson',
    location: '678 Cedar Street, Springfield',
    distance: '2.5 mi',
    quotedAmount: 120,
    submittedAt: '1 day ago',
    declinedAt: '18 hours ago',
    selectedQuote: 95,
    reason: 'Customer chose a lower quote',
    status: 'declined' as const,
  },
  {
    id: 'dq2',
    issueType: 'Kitchen Pipe Leak',
    customerName: 'Amanda Roberts',
    location: '345 Willow Road, Springfield',
    distance: '4.2 mi',
    quotedAmount: 185,
    submittedAt: '2 days ago',
    declinedAt: '1 day ago',
    selectedQuote: 175,
    reason: 'Customer selected another plumber',
    status: 'declined' as const,
  },
];

// Pending Approval Jobs - Completed but waiting for customer approval
const pendingApprovalJobs = [
  {
    id: 'pa1',
    issueType: 'Toilet Not Flushing',
    customerName: 'Sarah Johnson',
    location: '123 Main St, Seattle, WA',
    submittedAt: 'Today, 1:30 PM',
    expectedPayout: 108,
    baseFee: 68,
    extraCosts: 40,
    status: 'pending-approval' as const,
    hoursAgo: 2,
  },
  {
    id: 'pa2',
    issueType: 'Leaky Pipe Under Sink',
    customerName: 'Robert Chen',
    location: '456 Elm Avenue, Seattle, WA',
    submittedAt: 'Yesterday, 4:45 PM',
    expectedPayout: 125,
    baseFee: 85,
    extraCosts: 40,
    status: 'pending-approval' as const,
    hoursAgo: 22,
  },
];

// Completed Jobs - Recently completed
const completedJobs = [
  {
    id: 'cj1',
    issueType: 'Drain Cleaning',
    customerName: 'Michael Wilson',
    location: '567 Oak Lane, Springfield',
    completedAt: 'Today, 11:30 AM',
    payout: 95,
    rating: 5,
    status: 'completed' as const,
  },
  {
    id: 'cj2',
    issueType: 'Faucet Replacement',
    customerName: 'Jennifer Garcia',
    location: '123 Birch Road, Springfield',
    completedAt: 'Yesterday, 3:15 PM',
    payout: 140,
    rating: 4.5,
    status: 'completed' as const,
  },
  {
    id: 'cj3',
    issueType: 'Water Heater Repair',
    customerName: 'Daniel Martinez',
    location: '891 Pine Street, Springfield',
    completedAt: '2 days ago',
    payout: 275,
    rating: 5,
    status: 'completed' as const,
  },
];

export default function PlumberJobHistory({ onNavigate, onSelectJob }: PlumberJobHistoryProps) {
  const [activeTab, setActiveTab] = useState<HistoryTab>('pending-approval');

  return (
    <div className="h-full overflow-y-auto bg-[#F4F8FB]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#007AFF] to-[#0051D5] rounded-b-[40px] p-6 pt-16 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => onNavigate('plumber-home')}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-white text-2xl">Job History</h1>
            <p className="text-white/80 text-sm">View your past work</p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center border-0 bg-white/95 backdrop-blur-sm shadow-lg">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <p className="text-3xl mb-1">{pendingApprovalJobs.length}</p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
          </Card>
          <Card className="p-4 text-center border-0 bg-white/95 backdrop-blur-sm shadow-lg">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-50 rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-3xl mb-1">{completedJobs.length}</p>
              <p className="text-xs text-gray-500">Completed</p>
            </div>
          </Card>
          <Card className="p-4 text-center border-0 bg-white/95 backdrop-blur-sm shadow-lg">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center mb-2">
                <XCircle className="w-5 h-5 text-gray-600" />
              </div>
              <p className="text-3xl mb-1">{declinedQuotes.length}</p>
              <p className="text-xs text-gray-500">Declined</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-6 pb-24">
        {/* Tab Navigation */}
        <div className="space-y-2 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('pending-approval')}
              className={`flex-1 px-4 py-3 rounded-2xl transition-all ${
                activeTab === 'pending-approval'
                  ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-300'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Pending</span>
                <Badge className={`${
                  activeTab === 'pending-approval' 
                    ? 'bg-white/20 text-white hover:bg-white/20' 
                    : 'bg-amber-100 text-amber-700 hover:bg-amber-100'
                }`}>
                  {pendingApprovalJobs.length}
                </Badge>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 px-4 py-3 rounded-2xl transition-all ${
                activeTab === 'completed'
                  ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Done</span>
                <Badge className={`${
                  activeTab === 'completed' 
                    ? 'bg-white/20 text-white hover:bg-white/20' 
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-100'
                }`}>
                  {completedJobs.length}
                </Badge>
              </div>
            </button>
          </div>
          
          <button
            onClick={() => setActiveTab('not-selected')}
            className={`w-full px-4 py-3 rounded-2xl transition-all ${
              activeTab === 'not-selected'
                ? 'bg-gradient-to-br from-gray-600 to-gray-700 text-white shadow-lg shadow-gray-500/30'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <XCircle className="w-4 h-4" />
              <span className="text-sm">Not Selected</span>
              <Badge className={`${
                activeTab === 'not-selected' 
                  ? 'bg-white/20 text-white hover:bg-white/20' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-100'
              }`}>
                {declinedQuotes.length}
              </Badge>
            </div>
          </button>
        </div>

        {/* Pending Approval Jobs Section */}
        {activeTab === 'pending-approval' && (
          <div className="space-y-4">
            {pendingApprovalJobs.length > 0 && (
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 mb-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-amber-900">
                      <strong>Awaiting Customer Approval</strong>
                    </p>
                    <p className="text-xs text-amber-700 mt-1">
                      Payment will be released within 24 hours of customer approval. You'll be notified immediately.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {pendingApprovalJobs.map((job) => (
                <Card key={job.id} className="overflow-hidden border-amber-200">
                  <div className="bg-gradient-to-br from-amber-50 to-transparent p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Clock className="w-6 h-6 text-amber-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg mb-1 truncate">{job.issueType}</h3>
                          <div className="flex items-center gap-2 text-sm">
                            <span>👤</span>
                            <span className="text-gray-600">{job.customerName}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                        Pending
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <p className="text-sm text-gray-900 flex-1 truncate">{job.location}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Base Fee</span>
                        <span className="text-gray-900">${job.baseFee}</span>
                      </div>
                      {job.extraCosts > 0 && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Extra Costs</span>
                          <span className="text-gray-900">${job.extraCosts}</span>
                        </div>
                      )}
                      <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
                        <span className="text-gray-900">Expected Payout</span>
                        <span className="text-lg text-amber-600">${job.expectedPayout}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Submitted {job.submittedAt}</span>
                      <span className="text-amber-600">{job.hoursAgo}h ago</span>
                    </div>

                    <button
                      onClick={() => {
                        onSelectJob?.(job.id, 'pending-approval');
                        onNavigate('plumber-job-details');
                      }}
                      className="w-full mt-2 py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <span className="text-sm">View Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Completed Jobs Section */}
        {activeTab === 'completed' && (
          <div className="space-y-4">

            <div className="space-y-3">
              {completedJobs.map((job) => (
                <Card key={job.id} className="overflow-hidden border-gray-100">
                  <div className="bg-gradient-to-br from-purple-50 to-transparent p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg mb-1 truncate">{job.issueType}</h3>
                          <div className="flex items-center gap-2 text-sm">
                            <span>👤</span>
                            <span className="text-gray-600">{job.customerName}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500 text-lg">★</span>
                        <span className="text-gray-700">{job.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <p className="text-sm text-gray-900 flex-1 truncate">{job.location}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Completed {job.completedAt}</span>
                      <span className="text-green-700">${job.payout}</span>
                    </div>

                    <button
                      onClick={() => {
                        onSelectJob?.(job.id, 'completed');
                        onNavigate('plumber-job-details');
                      }}
                      className="w-full mt-2 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <span className="text-sm">View Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Not Selected Quotes Section */}
        {activeTab === 'not-selected' && (
          <div className="space-y-4">

            {declinedQuotes.length > 0 && (
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mb-4">
                <p className="text-sm text-blue-900">
                  💡 <strong>Insight:</strong> Average price difference: ${Math.round(declinedQuotes.reduce((sum, q) => sum + (q.quotedAmount - q.selectedQuote), 0) / declinedQuotes.length)}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Competitive pricing and faster response times can improve your selection rate.
                </p>
              </div>
            )}

            <div className="space-y-3">
            {declinedQuotes.map((quote) => (
              <Card key={quote.id} className="overflow-hidden border-gray-100">
                <div className="bg-gradient-to-br from-gray-50 to-transparent p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <XCircle className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg mb-1 truncate">{quote.issueType}</h3>
                        <div className="flex items-center gap-2 text-sm">
                          <span>👤</span>
                          <span className="text-gray-600">{quote.customerName}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                      Not Selected
                    </Badge>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate">{quote.location}</p>
                      <p className="text-xs text-gray-500">{quote.distance} away</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-3 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-xs text-gray-600">Your Quote</p>
                        <p className="text-xl text-gray-700">${quote.quotedAmount}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">Selected Quote</p>
                        <p className="text-xl text-[#00C853]">${quote.selectedQuote}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-xs text-gray-600">
                        Price difference: <span className="text-gray-900">${quote.quotedAmount - quote.selectedQuote}</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-900">{quote.reason}</p>
                        <p className="text-xs text-blue-600 mt-1">Declined {quote.declinedAt}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectJob?.(quote.id, 'not-selected');
                      onNavigate('plumber-job-details');
                    }}
                    className="w-full mt-2 py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="text-sm">View Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <PlumberBottomNavigation 
        activeScreen="plumber-jobs" 
        onNavigate={onNavigate}
      />
    </div>
  );
}
