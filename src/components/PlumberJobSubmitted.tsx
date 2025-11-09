import { CheckCircle2, Clock, Home } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import type { Screen } from '../App';

interface PlumberJobSubmittedProps {
  onNavigate: (screen: Screen) => void;
}

export default function PlumberJobSubmitted({ onNavigate }: PlumberJobSubmittedProps) {
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-[#F4F8FB] to-white">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-[#00C853] to-green-600 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-14 h-14 text-white" />
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl text-gray-900">Job Submitted Successfully!</h1>
            <p className="text-gray-600">
              Your completed work has been sent to the customer for approval.
            </p>
          </div>

          {/* Info Card */}
          <Card className="p-5 border-blue-200 bg-blue-50">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-blue-900 mb-1">What's Next?</h3>
                <p className="text-sm text-blue-700">
                  The customer will review your work and approve it. Once approved, your payment will be processed and released within 24 hours.
                </p>
              </div>
            </div>
          </Card>

          {/* Payment Info */}
          <Card className="p-5 border-gray-100">
            <h3 className="text-gray-900 mb-3">Expected Payout</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Base Service Fee</span>
                <span>$68.00</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Additional Costs</span>
                <span>$40.00</span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
                <span className="text-gray-900">Total Payout</span>
                <span className="text-2xl text-[#00C853]">$108.00</span>
              </div>
            </div>
          </Card>

          {/* Action Button */}
          <Button 
            onClick={() => onNavigate('plumber-home')}
            className="w-full h-14 bg-[#007AFF] hover:bg-[#0051D5] rounded-2xl gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
