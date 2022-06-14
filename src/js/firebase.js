import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
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
const googleBtn = document.getElementById('googleBtn');

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);

const onHandleGoogle = async () => {
  await signInWithPopup(auth, provider)
    .then(result => {
      localStorage.setItem('user', JSON.stringify(result.user.uid));
      window.location.replace('index.html');
    })
    .catch(error => {
      console.log('sorry');
    });
};

const onHandleSubmitForm = async e => {
  e.preventDefault();

  const email = e.currentTarget.elements[0].value;
  const password = e.currentTarget.elements[1].value;

  await createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      window.location.replace('index.html');
      localStorage.setItem('user', JSON.stringify(user.uid));
    })
    .catch(error => {
      console.log(error);
    });
};

const onHandleLoginForm = async e => {
  e.preventDefault();

  const email = e.currentTarget.elements[0].value;
  const password = e.currentTarget.elements[1].value;

  await signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      localStorage.setItem('user', JSON.stringify(user.uid));
      window.location.replace('index.html');
    })
    .catch(error => {
      console.log(error);
    });
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
}

const onHandleSignOut = async () => {
  await signOut(auth)
    .then(() => {
      localStorage.removeItem('user');
    })
    .catch(error => {
      console.log(error);
    });
};

signOutBtn?.addEventListener('click', onHandleSignOut);
loginForm?.addEventListener('submit', onHandleLoginForm);
signupForm?.addEventListener('submit', onHandleSubmitForm);
googleBtn?.addEventListener('click', onHandleGoogle);

export {
  onHandleSubmitForm,
  onHandleSignOut,
  onHandleLoginForm,
  onHandleGoogle,
};
