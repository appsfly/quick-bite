import type { ReactNode } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import AppShell from "./components/AppShell";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import BusinessDetail from "./pages/BusinessDetail";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Placeholder from "./pages/Placeholder";
import { useAuthStore } from "./store/authStore";

function Layout({ children, showNav }: { children: ReactNode; showNav: boolean }) {
  return (
    <AppShell>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>{children}</div>
      {showNav && <BottomNav />}
    </AppShell>
  );
}

function RequireAuth({ children }: { children: ReactNode }) {
  const currentUser = useAuthStore((s) => s.currentUser);
  if (!currentUser) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<AppShell><Login /></AppShell>} />
        <Route path="/signup" element={<AppShell><Signup /></AppShell>} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout showNav>
                <Home />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/business/:id"
          element={
            <RequireAuth>
              <Layout showNav={false}>
                <BusinessDetail />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <Layout showNav={false}>
                <Cart />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/orders"
          element={
            <RequireAuth>
              <Layout showNav>
                <Orders />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/payment"
          element={
            <RequireAuth>
              <Layout showNav>
                <Placeholder title="Payment" emoji="💳" />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Layout showNav>
                <Profile />
              </Layout>
            </RequireAuth>
          }
        />
      </Routes>
    </HashRouter>
  );
}
