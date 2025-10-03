import { useState } from 'react'
import './App.css'
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {

  return (
    <>
      <div className="font-sans text-gray-800 bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen">
        <Header/>
        <Main/>
        <Footer/> 
      </div>
    </>
  )
}

export default App
