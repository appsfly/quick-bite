import type { ReactNode } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import AppShell from "./components/AppShell";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import BusinessDetail from "./pages/BusinessDetail";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Placeholder from "./pages/Placeholder";

function Layout({ children, showNav }: { children: ReactNode; showNav: boolean }) {
  return (
    <AppShell>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>{children}</div>
      {showNav && <BottomNav />}
    </AppShell>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout showNav><Home /></Layout>} />
        <Route path="/business/:id" element={<Layout showNav={false}><BusinessDetail /></Layout>} />
        <Route path="/cart" element={<Layout showNav={false}><Cart /></Layout>} />
        <Route path="/orders" element={<Layout showNav><Placeholder title="Orders" emoji="📦" /></Layout>} />
        <Route path="/payment" element={<Layout showNav><Placeholder title="Payment" emoji="💳" /></Layout>} />
        <Route path="/profile" element={<Layout showNav><Profile /></Layout>} />
      </Routes>
    </HashRouter>
  );
}
