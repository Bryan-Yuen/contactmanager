import LoginPage from "./components/loginPage/LoginPage";
import DashboardPage from "./components/dashboardPage/DashboardPage";
import RegisterPage from "./components/registerPage/RegisterPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/Register" element={<RegisterPage/>}/>
        <Route path="/Dashboard" element={<DashboardPage />}/>
      </Routes>
    </BrowserRouter>)
}

export default App;
