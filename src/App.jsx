
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import "./App.css"
import ModelGuide from "./Pages/Info/ModelGuide";
function App() {


  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/model-guide" element={<ModelGuide />} />
        </Routes>


      </BrowserRouter>

    </>
  )
}

export default App
