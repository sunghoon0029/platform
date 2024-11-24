import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import OAuth2Redirect from "./components/OAuth2Redirect";
import MyPage from "./pages/MyPage";
import Profile from "./pages/Profile";
import Password from "./pages/Password";
import Board from "./pages/Board";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Sidebar />

      <div style={{ display: 'flex', marginTop: '64px', marginLeft: '240px' }}>
        <div style={{ flex: 1, padding: 16 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/password-edit" element={<Password />} />
            <Route path="/board" element={<Board />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
