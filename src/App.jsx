
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import "./App.css"
import ModelGuide from "./Pages/Info/ModelGuide";
import { Toaster } from "react-hot-toast";
import PrivacyPage from "./Pages/Home/PrivacyPage";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Users from "./Pages/Admin/Users";
import Login from "./Pages/Admin/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Prompts from "./Pages/Admin/Prompts";
import SmallTalkPrompts from "./Pages/Admin/SmallTalkPrompts";
import AdminReview from "./Pages/Admin/AdminReview";
function App() {


  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/model-guide" element={<ModelGuide />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/gpt-instructions" element={<Prompts />} />
          <Route path="/admin/smalltalk-prompt" element={<SmallTalkPrompts />} />
          <Route path="/admin/admin-review" element={<AdminReview />} />

        </Routes>


      </BrowserRouter>
      <div> <Toaster /></div>
    </>
  )
}

export default App
