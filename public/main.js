import { Router } from './modules/router.js';
import { SignUpView } from './views/SignUpView.js';
import { SignInView } from './views/SignInView.js';
import { MainView } from './views/MainView.js';
import { StoreView } from './views/StoreView.js';
import { ProfileView } from './views/ProfileView.js';
import { Logout } from './views/Logout.js';
import { Navbar } from './components/NavBar/Navbar.js';
import { authGet } from './modules/api.js';
import { InitViews } from './components/InitViews/InitViews.js';

// import './static/css/colors.css';
// import './components/basicStyles.css';
// import './components/cards.css';
// import './components/NavBar/Navbar.css';
// import './components/SignIn/Authorization.css';
// import './components/Profile/Profile.css';
// import './components/RestaurantPage/Store.css';
// import './components/InfoRestaurant/InfoRestaurant.css';
// import './components/Category/Category.css';
// import './components/Filter/Filter.css';
// import './components/PanelRestaurants/PanelRestaurants.css';
// import './components/Params/Params.css';
import './static/css/main.css';

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
const mainView = new MainView(view, goTo);
const storeView = new StoreView({ root: view, goTo: goTo });
const profileView = new ProfileView(view, goTo);
const logout = new Logout({ root: view, goTo: goTo });

router.addRoute('login', signInView);
router.addRoute('signup', signUpView);
router.addRoute('profile', profileView);
router.addRoute('main', mainView);
router.addRoute('store', storeView);
router.addRoute('logout', logout);

authGet()
    .then(_ => router.open(window.location.pathname))
    .catch(_ => router.open(window.location.pathname));
