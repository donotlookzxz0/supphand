import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './utils/ProtectedRoute'
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import NotFound from './components/NotFound'

function App() {
  return (
    <Router>
      <Routes>
     
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound/>} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App
