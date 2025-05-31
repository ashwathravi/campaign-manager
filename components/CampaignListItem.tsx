
import React from 'react';
import { Campaign } from '../types';
import { Card } from './ui/Card';
import { MegaphoneIcon } from './icons/MegaphoneIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { IdentificationIcon } from './icons/IdentificationIcon';


interface CampaignListItemProps {
  campaign: Campaign;
}

const CampaignListItem = ({ campaign }: CampaignListItemProps): React.ReactNode => {
  return (
    <Card className="campaign-list-item-card">
      <div className="campaign-list-item-header">
        <div className="campaign-list-item-name-container">
          <h3 className="campaign-list-item-name">
            <MegaphoneIcon className="campaign-list-item-name-icon" />
            {campaign.name}
          </h3>
        </div>
        <div className="campaign-list-item-id-badge">
          ID: {campaign.id}
        </div>
      </div>
      <div className="campaign-list-item-details">
        <p className="campaign-list-item-location">
          <MapPinIcon className="campaign-list-item-location-icon" />
          Location: {campaign.location}
        </p>
      </div>
    </Card>
  );
};

export default CampaignListItem;
