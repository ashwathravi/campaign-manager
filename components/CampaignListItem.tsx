
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
    <Card className="p-4 bg-slate-700 hover:bg-slate-600 transition-colors duration-150 ease-in-out shadow-lg rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
        <div className="mb-2 sm:mb-0">
          <h3 className="text-lg font-semibold text-sky-300 flex items-center">
            <MegaphoneIcon className="h-5 w-5 mr-2 text-sky-400 flex-shrink-0" />
            {campaign.name}
          </h3>
        </div>
        <div className="text-sm text-slate-400 bg-slate-800 px-2 py-1 rounded-full self-start sm:self-center">
          ID: {campaign.id}
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-slate-600">
        <p className="text-sm text-slate-300 flex items-center">
          <MapPinIcon className="h-4 w-4 mr-2 text-teal-400 flex-shrink-0" />
          Location: {campaign.location}
        </p>
      </div>
    </Card>
  );
};

export default CampaignListItem;
