// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import React from 'react';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('App Integration', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('sorts campaigns by ID numerically descending (bug reproduction)', async () => {
    // Setup mock response with IDs "2" and "10"
    // "10" should be considered newer/larger than "2" if treated numerically.
    // Lexicographically "2" > "10", so "2" would come first if sorted descending by string.
    // We want "10" to come first.
    const mockCampaigns = [
      { id: '2', name: 'Campaign Two', location: 'Loc 2' },
      { id: '10', name: 'Campaign Ten', location: 'Loc 10' },
    ];

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockCampaigns,
    });

    render(<App />);

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText('Loading Campaigns...')).toBeNull();
    });

    // Check if campaigns are rendered
    const items = screen.getAllByText(/Campaign (Two|Ten)/);
    expect(items).toHaveLength(2);

    // Get the text content of the items to verify order
    // We expect "Campaign Ten" to appear before "Campaign Two" because 10 > 2.
    // Currently, with the bug, "Campaign Two" (ID "2") will appear before "Campaign Ten" (ID "10")
    // because "2" > "10" in string comparison.

    // Note: screen.getAllByText might return elements in document order.
    // We need to verify the order in the document.

    const firstItem = items[0];
    const secondItem = items[1];

    expect(firstItem.textContent).toContain('Campaign Ten');
    expect(secondItem.textContent).toContain('Campaign Two');
  });
});
