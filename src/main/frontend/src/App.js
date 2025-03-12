import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";

import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import OAuth2Redirect from "./pages/auth/OAuth2Redirect";

import MyPage from "./pages/user/MyPage";
import Profile from "./pages/user/Profile";
import Password from "./pages/user/Password";

import BoardList from "./pages/board/BoardList";
import CreateBoard from "./pages/board/CreateBoard";
import SaleBoard from "./pages/board/SaleBoard";
import PurchaseBoard from "./pages/board/PurchaseBoard";
import FreeBoard from "./pages/board/FreeBoard";
import BoardDetail from "./pages/board/BoardDetail";
import EditBoard from "./pages/board/EditBoard";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Sidebar />

      <div style={{ display: 'flex', marginTop: '64px', marginLeft: '200px' }}>
        <div style={{ flex: 1, padding: 16 }}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
            
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/profile/edit" element={<Profile />} />
            <Route path="/mypage/password/edit" element={<Password />} />

            <Route path="/board" element={<BoardList />} />
            <Route path="/create-board" element={<CreateBoard />} />
            <Route path="/sale-board" element={<SaleBoard />} />
            <Route path="/purchase-board" element={<PurchaseBoard />} />
            <Route path="/free-board" element={<FreeBoard />} />

            <Route path="/board/:id" element={<BoardDetail />} />
            <Route path="/board/edit/:id" element={<EditBoard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
