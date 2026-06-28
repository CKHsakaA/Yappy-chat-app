import { useState } from 'react'
import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import HomePage from '../pages/HomePage.jsx'
import LoginSignupPage from '../pages/LogSignPage.jsx'
import { useEffect } from "react";
import ProfilePage from '../pages/ProfilePage.jsx'

function App() {


  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<LoginSignupPage />} />
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/profile/:id" element={<ProfilePage/>}/>
        </Routes>
      </div>

    </>
  )
}

export default App

