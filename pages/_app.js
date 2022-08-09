import '../styles/globals.css';
import '../node_modules/react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from '../app/store';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

const noAuthRoutes = ['/login', 'signup'];

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <Provider store={store}>
      <Navbar />
      {noAuthRoutes.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
      <ToastContainer position="top-center" />
    </Provider>
  );
}

export default MyApp;
