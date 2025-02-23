
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import "./App.css"
import ModelGuide from "./Pages/Info/ModelGuide";
import { Toaster } from "react-hot-toast";
import PrivacyPage from "./Pages/Home/PrivacyPage";
function App() {


  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/model-guide" element={<ModelGuide />} />
          <Route path="/privacy" element={<PrivacyPage />} />

        </Routes>


      </BrowserRouter>
      <div> <Toaster /></div>
    </>
  )
}

export default App
