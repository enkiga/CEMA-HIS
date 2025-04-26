import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { AuthLayout, PagesLayout, RootLayout } from "./layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Client from "./pages/Client";
import Projects from "./pages/Projects";

function App() {
  // Define route principles
  const router = createBrowserRouter(
    createRoutesFromElements(
      // RootLayout
      <Route path="/" element={<RootLayout />}>
        {/* Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Public Routes */}
        <Route element={<PagesLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<Client />} />
          <Route path="projects" element={<Projects />} />
        </Route>

        {/* FallbackRoute */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
