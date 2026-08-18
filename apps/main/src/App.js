import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider, useAuth } from "@rigshare/shared-auth";
import ProtectedRoutes from "./constants/protectedRoute";

function AppRoutes() {
  const { isLoggedIn } = useAuth();

  return <ProtectedRoutes isLoggedIn={isLoggedIn} />;
}

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <AppRoutes />
          <ToastContainer
            autoClose={5000}
            style={{ position: "fixed", zIndex: 10000 }}
          />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
