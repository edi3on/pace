import React, { useState, useEffect } from 'react';
import { X, Save, User } from 'lucide-react';
import localDataService from '../services/localDataService.js';

const ProfileEditor = ({ isOpen, onClose, onSave }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const athleteData = localDataService.getAthleteProfile();
      if (athleteData) {
        setProfile(athleteData);
      }
      setLoading(false);
    }
  }, [isOpen]);

  const handleSave = async () => {
    if (!profile) return;
    
    setSaving(true);
    try {
      const success = localDataService.setAthleteProfile(profile);
      if (success) {
        onSave && onSave(profile);
        onClose();
      } else {
        alert('Error saving profile. Please try again.');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const updateProfile = (path, value) => {
    setProfile(prev => {
      const newProfile = { ...prev };
      const keys = path.split('.');
      let current = newProfile;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newProfile;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading profile...</p>
            </div>
          ) : profile ? (
            <>
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={profile.profile.name}
                      onChange={(e) => updateProfile('profile.name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      value={profile.profile.age}
                      onChange={(e) => updateProfile('profile.age', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (lbs)</label>
                    <input
                      type="number"
                      value={profile.profile.weight.lbs}
                      onChange={(e) => {
                        const lbs = parseInt(e.target.value);
                        const kg = Math.round((lbs / 2.205) * 10) / 10;
                        updateProfile('profile.weight.lbs', lbs);
                        updateProfile('profile.weight.kg', kg);
                        updateProfile('profile.weight.display', `${lbs} lbs`);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                    <input
                      type="number"
                      value={profile.profile.height.cm}
                      onChange={(e) => {
                        const cm = parseInt(e.target.value);
                        const totalInches = cm / 2.54;
                        const feet = Math.floor(totalInches / 12);
                        const inches = Math.round(totalInches % 12);
                        updateProfile('profile.height.cm', cm);
                        updateProfile('profile.height.feet', feet);
                        updateProfile('profile.height.inches', inches);
                        updateProfile('profile.height.display', `${feet}'${inches}"`);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Athletics Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Athletics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Event</label>
                    <select
                      value={profile.athletics.primaryEvent}
                      onChange={(e) => updateProfile('athletics.primaryEvent', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="100m">100m</option>
                      <option value="200m">200m</option>
                      <option value="400m">400m</option>
                      <option value="800m">800m</option>
                      <option value="1500m">1500m</option>
                      <option value="110mH">110m Hurdles</option>
                      <option value="400mH">400m Hurdles</option>
                      <option value="Long Jump">Long Jump</option>
                      <option value="High Jump">High Jump</option>
                      <option value="Shot Put">Shot Put</option>
                      <option value="Discus">Discus</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Competition Level</label>
                    <select
                      value={profile.athletics.experience.level}
                      onChange={(e) => updateProfile('athletics.experience.level', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="high school">High School</option>
                      <option value="collegiate">Collegiate</option>
                      <option value="professional">Professional</option>
                      <option value="masters">Masters</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Goals */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Goals</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Primary Goal</label>
                  <input
                    type="text"
                    value={profile.athletics.goals.shortTerm.primary}
                    onChange={(e) => updateProfile('athletics.goals.shortTerm.primary', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Break 10.40 in 100m"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-red-600">Error loading profile data</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;
