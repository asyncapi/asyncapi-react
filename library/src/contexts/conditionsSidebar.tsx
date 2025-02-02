import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SidebarContextType {
  conditionsSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [conditionsSidebarOpen, setConditionsSidebarOpen] =
    useState<boolean>(false);

  const toggleSidebar = () => setConditionsSidebarOpen((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ conditionsSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook
export const useSidebarContext = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
};
