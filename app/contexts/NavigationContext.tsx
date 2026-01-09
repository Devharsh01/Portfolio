"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface NavigationContextType {
  isDirectVisit: boolean;
  shouldShowPreloader: boolean;
  setNavigationInitialized: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const [isDirectVisit, setIsDirectVisit] = useState(true);
  const [shouldShowPreloader, setShouldShowPreloader] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check if this is a direct visit or client-side navigation
    const hasNavigationHistory = sessionStorage.getItem('hasNavigated');
    
    // Multiple ways to detect direct navigation:
    // 1. Check if we have navigation history
    // 2. Check performance navigation type (if available)
    // 3. Check if document.referrer is from same origin
    let isPageRefresh = false;
    
    if (typeof window !== 'undefined') {
      // Modern browsers
      if (performance.navigation) {
        isPageRefresh = performance.navigation.type === 1; // TYPE_RELOAD
      }
      // Newer Navigation API
      else if (performance.getEntriesByType) {
        const navigationEntries = performance.getEntriesByType('navigation');
        if (navigationEntries.length > 0) {
          const navEntry = navigationEntries[0] as PerformanceNavigationTiming;
          isPageRefresh = navEntry.type === 'reload';
        }
      }
    }
    
    const directVisit = !hasNavigationHistory || isPageRefresh;
    setIsDirectVisit(directVisit);
    setShouldShowPreloader(directVisit);

    // Add preloader class to body if we should show preloader
    if (directVisit) {
      document.body.classList.add('preloader-active');
    }

    // Mark that navigation has been initialized
    sessionStorage.setItem('hasNavigated', 'true');
    setIsInitialized(true);
  }, []);

  // Track route changes for client-side navigation
  useEffect(() => {
    if (isInitialized) {
      // This is client-side navigation, don't show preloader
      setShouldShowPreloader(false);
    }
  }, [pathname, isInitialized]);

  const setNavigationInitialized = () => {
    sessionStorage.setItem('hasNavigated', 'true');
  };

  return (
    <NavigationContext.Provider value={{
      isDirectVisit,
      shouldShowPreloader,
      setNavigationInitialized
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};