import { useEffect, useState } from "react";
import "@/App.css";
import { HashRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Login from "@/components/Login";
import Welcome from "@/components/Welcome";

const AUTH_KEY = "urvi_auth";

export const isAuthed = () => sessionStorage.getItem(AUTH_KEY) === "1";
export const setAuthed = (v) => {
  if (v) sessionStorage.setItem(AUTH_KEY, "1");
  else sessionStorage.removeItem(AUTH_KEY);
};

const Protected = ({ children }) => {
  if (!isAuthed()) return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <div className="App" data-testid="app-root">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/welcome"
            element={
              <Protected>
                <Welcome />
              </Protected>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
