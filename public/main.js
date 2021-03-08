import { Router } from './modules/router.js';
import { SignUpView } from './views/SignUpView/SignUpView.js';
import { LoginView } from './views/LoginView/LoginView.js';
import { MainView } from './views/MainView/MainView.js';
import { StoreView } from './views/StoreView/StoreView.js';
import { ProfileView } from './views/ProfileView/ProfileView.js';
import { auth } from './modules/auth.js';
import { registerPartials } from './modules/registerPartials.js';

const application = document.getElementById('app');

const router = new Router(application);

const signUpView = new SignUpView(application, router);
const loginView = new LoginView(application, router);
const mainView = new MainView(application, router);
const storeView = new StoreView(application, router);
const profileView = new ProfileView(application, router);

auth();
registerPartials();

router.addRoute('/login', loginView);
router.addRoute('/signup', signUpView);
router.addRoute('/user', profileView)
router.addRoute('/', mainView);
router.addRoute('/puk', storeView); // TODO correct this
router.open(window.location.pathname);
