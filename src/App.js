import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Users from './pages/users';
import SingleUserPage from './pages/userProfileById';
function App() {
  useEffect(()=>{
    document.title='tutorial-4';
  })
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path='/'
            element={<Login />}
          />

          <Route
            path='/profile-listing'
            element={<Users />}
          />

          <Route
            path='/profile-listing/:id'
            element={<SingleUserPage />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
