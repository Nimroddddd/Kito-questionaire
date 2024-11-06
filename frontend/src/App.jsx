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
import { Toaster } from "./components/ui/toaster";
import UnauthLayout from "./components/Layout/UnauthLayout";
import ViewAttempt from "./pages/ViewAttempt";

function App() {
  return (
    <BrowserRouter>
      <div className="font-['Clash_Display']">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<UnauthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/create-questionnaire"
              element={<CreateQuestionnaire />}
            />
            <Route path="/questionnaire/:id" element={<ViewQuestionnaire />} />
            <Route path="/questionnaire/:questionID/attempts/:attemptID" element={<ViewAttempt />} />
          </Route>
          <Route path="/q/:link" element={<PublicQuestionnaire />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
