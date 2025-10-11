import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CryptoContextProvider from './context/CryptoContextProvider';
import HomePage from './pages/HomePage';
import CoinPage from "./pages/CoinPage";
import CoinInfoPage from './pages/CoinInfoPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {

  return (
    <CryptoContextProvider>
      <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coins/:id" element={<CoinInfoPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
    </CryptoContextProvider>
  )
}

export default App
