import { useContext } from 'react';
import { LoadingContext, type LoadingContextType } from '../context/LoadingContext';

/**
 * Hook để sử dụng Loading Context
 * @returns LoadingContextType với showLoading và hideLoading functions
 */
export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};