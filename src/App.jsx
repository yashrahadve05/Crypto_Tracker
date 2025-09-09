import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CryptoContextProvider from './context/CryptoContextProvider';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CoinPage from "./pages/CoinPage";
import CoinInfoPage from './pages/CoinInfoPage';

function App() {

  return (
    <CryptoContextProvider>
      <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coins/:id" element={<CoinInfoPage />} />
        </Routes>
      </div>
    </BrowserRouter>
    </CryptoContextProvider>
  )
}

export default App
