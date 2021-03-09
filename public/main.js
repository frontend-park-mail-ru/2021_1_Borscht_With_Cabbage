import { Router } from './modules/router.js';
import { SignUpView } from './views/SignUpView/SignUpView.js';
import { LoginView } from './views/LoginView/LoginView.js';
import { MainView } from './views/MainView/MainView.js';
import { StoreView } from './views/StoreView/StoreView.js';
import { ProfileView } from './views/ProfileView/ProfileView.js';
import { auth } from './modules/auth.js';
import { registerPartials } from './modules/registerPartials.js';
import { Validator } from './modules/validation.js';

const application = document.getElementById('app');

const router = new Router(application);

const goTo = (page) => router.open(page);

const signUpView = new SignUpView(application, goTo);
const loginView = new LoginView(application, goTo);
const mainView = new MainView(application, goTo);
const storeView = new StoreView(application, goTo);
const profileView = new ProfileView(application, goTo);

auth();
registerPartials();
window.validator = new Validator();

router.addRoute('login', loginView);
router.addRoute('signup', signUpView);
router.addRoute('/user', profileView)
router.addRoute('main', mainView);
router.addRoute('store', storeView); // TODO correct this

router.open(window.location.pathname);
