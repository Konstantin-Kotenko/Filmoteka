import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
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
const login = document.getElementById('authorization');

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const onHandleGoogle = async () => {
  await signInWithPopup(auth, googleProvider)
    .then(result => {
      localStorage.setItem('user', JSON.stringify(result.user.uid));
      exit.classList.remove('is-hidden');
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
      signOutBtn.classList.remove('is-hidden');
      login.classList.add('is-hidden');
      window.location.replace('index.html');
      localStorage.setItem('user', JSON.stringify(user.uid));
    })
    .catch(error => {});
};

const onHandleLoginForm = async e => {
  e.preventDefault();
  const email = e.currentTarget.elements[0].value;
  const password = e.currentTarget.elements[1].value;

  await signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      localStorage.setItem('user', JSON.stringify(user.uid));
      signOutBtn.classList.remove('is-hidden');
      login.classList.add('is-hidden');
      window.location.replace('index.html');
    })
    .catch(error => {
      console.log('----');
    });
};

if (
  localStorage.getItem('user') &&
  window.location.pathname ===
    'https://konstantin-kotenko.github.io/Filmoteka/login.html'
) {
  window.location.replace(
    'https://konstantin-kotenko.github.io/Filmoteka/index.html'
  );
}

if (
  !localStorage.getItem('user') &&
  window.location.pathname ===
    'https://konstantin-kotenko.github.io/Filmoteka/library.html'
) {
  window.location.replace(
    'https://konstantin-kotenko.github.io/Filmoteka/index.html'
  );
}

const onHandleSignOut = async () => {
  await signOut(auth)
    .then(() => {
      localStorage.removeItem('user');
      login.classList.remove('is-hidden');
    })
    .catch(error => {});
};

signOutBtn?.addEventListener('click', onHandleSignOut);
loginForm?.addEventListener('submit', onHandleLoginForm);
signupForm?.addEventListener('submit', onHandleSubmitForm);

export { onHandleSubmitForm, onHandleSignOut, onHandleLoginForm };
