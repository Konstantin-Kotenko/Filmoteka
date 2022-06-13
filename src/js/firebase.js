import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAFkZ6D2f8O7g-et1VUXHdX7SWSbB_PNSU',
  authDomain: 'test-de530.firebaseapp.com',
  databaseURL: 'https://test-de530-default-rtdb.firebaseio.com',
  projectId: 'test-de530',
  storageBucket: 'test-de530.appspot.com',
  messagingSenderId: '847374011352',
  appId: '1:847374011352:web:df0884b079d52baa4440ad',
};

const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const signOutBtn = document.getElementById('signOut');

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const onHandleSubmitForm = async e => {
  e.preventDefault();

  const email = e.currentTarget.elements[0].value;
  const password = e.currentTarget.elements[1].value;

  await createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      console.log('+++++');
      const user = userCredential.user;
      localStorage.setItem('user', JSON.stringify(user.uid));
    })
    .catch(error => {
      console.log('You are signup');
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  window.location.replace('index.html');
};

const onHandleLoginForm = async e => {
  e.preventDefault();
  const email = e.currentTarget.elements[0].value;
  const password = e.currentTarget.elements[1].value;

  await signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      console.log('+++++');
      const user = userCredential.user;
      localStorage.setItem('user', JSON.stringify(user.uid));
    })
    .catch(error => {
      console.log('-----');
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  window.location.replace('index.html');
};

if (
  localStorage.getItem('user') &&
  window.location.pathname === '/login.html'
) {
  window.location.replace('index.html');
}

if (
  !localStorage.getItem('user') &&
  window.location.pathname === '/library.html'
) {
  window.location.replace('index.html');
} else if (
  !localStorage.getItem('user') &&
  window.location.pathname === '/myLibrary.html'
) {
  window.location.replace('index.html');
}

const onHandleSignOutBtn = async () => {
  await signOut(auth)
    .then(() => {
      localStorage.removeItem(user);
    })
    .catch(error => {
      console.log('------');
    });
};

signOutBtn?.addEventListener('click', onHandleSignOutBtn);
loginForm?.addEventListener('submit', onHandleLoginForm);
signupForm?.addEventListener('submit', onHandleSubmitForm);
// export {};
