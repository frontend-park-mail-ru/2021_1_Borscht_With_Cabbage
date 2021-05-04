import './static/css/variables.less'
import './components/basicStyles.less'
import './static/css/main.less';

import { SignInController } from './controllers/SignInController.js';
import { SignUpController } from './controllers/SignUpController.js';
import { RestaurantSignInController } from './controllers/RestaurantSignInController.js';
import { RestaurantSignUpController } from './controllers/RestaurantSignUpController.js';
import { BasketController } from './controllers/BasketController.js';
import { ProfileController } from './controllers/ProfileController.js';
import { StoreController } from './controllers/StoreController.js';
import { RestaurantMainController } from './controllers/RestaurantMainController.js';
import { MainController } from './controllers/MainController.js';
import { Router } from 'Modules/router.js';
import { Logout } from 'Views/Logout.js';
import { Navbar } from 'Components/NavBar/Navbar.js';
import { authGet } from 'Modules/api.js';
import { InitViews } from 'Components/InitViews/InitViews.js';

// import registerSW from './registerSW.js';
//
// registerSW();

const application = document.querySelector('body');

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
const storeController = new StoreController({ root: view, goTo: goTo });
const profileController = new ProfileController({ root: view, goTo: goTo });
const basketController = new BasketController({ root: view, goTo: goTo })
const logout = new Logout({ root: view, goTo: goTo });
const restaurantMainController = new RestaurantMainController({ root: view, goTo: goTo });
const mainController = new MainController({ root: view, goTo: goTo });

router.addRoute('login', signInController);
router.addRoute('signup', signUpController);
router.addRoute('restaurantSignin', restaurantSignInController)
router.addRoute('restaurantSignup', restaurantSignUpController)
router.addRoute('profile', profileController)
router.addRoute('main', mainController);
router.addRoute('store', storeController);
router.addRoute('basket', basketController)
router.addRoute('logout', logout);
router.addRoute('restaurantMain', restaurantMainController);

authGet()
    .then(_ => goTo(window.location.pathname))
    .catch(_ => goTo(window.location.pathname));
