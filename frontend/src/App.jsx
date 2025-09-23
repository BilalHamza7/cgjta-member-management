import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './auth/Login';
import Dashboard from './pages/dashboard/dashboard';
import Layout from './pages/Layout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Initial route */}
        <Route path="/" element={<Login />} />

        <Route path='/' element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App
