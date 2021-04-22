import { Router } from './modules/router.js';
import { Navbar } from './components/NavBar/Navbar.js';
import { InitViews } from './components/InitViews/InitViews.js';
import { SignInController } from './controllers/SignInController.js';
import { SignUpController } from './controllers/SignUpController.js';
import { RestaurantSignInController } from './controllers/RestaurantSignInController.js';
import { RestaurantSignUpController } from './controllers/RestaurantSignUpController.js';
import { BasketController } from './controllers/BasketController.js';
import { ProfileController } from './controllers/ProfileController.js';
import { StoreController } from './controllers/StoreController.js';
import { MainView } from "./views/MainView.js";
import { RestaurantMainView } from './views/RestaurantMainView.js';
import { Logout } from './views/Logout.js';
import { authGet } from './modules/api.js';

import registerSW from './registerSW.js';

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

const signUpController = new SignUpController({ root: view, goTo: goTo });
const signInController = new SignInController({ root: view, goTo: goTo });
const restaurantSignInController = new RestaurantSignInController({ root: view, goTo: goTo });
const restaurantSignUpController = new RestaurantSignUpController({ root: view, goTo: goTo });
const mainView = new MainView(view, goTo);
const storeController = new StoreController({ root: view, goTo: goTo });
const profileController = new ProfileController({ root: view, goTo: goTo });
const basketController = new BasketController({ root: view, goTo: goTo })
const logout = new Logout({ root: view, goTo: goTo });
const restaurantMainView = new RestaurantMainView(view, goTo);

router.addRoute('login', signInController);
router.addRoute('signup', signUpController);
router.addRoute('restaurantSignin', restaurantSignInController)
router.addRoute('restaurantSignup', restaurantSignUpController)
router.addRoute('profile', profileController)
router.addRoute('main', mainView);
router.addRoute('store', storeController);
router.addRoute('basket', basketController)
router.addRoute('logout', logout);
router.addRoute('restaurantMain', restaurantMainView);

authGet()
    .then(_ => router.open(window.location.pathname))
    .catch(_ => router.open(window.location.pathname));
