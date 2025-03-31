import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signin from './pages/Signin/index'




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        {}
      </Routes>
    </Router>
  );
}

export default App;