
import { Route, Routes } from 'react-router-dom'
import Beranda from './pages/Beranda'
import Kelas from './pages/Kelas'
import Langganan from './pages/Langganan'
import Ranking from './pages/Ranking'
import Profil from './pages/Profil'
import Masuk from './pages/Masuk'
import Daftar from './pages/Daftar'
import Tentang from './pages/Tentang'
import Kontak from './pages/Kontak'
import KelasDetail from './pages/kelas/KelasDetail'
import MapelDetail from './pages/kelas/MapelDetail'
import MateriDetail from './pages/kelas/MateriDetail'
import TopikDetail from './pages/kelas/TopikDetail'
import VideoDetail from './pages/video/VideoDetail'
import Article from './pages/article/Article'
import ArticleDetail from './pages/article/ArticleDetail'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/masuk" element={<Masuk />} />
      <Route path="/daftar" element={<Daftar />} />

      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute><Beranda /></ProtectedRoute>} />
      <Route path="/kelas" element={<ProtectedRoute><Kelas /></ProtectedRoute>} />
      <Route path="/shop" element={<ProtectedRoute><Langganan /></ProtectedRoute>} />
      <Route path="/ranking" element={<ProtectedRoute><Ranking /></ProtectedRoute>} />
      <Route path="/profil" element={<ProtectedRoute><Profil /></ProtectedRoute>} />
      <Route path="/kelas/:kelasId" element={<ProtectedRoute><KelasDetail /></ProtectedRoute>} />
      <Route path="/kelas/:kelasId/:mapelId" element={<ProtectedRoute><MapelDetail /></ProtectedRoute>} />
      <Route path="/kelas/:kelasId/:mapelId/:materiId" element={<ProtectedRoute><MateriDetail /></ProtectedRoute>} />
      <Route path="/kelas/:kelasId/:mapelId/:materiId/:topikId" element={<ProtectedRoute><TopikDetail /></ProtectedRoute>} />
      <Route path="/video/:videoId" element={<ProtectedRoute><VideoDetail /></ProtectedRoute>} />
      <Route path="/articles/" element={<ProtectedRoute><Article /></ProtectedRoute>} />
      <Route path="/articles/:articleId" element={<ProtectedRoute><ArticleDetail /></ProtectedRoute>} />

      {/* Public Routes */}
      <Route path="/tentang" element={<Tentang />} />
      <Route path="/kontak" element={<Kontak />} />
    </Routes>
  )
}

export default App
