import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/loginPage";
import SignupPage from "../pages/signupPage";
import HomePage from "../pages/homePage";
import AddTask from "../pages/addTask";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/addTask" element={<AddTask />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
