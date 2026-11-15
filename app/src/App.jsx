import { BrowserRouter as Router, Routes, Route } from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ViewTicket from "./pages/ViewTicket";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedSidebar from "./components/ProtectedSidebar";
import PublicRoute from "./components/PublicRoute";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/register" element={<Register />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedSidebar />}>
            <Route path="/" element={<Home />} />
            <Route path="/tickets/:ticketId" element={<ViewTicket />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;