import { Router } from 'Modules/router.js';
import { SignUpView } from 'Views/SignUpView.js';
import { SignInView } from 'Views/SignInView.js';
import { RestaurantSignInView } from "Views/RestaurantSignInView.js";
import { RestaurantSignUpView } from "Views/RestaurantSignUpView.js";
import { StoreView } from 'Views/StoreView.js';
import { ProfileView } from 'Views/ProfileView.js';
import { Logout } from 'Views/Logout.js';
import { RestaurantMainView } from 'Views/RestaurantMainView.js';
import { Navbar } from 'Components/NavBar/Navbar.js';
import { authGet } from 'Modules/api.js';
import { MainView } from "Views/MainView.js";
import { InitViews } from 'Components/InitViews/InitViews.js';
import registerSW from './registerSW.js';
import { BasketView } from 'Views/BasketView.js';

import './static/css/main.css';

registerSW();

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
