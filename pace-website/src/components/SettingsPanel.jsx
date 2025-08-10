import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Save, User } from 'lucide-react';

const SettingsPanel = ({ isOpen, onClose, onSave }) => {
  const [settings, setSettings] = useState({
    height: '70',
    weight: '160',
    event: 'Sprints',
    time_in_the_season: 'In-Season',
    training_schedule: '5',
    current_pr: '11.25',
    goal_pr: '10.95',
    name: 'Alex Johnson'
  });

  const [isSaving, setIsSaving] = useState(false);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('paceAthleteSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Save to localStorage
    localStorage.setItem('paceAthleteSettings', JSON.stringify(settings));
    
    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsSaving(false);
    onSave(settings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Athlete Profile Settings</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={settings.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <Label htmlFor="height">Height (inches)</Label>
                <Input
                  id="height"
                  type="number"
                  value={settings.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  placeholder="70"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="weight">Weight (lbs)</Label>
              <Input
                id="weight"
                type="number"
                value={settings.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                placeholder="160"
                className="w-full"
              />
            </div>
          </div>

          {/* Training Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Training Information</h3>
            
            <div>
              <Label htmlFor="event">Primary Event</Label>
              <Select value={settings.event} onValueChange={(value) => handleInputChange('event', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your primary event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sprints">Sprints (100m, 200m, 400m)</SelectItem>
                  <SelectItem value="Mid-Distance">Mid-Distance (800m, 1500m)</SelectItem>
                  <SelectItem value="Long-Distance">Long-Distance (5K, 10K, Marathon)</SelectItem>
                  <SelectItem value="Jumps">Jumps (Long Jump, High Jump, Pole Vault)</SelectItem>
                  <SelectItem value="Throws">Throws (Shot Put, Discus, Javelin)</SelectItem>
                  <SelectItem value="Multi-Events">Multi-Events (Decathlon, Heptathlon)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="season">Current Season Phase</Label>
              <Select value={settings.time_in_the_season} onValueChange={(value) => handleInputChange('time_in_the_season', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select current phase" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Off-Season">Off-Season</SelectItem>
                  <SelectItem value="Pre-Season">Pre-Season</SelectItem>
                  <SelectItem value="In-Season">In-Season</SelectItem>
                  <SelectItem value="Championship">Championship Phase</SelectItem>
                  <SelectItem value="Transition">Transition Period</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="training_schedule">Weekly Training Frequency</Label>
              <Select value={settings.training_schedule} onValueChange={(value) => handleInputChange('training_schedule', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select training days per week" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 days per week</SelectItem>
                  <SelectItem value="4">4 days per week</SelectItem>
                  <SelectItem value="5">5 days per week</SelectItem>
                  <SelectItem value="6">6 days per week</SelectItem>
                  <SelectItem value="7">7 days per week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Performance Goals */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Performance Goals</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="current_pr">Current Personal Record</Label>
                <Input
                  id="current_pr"
                  value={settings.current_pr}
                  onChange={(e) => handleInputChange('current_pr', e.target.value)}
                  placeholder="11.25"
                />
                <p className="text-xs text-gray-500 mt-1">Format: seconds (e.g., 11.25)</p>
              </div>
              
              <div>
                <Label htmlFor="goal_pr">Goal Personal Record</Label>
                <Input
                  id="goal_pr"
                  value={settings.goal_pr}
                  onChange={(e) => handleInputChange('goal_pr', e.target.value)}
                  placeholder="10.95"
                />
                <p className="text-xs text-gray-500 mt-1">Format: seconds (e.g., 10.95)</p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={isSaving}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPanel;

