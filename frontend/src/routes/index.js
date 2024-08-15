import Home from "../pages/Home";
import Store from "../pages/Store";
import AddItem from "../pages/AddItem";
import Cart from "../pages/Cart";
import ItemDetail from "../pages/ItemDetail";
import NotFound from "../pages/NotFound";
import Register from "../pages/register";
import Auth from "../pages/Auth";
import Profile from "../pages/profile";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/store",
    component: Store,
  },
  {
    path: "/store/detail/:id",
    component: ItemDetail,
  },
  {
    path: "/additem",
    component: AddItem,
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/auth",
    component: Auth,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "*",
    component: NotFound,
  },
];

export default routes;
