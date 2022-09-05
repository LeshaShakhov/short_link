import React from 'react';
import './App.css';
import {RegistrationPage} from "./pages/RegistrationPage";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage";
import {DashboardPage} from "./pages/DashboardPage";

const App: React.FC<{  }> = () => {
  return (
      <div className="App">
        <div className='content'>
        <BrowserRouter>
          <Routes>
            <Route path='registration' element={<RegistrationPage/>}/>
            <Route path='login' element={<LoginPage/>}/>
            <Route path='dashboard' element={<DashboardPage/>}/>
              <Route path='/' element={<Navigate to="/dashboard" replace/>}/>
          </Routes>
        </BrowserRouter>
        </div>
      </div>
  );
}

export default App;
