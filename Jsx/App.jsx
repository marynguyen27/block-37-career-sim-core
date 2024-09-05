import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ItemDetails from './components/ItemDetails';
import ReviewList from './components/ReviewList';
import UserSignUp from './components/UserSignUp';
import UserLogin from './components/UserLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/item/:id' element={<ItemDetails />} />
        <Route path='/reviews' element={<ReviewList />} />
        <Route path='/signup' element={<UserSignUp />} />
        <Route path='/login' element={<UserLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
