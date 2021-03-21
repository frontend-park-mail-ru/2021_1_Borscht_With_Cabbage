import { Router } from './modules/router.js';
import { SignUpView } from './views/SignUpView/SignUpView.js';
import { LoginView } from './views/LoginView/LoginView.js';
import { MainView } from './views/MainView/MainView.js';
import { StoreView } from './views/StoreView/StoreView.js';
import { ProfileView } from './views/ProfileView/ProfileView.js';
import { auth } from './modules/auth.js';
import { Logout } from './components/Logout/Logout.js';
import { NotFound } from "./views/NotFoundView/NotFound.js";

const application = document.getElementById('app');

const router = new Router(application);

const goTo = (page) => router.open(page);

const signUpView = new SignUpView(application, goTo);
const loginView = new LoginView(application, goTo);
const mainView = new MainView(application, goTo);
const storeView = new StoreView(application, goTo);
const profileView = new ProfileView(application, goTo);
const logout = new Logout({ root: application, goTo: goTo });
const notFound = new NotFound(application, goTo)

router.addRoute('login', loginView);
router.addRoute('signup', signUpView);
router.addRoute('profile', profileView)
router.addRoute('main', mainView);
router.addRoute('store', storeView);
router.addRoute('logout', logout);
router.addRoute('*', notFound);

auth()
    .then(_ => router.open(window.location.pathname))
    .catch(_ => router.open(window.location.pathname));
