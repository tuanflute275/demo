import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classNames from 'classnames/bind';
import { appRoutes } from '@/routes/Routes';
import { LoadingProvider } from '@/shared/context/UseLoadingContext';
import styles from './App.module.scss';
import { useScrollProgress } from './shared/hook/useScrollProgress';
import ScrollToTop from './shared/hook/ScrollToTop';
import { API_ENDPOINTS, apiPost } from './api';
import { useEffect } from 'react';


const cx = classNames.bind(styles);

function App() {
  const progress = useScrollProgress();


  const initLog = async () => {
    try {
      const logKey = 'user-log-home-page';

      // chặn log trùng trong 1 session
      if (sessionStorage.getItem(logKey)) return;

      const request = {
        action: 'VISIT_PAGE',
        resource: 'HOME_PAGE',
        description: 'User opened home page'
      };

      await apiPost(API_ENDPOINTS.LOG_USER, request);

      sessionStorage.setItem(logKey, '1');
    } catch (err) {
      // không throw – không ảnh hưởng UI
      console.error('Handle log api failed:', err);
    }
  };

  useEffect(() => {
    initLog();
  }, []);


  return (
    <LoadingProvider>
      <div className={cx("vertical-progress-container", "right")}>
        <div
          className={cx("vertical-progress-fill")}
          style={{ height: `${progress}%` }}
        />
        <div className={cx("percent-indicator")}>
          {progress}%
        </div>
      </div>
      <div className={cx('app')}>
        <Router>
          <ScrollToTop />
          <Routes>
            {appRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              />
            ))}
            {/* Catch all route for 404 */}
            <Route path="*" element={appRoutes.find(r => r.path === '/404')?.element} />
          </Routes>
        </Router>

        {/* Toast Container cho thông báo */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </LoadingProvider>
  );
}

export default App;
