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
const login = document.getElementById('authorization');
const googleBtn = document.getElementById('googleBtn');
const authorization = document.querySelector('.authorization');

const pagesHeader = document.querySelector('.pages');
console.log(pagesHeader);

const logoLi = `
  <li class="page">
    <a href="/src/login.htm" class="page-link" id="authorization">
      Sign Out
    </a>
  </li>`;

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);

const onHandleGoogle = async () => {
  await signInWithPopup(auth, provider)
    .then(result => {
      localStorage.setItem('user', JSON.stringify(result.user.uid));
      // window.location.replace(
      //   'https://konstantin-kotenko.github.io/Filmoteka/index.html'
      // );
      window.location.replace('/index.html');
    })
    .catch(error => {
      console.log('sorry');
    });
  authorization.remove();
  pagesHeader.insertAdjacentHTML = ('beforeend', logoLi);
};

const onHandleSubmitForm = async e => {
  e.preventDefault();

  const email = e.currentTarget.elements[0].value;
  const password = e.currentTarget.elements[1].value;
  // pagesHeader.insertAdjacentHTML = ('beforeend', logoLi);
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
  // window.location.pathname ===
  //   'https://konstantin-kotenko.github.io/Filmoteka/login.html'
  window.location.replace('/login.html')
) {
  // window.location.replace(
  //   'https://konstantin-kotenko.github.io/Filmoteka/index.html');
  window.location.replace('/index.html');
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
      logoLi.remove();
    })
    .catch(error => {});
};

signOutBtn?.addEventListener('click', onHandleSignOut);
loginForm?.addEventListener('submit', onHandleLoginForm);
signupForm?.addEventListener('submit', onHandleSubmitForm);
googleBtn?.addEventListener('click', onHandleGoogle);
export { onHandleSubmitForm, onHandleSignOut, onHandleLoginForm };
