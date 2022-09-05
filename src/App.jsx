import ListFrame from "./components/ListFrames";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SharedLayout from "./components/SharedLayout";
import Streaming from "./components/Streaming";
import About from "./pages/About";
import { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Preferences from "./components/Preferences/Preferences";
import Login from "./components/Login/Login";
import useToken from "./useToken";
import Estadistica from "./components/Estadistica";

function setToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

function App() {
  const { token, setToken } = useToken();
  const [urlStreaming, setUrlStreaming] = useState("");
  const [urlBaseRtsp, setUrlBaseRtsp] = useState("");
  const [show, setShow] = useState(false);
  const [typeVideo, setTypeVideo] = useState("");

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="container mx-auto mt-5">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="videos" element={<ListFrame />} />
            <Route
              path="streaming"
              element={
                <Streaming
                  urlStreaming={urlStreaming}
                  setUrlStreaming={setUrlStreaming}
                  show={show}
                  setShow={setShow}
                  typeVideo={typeVideo}
                  setTypeVideo={setTypeVideo}
                  setUrlBaseRtsp={setUrlBaseRtsp}
                />
              }
            />
            <Route
              path="estadisticas"
              element={<Estadistica typeVideo={typeVideo} />}
            />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
