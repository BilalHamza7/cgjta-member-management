import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './auth/Login';
import Dashboard from './pages/dashboard/dashboard';
import MembersHome from './pages/members/MembersHome';
import LevelsDashboard from './pages/levels/LevelsDashboard';
import Settings from './pages/profile/Settings';

import Layout from './pages/Layout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Initial route */}
        <Route path="/" element={<Login />} />

        <Route path='/' element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/members" element={<MembersHome />} />
          <Route path="/levels" element={<LevelsDashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App
