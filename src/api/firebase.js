import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { refs } from '../js/refs';
import Notiflix from 'notiflix';

const firebaseConfig = {
  apiKey: 'AIzaSyAFkZ6D2f8O7g-et1VUXHdX7SWSbB_PNSU',
  authDomain: 'test-de530.firebaseapp.com',
  databaseURL: 'https://test-de530-default-rtdb.firebaseio.com',
  projectId: 'test-de530',
  storageBucket: 'test-de530.appspot.com',
  messagingSenderId: '847374011352',
  appId: '1:847374011352:web:df0884b079d52baa4440ad',
};

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
      Notiflix.Notify.failure('Sorry, you don`t sign up');
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
      Notiflix.Notify.failure('Sorry, you don`t sign up');
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
      Notiflix.Notify.failure('Sorry, you don`t sign up');
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
      Notiflix.Notify.failure('Sorry, you don`t sign out');
    });
};

refs.auth.signOutBtn?.addEventListener('click', onHandleSignOut);
refs.auth.loginForm?.addEventListener('submit', onHandleLoginForm);
refs.auth.signupForm?.addEventListener('submit', onHandleSubmitForm);
refs.auth.googleBtn?.addEventListener('click', onHandleGoogle);

export {
  onHandleSubmitForm,
  onHandleSignOut,
  onHandleLoginForm,
  onHandleGoogle,
};
