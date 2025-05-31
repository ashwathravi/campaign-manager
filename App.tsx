
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
    <div className="app-container">
      <header className="app-header">
        <div className="app-header-title-container">
          <MegaphoneIcon className="app-megaphone-icon" />
          <h1 className="app-title">
            Campaign Manager
          </h1>
        </div>
        <p className="app-header-subtitle">
          Organize, track, and manage your marketing campaigns with ease.
        </p>
      </header>

      <main className="app-main-content">
        <section className="app-main-form-section">
          <CampaignForm onAddCampaign={addCampaignHandler} />
        </section>

        <section className="app-main-list-section">
          {isLoading && (
            <Card className="app-loading-card">
              <h2 className="app-card-title-loading">Loading Campaigns...</h2>
              <p className="app-card-text-loading">Please wait while we fetch the campaign data.</p>
              <div className="app-spinner-container">
                <div className="app-spinner"></div>
              </div>
            </Card>
          )}
          {fetchError && (
             <Card className="app-error-card">
              <h2 className="app-card-title-error">Error Fetching Campaigns</h2>
              <p className="app-card-text-error">{fetchError}</p>
              <Button onClick={fetchCampaigns} className="app-try-again-button">Try Again</Button>
            </Card>
          )}
          {!isLoading && !fetchError && <CampaignList campaigns={campaigns} />}
        </section>
      </main>

      <footer className="app-footer">
        <p className="app-footer-text">
          &copy; {new Date().getFullYear()} Campaign Manager App. Built with React & Tailwind CSS.
        </p>
      </footer>
    </div>
  );
};

export default App;
