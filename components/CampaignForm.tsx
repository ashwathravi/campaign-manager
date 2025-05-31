
import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { PlusIcon } from './icons/PlusIcon';
import { MegaphoneIcon } from './icons/MegaphoneIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { Card } from './ui/Card';

interface CampaignFormProps {
  onAddCampaign: (name: string, location: string) => Promise<void>; // Updated to Promise
}

const CampaignForm = ({ onAddCampaign }: CampaignFormProps): React.ReactNode => {
  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !location.trim()) {
      setError('Both campaign name and location are required.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    try {
      await onAddCampaign(name, location);
      setName('');
      setLocation('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred while adding the campaign.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="campaign-form-card">
      <h2 className="campaign-form-title">
        <PlusIcon className="campaign-form-title-icon" />
        Create New Campaign
      </h2>
      <form onSubmit={handleSubmit} className="campaign-form">
        <Input
          id="campaignName"
          label="Campaign Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Spring Collection Launch"
          icon={<MegaphoneIcon className="campaign-form-input-icon" />}
          required
          disabled={isSubmitting}
        />
        <Input
          id="campaignLocation"
          label="Target Location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g., Online, Global"
          icon={<MapPinIcon className="campaign-form-input-icon" />}
          required
          disabled={isSubmitting}
        />
        {error && <p className="campaign-form-error-message" role="alert">{error}</p>}
        <Button
          type="submit"
          className="campaign-form-submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="campaign-form-spinner-icon animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <PlusIcon className="campaign-form-button-icon" />
              Add Campaign
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default CampaignForm;
