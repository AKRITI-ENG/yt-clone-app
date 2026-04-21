import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import Search from "./pages/Search";
import Channel from "./pages/Channel";
import LikedVideos from "./pages/LikedVideos";
import History from "./pages/History";

function NotFoundPage() {
  const location = useLocation();

  return (
    <section className="page-shell">
      <div className="page-card">
        <span className="page-eyebrow">Not Found</span>
        <h1 className="page-title">That page is not available</h1>
        <p className="page-copy">
          No route is connected for "{location.pathname}".
        </p>
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <main className="app-content" aria-live="polite">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watch/:id" element={<Watch />} />
            <Route path="/search" element={<Search />} />
            <Route path="/channel/:id" element={<Channel />} />
            <Route path="/liked" element={<LikedVideos />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
