import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { DashboardPage } from './pages/DashboardPage';
import { DemographicsPage } from './pages/DemographicsPage';
import { VideoLibraryPage } from './pages/VideoLibraryPage';
import { AdLibraryPage } from './pages/AdLibraryPage';
import { videoCatalog } from './stores/videoCatalog';

export default function App() {
  // Initialize video catalog on app load
  useEffect(() => {
    videoCatalog.initialize();
  }, []);

  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/demographics" element={<DemographicsPage />} />
          <Route path="/videos" element={<VideoLibraryPage />} />
          <Route path="/ads" element={<AdLibraryPage />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}