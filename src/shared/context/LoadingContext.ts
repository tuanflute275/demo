import { createContext } from "react";

export interface LoadingContextType {
  showLoading: () => void;
  hideLoading: () => void;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);