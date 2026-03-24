import {
  useState,
  type ReactNode,
  type FC,
} from "react";
import { createPortal } from "react-dom";
import { LoadingContext } from './LoadingContext';
// import "../app/styles/global.scss";

interface Props {
  children: ReactNode;
}

export const LoadingProvider: FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  
  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      {loading && createPortal(<div className="loading-app"></div>, document.body)}
    </LoadingContext.Provider>
  );
};
