import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser } from '../features/auth/authSlice';
import { auth } from '../lib/firebase';

const ProtectedRoute = ({ children }) => {
  const { userId } = useSelector((state) => state.authState);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(checkUser(user.uid));
      } else {
        console.log('Redirecting because no user found');
        router.push('/login');
      }
    });
    unsubscribe();
  }, [router, dispatch]);

  return <>{userId ? children : null}</>;
};

export default ProtectedRoute;
