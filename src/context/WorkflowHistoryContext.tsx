import React, { createContext, useContext, useState, useEffect } from 'react';

export interface WorkflowHistoryItem {
  id: string;
  agent: 'Invoice Agent' | 'Email Agent' | string;
  status: 'Completed' | 'Approved' | 'Pending Approval' | 'In Review' | 'Rejected';
  timestamp: string;
  summary: string;
  result: string;
}

interface WorkflowHistoryContextType {
  historyItems: WorkflowHistoryItem[];
  addHistoryItem: (
    item: Omit<WorkflowHistoryItem, 'id' | 'timestamp'> & { id?: string; timestamp?: string }
  ) => WorkflowHistoryItem;
  clearHistory: () => void;
}

const STORAGE_KEY = 'manaiger_workflow_history_v1';

const INITIAL_MOCK_HISTORY: WorkflowHistoryItem[] = [
  {
    id: '#WF-9406',
    agent: 'Invoice Agent',
    status: 'Completed',
    timestamp: '2026-08-08 15:42',
    summary: 'Stratos Cloud Services - August 2026 Enterprise Node Pool & DB Cluster',
    result: 'Approved $3,967.39 vendor payment to Stratos Cloud Services Inc.',
  },
  {
    id: '#WF-9405',
    agent: 'Email Agent',
    status: 'Completed',
    timestamp: '2026-08-08 15:10',
    summary: 'Customer refund claim for duplicate transaction on Invoice #INV-8821',
    result: 'Sent priority support draft response with 3-5 day refund timeline',
  },
  {
    id: '#WF-9404',
    agent: 'Invoice Agent',
    status: 'Completed',
    timestamp: '2026-08-07 19:20',
    summary: 'Apex Freight Logistics - Air Freight Express Cargo Transportation',
    result: 'Approved $14,250.00 vendor payment to Apex Logistics LLC',
  },
  {
    id: '#WF-9403',
    agent: 'Email Agent',
    status: 'Completed',
    timestamp: '2026-08-07 17:15',
    summary: 'Inbound customer inquiry classification and routing',
    result: 'Categorized and assigned 42 customer support emails in Zendesk',
  },
  {
    id: '#WF-9402',
    agent: 'Invoice Agent',
    status: 'Completed',
    timestamp: '2026-08-07 14:05',
    summary: 'CyberShield Systems - Annual SIEM License Renewal',
    result: 'Reconciled $6,120.00 annual software license renewal',
  },
  {
    id: '#WF-9401',
    agent: 'Email Agent',
    status: 'Pending Approval',
    timestamp: '2026-08-07 11:30',
    summary: 'Enterprise SLA Extension Inquiry from Acme Corp',
    result: 'Draft reply created; awaiting manager verification sign-off',
  },
];

const WorkflowHistoryContext = createContext<WorkflowHistoryContextType | undefined>(undefined);

export const WorkflowHistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [historyItems, setHistoryItems] = useState<WorkflowHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Failed to load workflow history from localStorage:', err);
    }
    return INITIAL_MOCK_HISTORY;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(historyItems));
    } catch (err) {
      console.warn('Failed to persist workflow history to localStorage:', err);
    }
  }, [historyItems]);

  const addHistoryItem = (
    item: Omit<WorkflowHistoryItem, 'id' | 'timestamp'> & { id?: string; timestamp?: string }
  ): WorkflowHistoryItem => {
    const now = new Date();
    const formattedTimestamp =
      item.timestamp ||
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const autoId = item.id || `#WF-${Math.floor(9407 + Math.random() * 500)}`;

    const newItem: WorkflowHistoryItem = {
      id: autoId,
      agent: item.agent,
      status: item.status,
      timestamp: formattedTimestamp,
      summary: item.summary,
      result: item.result,
    };

    setHistoryItems((prev) => [newItem, ...prev]);
    return newItem;
  };

  const clearHistory = () => {
    setHistoryItems(INITIAL_MOCK_HISTORY);
  };

  return (
    <WorkflowHistoryContext.Provider value={{ historyItems, addHistoryItem, clearHistory }}>
      {children}
    </WorkflowHistoryContext.Provider>
  );
};

export const useWorkflowHistory = (): WorkflowHistoryContextType => {
  const context = useContext(WorkflowHistoryContext);
  if (!context) {
    throw new Error('useWorkflowHistory must be used within a WorkflowHistoryProvider');
  }
  return context;
};
