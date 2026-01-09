// Module variable to control preloader visibility
let shouldShowPreloader = true;

/**
 * Get the current state of the preloader flag
 * @returns {boolean} - Current preloader flag state
 */
export const getPreloaderFlag = (): boolean => {
  return shouldShowPreloader;
};

/**
 * Set the preloader flag to false after it has been rendered
 * This ensures the preloader only shows once
 */
export const disablePreloader = (): void => {
  shouldShowPreloader = false;
};