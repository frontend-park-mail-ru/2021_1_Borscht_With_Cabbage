import { Router } from './modules/router.js';
import { SignUpView } from './views/SignUpView.js';
import { SignInView } from './views/SignInView.js';
import { RestaurantSignInView } from "./views/RestaurantSignInView.js";
import { RestaurantSignUpView } from "./views/RestaurantSignUpView.js";
import { StoreView } from './views/StoreView.js';
import { ProfileView } from './views/ProfileView.js';
import { Logout } from './views/Logout.js';
import { RestaurantMainView } from './views/RestaurantMainView.js';
import { Navbar } from './components/NavBar/Navbar.js';
import { authGet } from './modules/api.js';
import { MainView } from "./views/MainView.js";
import { InitViews } from './components/InitViews/InitViews.js';
import registerSW from './registerSW.js';
import { BasketView } from './views/BasketView.js';

import './static/css/main.css';

// registerSW();

const application = document.getElementById('app');

const router = new Router(application);

const goTo = (page) => router.open(page);

const initViews = new InitViews({ root: application });
initViews.render();
const navbarView = initViews.getNavbarPlace();
const view = initViews.getViewPlace();

const navbar = new Navbar({ root: navbarView, goTo: goTo });
navbar.render();

const signUpView = new SignUpView({ root: view, goTo: goTo });
const signInView = new SignInView({ root: view, goTo: goTo });
const restSignInView = new RestaurantSignInView({ root: view, goTo: goTo });
const restSignUpView = new RestaurantSignUpView({ root: view, goTo: goTo });
const mainView = new MainView(view, goTo);
const storeView = new StoreView({ root: view, goTo: goTo });
const profileView = new ProfileView(view, goTo);
const basketView = new BasketView({ root: view, goTo: goTo })
const logout = new Logout({ root: view, goTo: goTo });
const restaurantMainView = new RestaurantMainView(view, goTo);

router.addRoute('login', signInView);
router.addRoute('signup', signUpView);
router.addRoute('restaurantSignin', restSignInView)
router.addRoute('restaurantSignup', restSignUpView)
router.addRoute('profile', profileView)
router.addRoute('main', mainView);
router.addRoute('store', storeView);
router.addRoute('basket', basketView)
router.addRoute('logout', logout);
router.addRoute('restaurantMain', restaurantMainView);

authGet()
    .then(_ => router.open(window.location.pathname))
    .catch(_ => router.open(window.location.pathname));
