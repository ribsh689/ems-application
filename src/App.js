import './App.css';
import Home from './Home';
import Form from './Form';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Test from './Test';
import Login from './Login';
import { AuthProvider } from './auth';
import { LandingPage } from './LandingPage';
import { RequireAuth } from './RequireAuth';
import { SessionTimeout } from './SessionTimeout';
function App() {
  const { state } = useLocation();
  // console.log(state);

  return (
    <AuthProvider>

      <Routes>

        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />

        <Route path='/home' element={<SessionTimeout><RequireAuth><Home /></RequireAuth></SessionTimeout>} />

        <Route path='/add' element={<SessionTimeout><RequireAuth><Form /></RequireAuth></SessionTimeout>} />

        <Route path='/edit' element={state ? <SessionTimeout><RequireAuth><Form /></RequireAuth></SessionTimeout> : <Navigate to="/login" />} />


      </Routes>

    </AuthProvider>
  );
}

export default App;
