/**
 * Utility functions for managing navigation state
 */

export const clearNavigationHistory = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('hasNavigated');
  }
};

export const hasNavigationHistory = () => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('hasNavigated') === 'true';
  }
  return false;
};

export const setNavigationHistory = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('hasNavigated', 'true');
  }
};