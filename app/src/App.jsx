import Login from "./pages/Login"
import Home from "./pages/Home"
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth/login" element={<Login/>} />
      </Routes>
    </Router>
  )
}

export default App
