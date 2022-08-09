import { auth } from '../../lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  sendEmailVerification,
  signOut,
} from 'firebase/auth';

const createUser = async ({ email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(userCredential.user);
    return userCredential;
  } catch (error) {
    return error.code;
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user.uid;
  } catch (error) {
    return error.code;
  }
};

const signOutUser = async () => {
  await signOut(auth);
};

const authService = {
  createUser,
  loginUser,
  signOutUser,
};

export default authService;
