
import React from 'react';
import { Campaign } from '../types';
import CampaignListItem from './CampaignListItem';
import { Card } from './ui/Card';

interface CampaignListProps {
  campaigns: Campaign[];
}

const CampaignList = ({ campaigns }: CampaignListProps): React.ReactNode => {
  if (campaigns.length === 0) {
    return (
      <Card className="p-6 bg-slate-800 shadow-xl text-center">
        <h2 className="text-2xl font-semibold text-sky-400 mb-4">No Campaigns Yet</h2>
        <p className="text-slate-400">Add a new campaign using the form to see it listed here.</p>
        <div className="mt-6 opacity-50 flex justify-center">
          <svg className="w-24 h-24 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-slate-800 shadow-xl">
      <h2 className="text-2xl font-semibold text-sky-400 mb-6">Current Campaigns</h2>
      <div className="space-y-4 max-h-[calc(100vh-380px)] min-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
        {campaigns.map((campaign) => (
          <CampaignListItem key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </Card>
  );
};

export default CampaignList;
