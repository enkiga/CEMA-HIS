import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import {
  AuthLayout,
  AuthRedirectLayout,
  PagesLayout,
  ProtectedLayout,
  RootLayout,
} from "./layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Client from "./pages/Client";
import Projects from "./pages/Projects";
import { Toaster } from "./components/ui/sonner";
import { UserProvider } from "./context/UserContext";
import ViewClient from "./pages/ViewClient";

function App() {
  // Define route principles
  const router = createBrowserRouter(
    createRoutesFromElements(
      // RootLayout
      <Route path="/" element={<RootLayout />}>
        <Route element={<AuthRedirectLayout />}>
          {/* Auth Layout */}
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<ProtectedLayout />}>
          {/* Public Routes */}
          <Route element={<PagesLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="clients" element={<Client />}>
              <Route path=":clientId" element={<ViewClient />} />
            </Route>
            <Route path="projects" element={<Projects />} />
          </Route>
        </Route>

        {/* FallbackRoute */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    )
  );
  return (
    <UserProvider >
      <RouterProvider router={router} />
      <Toaster />
    </UserProvider>
  );
}

export default App;
