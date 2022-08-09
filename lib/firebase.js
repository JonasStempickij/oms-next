// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  list,
} from 'firebase/storage';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  sendEmailVerification,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBX4LVDHkqXGm2Okv1la89ap8j9AdmikbA',
  authDomain: 'oms-next.firebaseapp.com',
  projectId: 'oms-next',
  storageBucket: 'oms-next.appspot.com',
  messagingSenderId: '99113388652',
  appId: '1:99113388652:web:59ef877cfe5c11c931a649',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

const storage = getStorage(app);

export const uploadFile = async (file, _id) => {
  const storageRef = ref(storage, `${_id}/${file.name}`);
  await uploadBytes(storageRef, file).then((snapshot) => {
    console.log(`Uploaded ${file.name} of job id: ${_id}!`);
  });
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

export const deleteFile = async (_id) => {
  const storageRef = ref(storage, _id);
  const listResult = await list(storageRef);
  const deleteRef = ref(storage, listResult.items[0].fullPath);
  try {
    await deleteObject(deleteRef);
  } catch (error) {
    console.log(error);
  }
};
