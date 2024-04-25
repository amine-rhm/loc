import React from "react";
import ReactDOM from "react-dom/client";
import NotFound404 from "./components/NotFound404";
import "./index.css";
// import { Provider } from 'react-redux';
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authentification from "./pages/AuthentificationSection/Authentification";
import PublishAd from "./pages/PublishAd/PublishAd";
import Contact from "./pages/Contact/Contact";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider from "react-auth-kit/AuthProvider";
import {store} from "./pages/AuthentificationSection/Authstore"
import Ad from "./pages/ads/Ad";
import Bej from "./pages/Bej"
import Advanced from "./pages/Advanced";
// import {store} from "./redux/store"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound404 />,
  },
  {
    path: "/Auth",
    element: <Authentification />,
  },
  {
    path: "/DeposerAnnonce",
    element: <PublishAd />,
  },

  {
    path: "/Contactez-nous",
    element: <Contact />,
  },
  {
    path: "/Annonces",
    element: <Ad />,
  },
  {
    path: "/Villes/:ville/:budget",
    element: <Bej />,
  },
  {
    path: "/Villes/:ville/:budget/:type/:surface/:meuble",
    element: <Advanced />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
