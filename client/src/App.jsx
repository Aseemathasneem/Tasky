import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'; 
import AddTask from './components/AddTask';

function App() {
  return (
    <Router>
      <Layout>
      <div>
        
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
          <Route path="/add-task" element={<AddTask />} />
        </Routes>
      </div>
      </Layout>
    </Router>
  );
}

export default App;
