import { ArrowLeft, Navigation, MapPin, Phone, Camera, CheckCircle2, Plus, X, DollarSign, Wrench, Edit2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useState } from 'react';
import PlumberBottomNavigation from './PlumberBottomNavigation';
import type { Screen } from '../App';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface PlumberJobTrackerProps {
  onNavigate: (screen: Screen) => void;
}

const statusOptions = [
  { key: 'accepted', label: 'Accepted', color: 'bg-blue-100 text-blue-800' },
  { key: 'on-the-way', label: 'On the Way', color: 'bg-orange-100 text-orange-800' },
  { key: 'arrived', label: 'Arrived on Site', color: 'bg-purple-100 text-purple-800' },
  { key: 'working', label: 'Working', color: 'bg-yellow-100 text-yellow-800' },
  { key: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
];

interface ExtraCost {
  id: string;
  description: string;
  amount: number;
  category: 'parts' | 'labor' | 'other';
}

export default function PlumberJobTracker({ onNavigate }: PlumberJobTrackerProps) {
  const [currentStatus, setCurrentStatus] = useState('on-the-way');
  const [extraCosts, setExtraCosts] = useState<ExtraCost[]>([]);
  const [showAddCostDialog, setShowAddCostDialog] = useState(false);
  const [editingCostId, setEditingCostId] = useState<string | null>(null);
  const [newCostDescription, setNewCostDescription] = useState('');
  const [newCostAmount, setNewCostAmount] = useState('');
  const [newCostCategory, setNewCostCategory] = useState<'parts' | 'labor' | 'other'>('parts');

  const basePayout = 68;
  const totalExtraCosts = extraCosts.reduce((sum, cost) => sum + cost.amount, 0);
  const totalPayout = basePayout + totalExtraCosts;

  const currentStatusObj = statusOptions.find(s => s.key === currentStatus);

  const handleAddCost = () => {
    if (!newCostDescription.trim() || !newCostAmount || parseFloat(newCostAmount) <= 0) {
      return;
    }

    if (editingCostId) {
      // Update existing cost
      setExtraCosts(extraCosts.map(cost => 
        cost.id === editingCostId 
          ? {
              ...cost,
              description: newCostDescription.trim(),
              amount: parseFloat(newCostAmount),
              category: newCostCategory,
            }
          : cost
      ));
      setEditingCostId(null);
    } else {
      // Add new cost
      const newCost: ExtraCost = {
        id: Date.now().toString(),
        description: newCostDescription.trim(),
        amount: parseFloat(newCostAmount),
        category: newCostCategory,
      };
      setExtraCosts([...extraCosts, newCost]);
    }

    setNewCostDescription('');
    setNewCostAmount('');
    setNewCostCategory('parts');
    setShowAddCostDialog(false);
  };

  const handleRemoveCost = (id: string) => {
    setExtraCosts(extraCosts.filter(cost => cost.id !== id));
  };

  const handleEditCost = (cost: ExtraCost) => {
    setEditingCostId(cost.id);
    setNewCostDescription(cost.description);
    setNewCostAmount(cost.amount.toString());
    setNewCostCategory(cost.category);
    setShowAddCostDialog(true);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'parts':
        return <Wrench className="w-4 h-4" />;
      case 'labor':
        return <DollarSign className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 pt-16 border-b border-gray-100">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onNavigate('plumber-home')}
          className="mb-4"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl mb-2">Active Job</h1>
        <p className="text-gray-600">Update your job status</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-24 lg:pb-6 space-y-6">
        {/* Current Status */}
        <Card className="p-5 border-gray-100 bg-gradient-to-br from-[#007AFF]/5 to-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Current Status</p>
              <h2 className="text-2xl">{currentStatusObj?.label}</h2>
            </div>
            <Badge className={currentStatusObj?.color}>
              {currentStatusObj?.label}
            </Badge>
          </div>
        </Card>

        {/* Job Info */}
        <Card className="p-5 border-gray-100">
          <h3 className="mb-3">Job Details</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Issue</p>
              <p className="text-gray-900">Toilet Not Flushing</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Customer</p>
              <p className="text-gray-900">Sarah Miller</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-gray-900">742 Evergreen Terrace, Springfield</p>
            </div>
            <div className="pt-2 border-t border-gray-100 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Base Payout</p>
                <p className="text-gray-900">${basePayout}</p>
              </div>
              {extraCosts.length > 0 && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Extra Costs</p>
                  <p className="text-gray-900">+${totalExtraCosts.toFixed(2)}</p>
                </div>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <p className="text-sm text-gray-500">Total Payout</p>
                <p className="text-xl text-[#00C853]">${totalPayout.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Extra Costs Management */}
        {(currentStatus === 'arrived' || currentStatus === 'working' || currentStatus === 'completed') && (
          <Card className="p-5 border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3>Extra Costs</h3>
              <Button 
                onClick={() => {
                  setEditingCostId(null);
                  setNewCostDescription('');
                  setNewCostAmount('');
                  setNewCostCategory('parts');
                  setShowAddCostDialog(true);
                }}
                className="bg-[#007AFF] hover:bg-[#0051D5] rounded-xl gap-2"
                size="sm"
              >
                <Plus className="w-4 h-4" />
                Add Cost
              </Button>
            </div>
            
            {extraCosts.length === 0 ? (
              <div className="text-center py-6 text-gray-500 text-sm bg-gray-50 rounded-xl">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p>No extra costs added yet</p>
                <p className="text-xs mt-1">Add costs for additional parts or services</p>
              </div>
            ) : (
              <div className="space-y-2">
                {extraCosts.map((cost) => (
                  <div 
                    key={cost.id} 
                    className="flex items-start justify-between gap-3 p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-600 flex-shrink-0">
                        {getCategoryIcon(cost.category)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900">{cost.description}</p>
                        <p className="text-xs text-gray-500 capitalize">{cost.category}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <p className="text-gray-900 mr-2">${cost.amount.toFixed(2)}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditCost(cost)}
                          className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveCost(cost.id)}
                          className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        {/* Navigation */}
        {(currentStatus === 'accepted' || currentStatus === 'on-the-way') && (
          <Card className="p-5 border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1">Navigation</h3>
                <p className="text-sm text-gray-600">2.3 miles • 12 min away</p>
              </div>
            </div>
            <Button className="w-full bg-[#007AFF] hover:bg-[#0051D5] rounded-xl gap-2">
              <Navigation className="w-5 h-5" />
              Open in Maps
            </Button>
          </Card>
        )}

        {/* Contact Customer */}
        <Card className="p-5 border-gray-100">
          <h3 className="mb-3">Contact Customer</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="rounded-xl gap-2">
              <Phone className="w-5 h-5" />
              Call
            </Button>
            <Button variant="outline" className="rounded-xl gap-2">
              <span className="text-lg">💬</span>
              Message
            </Button>
          </div>
        </Card>

        {/* Update Status */}
        <Card className="p-5 border-gray-100">
          <h3 className="mb-4">Update Job Status</h3>
          <div className="space-y-2">
            {statusOptions.map((status) => (
              <button
                key={status.key}
                onClick={() => setCurrentStatus(status.key)}
                className={`
                  w-full p-4 rounded-xl border-2 text-left transition-all
                  ${
                    currentStatus === status.key
                      ? 'border-[#007AFF] bg-[#007AFF]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span className={currentStatus === status.key ? 'text-[#007AFF]' : 'text-gray-700'}>
                    {status.label}
                  </span>
                  {currentStatus === status.key && (
                    <CheckCircle2 className="w-5 h-5 text-[#007AFF]" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Add Photos */}
        {(currentStatus === 'working' || currentStatus === 'completed') && (
          <Card className="p-5 border-gray-100">
            <h3 className="mb-3">Job Documentation</h3>
            <p className="text-sm text-gray-600 mb-4">
              Upload photos of the work completed
            </p>
            <Button variant="outline" className="w-full rounded-xl gap-2 border-dashed border-2">
              <Camera className="w-5 h-5" />
              Add Photos
            </Button>
          </Card>
        )}

        {/* Job Notes */}
        <Card className="p-5 border-gray-100">
          <h3 className="mb-3">Job Notes</h3>
          <textarea 
            className="w-full min-h-[100px] p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
            placeholder="Add notes about the repair, parts used, recommendations, etc."
          />
        </Card>
      </div>

      {/* Complete Job Button */}
      {currentStatus === 'completed' && (
        <div className="p-6 pb-24 lg:pb-6 border-t border-gray-100">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Job will be sent for customer approval. Payment will be released once the customer approves the completed work.
            </p>
          </div>
          <Button 
            onClick={() => {
              // In a real app, this would update the job status to 'pending-approval'
              // and notify the customer
              onNavigate('plumber-job-submitted');
            }}
            className="w-full h-14 bg-[#00C853] hover:bg-green-700 rounded-2xl gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            Complete & Submit for Approval
          </Button>
        </div>
      )}

      {/* Add/Edit Cost Dialog */}
      <Dialog open={showAddCostDialog} onOpenChange={(open) => {
        setShowAddCostDialog(open);
        if (!open) {
          setEditingCostId(null);
          setNewCostDescription('');
          setNewCostAmount('');
          setNewCostCategory('parts');
        }
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingCostId ? 'Edit Extra Cost' : 'Add Extra Cost'}</DialogTitle>
            <DialogDescription>
              {editingCostId 
                ? 'Update the cost details for this item.' 
                : 'Add additional costs for parts or services needed for this job.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant={newCostCategory === 'parts' ? 'default' : 'outline'}
                  className={`rounded-xl ${newCostCategory === 'parts' ? 'bg-[#007AFF] hover:bg-[#0051D5]' : ''}`}
                  onClick={() => setNewCostCategory('parts')}
                >
                  <Wrench className="w-4 h-4 mr-2" />
                  Parts
                </Button>
                <Button
                  type="button"
                  variant={newCostCategory === 'labor' ? 'default' : 'outline'}
                  className={`rounded-xl ${newCostCategory === 'labor' ? 'bg-[#007AFF] hover:bg-[#0051D5]' : ''}`}
                  onClick={() => setNewCostCategory('labor')}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Labor
                </Button>
                <Button
                  type="button"
                  variant={newCostCategory === 'other' ? 'default' : 'outline'}
                  className={`rounded-xl ${newCostCategory === 'other' ? 'bg-[#007AFF] hover:bg-[#0051D5]' : ''}`}
                  onClick={() => setNewCostCategory('other')}
                >
                  Other
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="e.g., Replacement flapper valve"
                value={newCostDescription}
                onChange={(e) => setNewCostDescription(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={newCostAmount}
                onChange={(e) => setNewCostAmount(e.target.value)}
                className="rounded-xl"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowAddCostDialog(false)}
              className="flex-1 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddCost}
              className="flex-1 bg-[#007AFF] hover:bg-[#0051D5] rounded-xl"
              disabled={!newCostDescription.trim() || !newCostAmount || parseFloat(newCostAmount) <= 0}
            >
              {editingCostId ? 'Update Cost' : 'Add Cost'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom Navigation */}
      <PlumberBottomNavigation 
        activeScreen="plumber-jobs" 
        onNavigate={onNavigate}
      />
    </div>
  );
}
