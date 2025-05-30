
import React, { useState, useCallback, useEffect } from 'react';
import { Campaign } from './types';
import CampaignForm from './components/CampaignForm';
import CampaignList from './components/CampaignList';
import { MegaphoneIcon } from './components/icons/MegaphoneIcon';
import { Card } from './components/ui/Card'; // Used for loading/error display consistency
import { Button } from './components/ui/Button'; // Added import for Button

const API_BASE_URL = 'https://newsletters-api.cloud.run.com';

const App = (): React.ReactNode => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchCampaigns = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/campaigns`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to fetch campaigns. Invalid server response.' }));
        throw new Error(errorData.message || `Failed to fetch campaigns. Status: ${response.status}`);
      }
      const data: Campaign[] = await response.json();
      setCampaigns(data.sort((a, b) => b.id.localeCompare(a.id))); // Assuming newer campaigns have higher IDs or based on creation time implicitly
    } catch (error) {
      if (error instanceof Error) {
        setFetchError(error.message);
      } else {
        setFetchError('An unknown error occurred while fetching campaigns.');
      }
      setCampaigns([]); // Clear campaigns on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const addCampaignHandler = useCallback(async (name: string, location: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/campaigns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, location }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to add campaign. Invalid server response.' }));
      throw new Error(errorData.message || `Failed to add campaign. Status: ${response.status}`);
    }

    const newCampaign: Campaign = await response.json();
    setCampaigns(prevCampaigns => [newCampaign, ...prevCampaigns].sort((a, b) => b.id.localeCompare(a.id)));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 p-4 sm:p-8 font-sans">
      <header className="mb-10 text-center">
        <div className="inline-flex items-center justify-center">
          <MegaphoneIcon className="h-12 w-12 text-sky-400 mr-3" />
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">
            Campaign Manager
          </h1>
        </div>
        <p className="mt-3 text-lg text-slate-400 max-w-xl mx-auto">
          Organize, track, and manage your marketing campaigns with ease.
        </p>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <section className="md:col-span-1">
          <CampaignForm onAddCampaign={addCampaignHandler} />
        </section>

        <section className="md:col-span-2">
          {isLoading && (
            <Card className="p-6 bg-slate-800 shadow-xl text-center">
              <h2 className="text-2xl font-semibold text-sky-400 mb-4">Loading Campaigns...</h2>
              <p className="text-slate-400">Please wait while we fetch the campaign data.</p>
              {/* Basic spinner */}
              <div className="mt-4 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-400"></div>
              </div>
            </Card>
          )}
          {fetchError && (
             <Card className="p-6 bg-red-900/50 border border-red-700 shadow-xl text-center">
              <h2 className="text-2xl font-semibold text-red-300 mb-4">Error Fetching Campaigns</h2>
              <p className="text-red-200">{fetchError}</p>
              <Button onClick={fetchCampaigns} className="mt-4">Try Again</Button>
            </Card>
          )}
          {!isLoading && !fetchError && <CampaignList campaigns={campaigns} />}
        </section>
      </main>

      <footer className="text-center mt-12 py-6 border-t border-slate-700">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Campaign Manager App. Built with React & Tailwind CSS.
        </p>
      </footer>
    </div>
  );
};

export default App;
