import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './auth/Login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Initial route */}
        <Route path="/" element={<Login />} />

        
      </Routes>
    </Router>
  )
}

export default App
