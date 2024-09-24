import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Adding from "./Adding";
import List from "./List";
import Orders from "./Orders";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency="$"
function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <>
      <Router>
        <div className="bg-gray-50 min-h-screen">
          <ToastContainer></ToastContainer>
          {token === "" ? (
            <Login setToken={setToken}></Login>
          ) : (
            <>
              <Navbar setToken={setToken}></Navbar>
              <hr></hr>
              <div className="flex w-full">
                <Sidebar></Sidebar>
                <div className="w-[70%] m-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base ">
                  <Routes>
                    <Route path="/add" element={<Adding token={token}></Adding>}></Route>
                    <Route path="/list" element={<List token={token}></List>}></Route>
                    <Route path="/orders" element={<Orders token={token}></Orders>}></Route>
                  </Routes>
                </div>
              </div>
            </>
          )}
        </div>

        {/* <Footer></Footer> */}
      </Router>
    </>
  );
}

export default App;
