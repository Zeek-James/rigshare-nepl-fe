import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./constants/protectedRoute";

function App() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return (
    <div>
      <Router>
        <ProtectedRoutes isLoggedIn={isLoggedIn} />
        <ToastContainer
          autoClose={5000}
          style={{ position: "fixed", zIndex: 10000 }}
        />
      </Router>
    </div>
  );
}

export default App;
