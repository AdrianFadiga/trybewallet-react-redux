import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/wallet" element={<Wallet />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
