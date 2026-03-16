import { Lead } from './supabase';

// Generate realistic mock leads
export const generateMockLeads = (): Lead[] => {
  const firstNames = ['John', 'Sarah', 'Michael', 'Jessica', 'David', 'Emily', 'Robert', 'Amanda', 'James', 'Michelle'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  const markets = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Miami', 'Seattle', 'Denver', 'Austin', 'Boston'];
  const gciRanges = ['$500K - $1M', '$1M - $2M', '$2M - $5M', '$5M+', 'Not Disclosed'];
  const timelines = ['This month', 'Next 3 months', 'Next 6 months', 'Next 12 months', 'Exploratory'];
  const statuses: Array<Lead['status']> = ['new', 'contacted', 'converted', 'lost'];

  const leads: Lead[] = [];
  const now = new Date();

  for (let i = 0; i < 25; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    // 70% chance of new, 15% contacted, 10% converted, 5% lost
    let randomStatus = 'new' as Lead['status'];
    const rand = Math.random();
    if (rand < 0.7) randomStatus = 'new';
    else if (rand < 0.85) randomStatus = 'contacted';
    else if (rand < 0.95) randomStatus = 'converted';
    else randomStatus = 'lost';

    const daysAgo = Math.floor(Math.random() * 90);
    const createdDate = new Date(now);
    createdDate.setDate(createdDate.getDate() - daysAgo);

    const lead: Lead = {
      id: `lead_${i + 1}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
      phone: `+1 ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      brokerage: ['Remax', 'Coldwell Banker', 'Keller Williams', 'Century 21'][Math.floor(Math.random() * 4)],
      market: markets[Math.floor(Math.random() * markets.length)],
      gci_range: gciRanges[Math.floor(Math.random() * gciRanges.length)],
      timeline: timelines[Math.floor(Math.random() * timelines.length)],
      challenge: ['Lead generation', 'Team growth', 'Technology upgrade', 'Coaching program'][Math.floor(Math.random() * 4)],
      status: randomStatus,
      created_at: createdDate.toISOString(),
      updated_at: createdDate.toISOString(),
      notes: ['Follow up needed', 'Great fit', 'Needs more info', ''][Math.floor(Math.random() * 4)],
      contact_date: randomStatus !== 'new' ? new Date(createdDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() : undefined,
    };

    leads.push(lead);
  }

  return leads;
};

let mockDataStore: Lead[] | null = null;

export const getMockLeads = (): Lead[] => {
  if (!mockDataStore) {
    mockDataStore = generateMockLeads();
  }
  return mockDataStore;
};

export const addMockLead = (lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>): Lead => {
  if (!mockDataStore) {
    mockDataStore = generateMockLeads();
  }

  const newLead: Lead = {
    ...lead,
    id: `lead_${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  mockDataStore.push(newLead);
  return newLead;
};

export const updateMockLead = (id: string, updates: Partial<Lead>): Lead | null => {
  if (!mockDataStore) {
    mockDataStore = generateMockLeads();
  }

  const index = mockDataStore.findIndex(l => l.id === id);
  if (index === -1) return null;

  mockDataStore[index] = {
    ...mockDataStore[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };

  return mockDataStore[index];
};
