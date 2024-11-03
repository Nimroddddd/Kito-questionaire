import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateQuestionnaire from "./pages/CreateQuestionnaire";
import ViewQuestionnaire from "./pages/ViewQuestionnaire";
import PublicQuestionnaire from "./pages/PublicQuestionnaire";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div className="font-['Clash_Display']">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/create-questionnaire"
              element={<CreateQuestionnaire />}
            />
            <Route path="/questionnaire/:id" element={<ViewQuestionnaire />} />
          </Route>
          <Route path="/q/:link" element={<PublicQuestionnaire />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
