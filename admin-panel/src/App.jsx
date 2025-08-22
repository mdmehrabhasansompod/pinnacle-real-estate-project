import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import News from "./pages/News";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Contacts from "./pages/Contacts";
import { Routes, Route } from "react-router-dom";
import Newsletter from "./pages/Newsletter";

function App() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-5 bg-gray-100">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/services" element={<Services />} />
          <Route path="/news" element={<News />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/newsletters" element={<Newsletter />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
