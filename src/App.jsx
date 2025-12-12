
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import RoleProtectedRoute from './components/RoleProtectedRoute'
import Beranda from './pages/Beranda'
import Daftar from './pages/Daftar'
import Kelas from './pages/Kelas'
import Kontak from './pages/Kontak'
import Langganan from './pages/Langganan'
import Masuk from './pages/Masuk'
import Profil from './pages/Profil'
import Ranking from './pages/Ranking'
import Tentang from './pages/Tentang'
import AdminModeration from './pages/admin/AdminModeration'
import Article from './pages/article/Article'
import ArticleDetail from './pages/article/ArticleDetail'
import CreatorUpload from './pages/creator/CreatorUpload'
import CreatorVideos from './pages/creator/CreatorVideos'
import KelasDetail from './pages/kelas/KelasDetail'
import MapelDetail from './pages/kelas/MapelDetail'
import MateriDetail from './pages/kelas/MateriDetail'
import TopikDetail from './pages/kelas/TopikDetail'
import VideoDetail from './pages/video/VideoDetail'

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

      {/* Creator Routes */}
      <Route path="/creator/upload" element={<RoleProtectedRoute allowedRoles={['creator', 'admin']}><CreatorUpload /></RoleProtectedRoute>} />
      <Route path="/creator/videos" element={<RoleProtectedRoute allowedRoles={['creator', 'admin']}><CreatorVideos /></RoleProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin/moderation" element={<RoleProtectedRoute allowedRoles={['admin']}><AdminModeration /></RoleProtectedRoute>} />

      {/* Public Routes */}
      <Route path="/tentang" element={<Tentang />} />
      <Route path="/kontak" element={<Kontak />} />
    </Routes>
  )
}

export default App
