import { useState } from 'react';
import { AnimatedPage } from '../components/AnimatedPage';
import { Sidebar } from '../components/dashboard/Sidebar';
import type { DashboardTab } from '../components/dashboard/Sidebar';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { StatsCards } from '../components/dashboard/StatsCards';
import { EmailAgentCard } from '../components/dashboard/EmailAgentCard';
import { InvoiceAgentCard } from '../components/dashboard/InvoiceAgentCard';
import { ApprovalQueuePanel } from '../components/dashboard/ApprovalQueuePanel';
import { WorkflowHistoryTable } from '../components/dashboard/WorkflowHistoryTable';
import { WorkflowsPanel } from '../components/dashboard/WorkflowsPanel';
import { AgentsPanel } from '../components/dashboard/AgentsPanel';
import { AnalyticsPanel } from '../components/dashboard/AnalyticsPanel';
import { SettingsPanel } from '../components/dashboard/SettingsPanel';

export const DashboardPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            {/* Top 4 Stats */}
            <StatsCards />

            {/* Main Content Grid: Left Upload Cards + Right Approval Queue */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Email & Invoice Upload Cards */}
              <div className="lg:col-span-7 space-y-8">
                <EmailAgentCard />
                <InvoiceAgentCard />
              </div>

              {/* Right Column: Approval Queue Panel */}
              <div className="lg:col-span-5">
                <ApprovalQueuePanel />
              </div>
            </div>

            {/* Bottom Section: Workflow History Table */}
            <WorkflowHistoryTable />
          </>
        );

      case 'workflows':
        return <WorkflowsPanel />;

      case 'agents':
        return <AgentsPanel />;

      case 'approvals':
        return (
          <div className="max-w-3xl">
            <ApprovalQueuePanel />
          </div>
        );

      case 'history':
        return <WorkflowHistoryTable />;

      case 'analytics':
        return <AnalyticsPanel />;

      case 'settings':
        return <SettingsPanel />;

      default:
        return null;
    }
  };

  return (
    <AnimatedPage>
      <div className="flex min-h-screen bg-[#08080C] text-[#F3F4F6] relative overflow-hidden font-sans">
        {/* Collapsible Left Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Main Dashboard Workspace */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Navbar */}
          <DashboardHeader />

          {/* Workspace Body */}
          <div className="p-6 sm:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};
