// React Router
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import HomeGerente from "./pages/HomeGerente";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Home/Gerente",
    element: <HomeGerente />,
  },
]);

export default router;
