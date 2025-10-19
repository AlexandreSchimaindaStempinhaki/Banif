import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import HomeGerente from "./pages/HomeGerente";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Home/Gerente",
    element: <HomeGerente />,
  },
  {
    path: "/Home/:email", // 🔧 MUDOU PARA EMAIL
    element: <Home />,
  },
]);

export default router;
