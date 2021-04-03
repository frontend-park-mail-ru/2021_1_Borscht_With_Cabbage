import { Router } from './modules/router.js';
import { SignUpView } from './views/SignUpView.js';
import { SignInView } from './views/SignInView.js';
import { MainView } from './views/MainView.js';
import { StoreView } from './views/StoreView.js';
import { ProfileView } from './views/ProfileView.js';
import { Logout } from './views/Logout.js';
import { RestaurantMainView } from './views/RestaurantMain.js';
import { Navbar } from './components/NavBar/Navbar.js';
import { authGet } from './modules/api.js';

const application = document.getElementById('app');

const router = new Router(application);

const goTo = (page) => router.open(page);

const navbar = new Navbar({ root: application, goTo: goTo });
navbar.render();
const view = navbar.getViewPlace();

const signUpView = new SignUpView(view, goTo);
const loginView = new SignInView(view, goTo);
const mainView = new MainView(view, goTo);
const storeView = new StoreView(view, goTo);
const profileView = new ProfileView(view, goTo);
const logout = new Logout({ root: view, goTo: goTo });
const restaurantMainView = new RestaurantMainView({ root: view, goTo: goTo });

router.addRoute('login', loginView);
router.addRoute('signup', signUpView);
router.addRoute('profile', profileView);
router.addRoute('main', mainView);
router.addRoute('store', storeView);
router.addRoute('logout', logout);
router.addRoute('restaurantMain', restaurantMainView);

authGet()
    .then(_ => router.open(window.location.pathname))
    .catch(_ => router.open(window.location.pathname));
