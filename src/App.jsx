
import { Route, Routes } from 'react-router-dom'
import Beranda from './pages/Beranda'
import Kelas from './pages/Kelas'
import Langganan from './pages/Langganan'
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

function App() {
  return (
    <>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Beranda />} />

        {/* Authentication */}
        <Route path="/masuk" element={<Masuk />} />
        <Route path="/daftar" element={<Daftar />} />


        {/* Main menu */}
        <Route path="/kelas" element={<Kelas />} />
        <Route path="/langganan" element={<Langganan />} />
        <Route path="/profil" element={<Profil />} />

        {/* Classes */}
        <Route path="/kelas/:kelasId" element={<KelasDetail />} />
        <Route path="/kelas/:kelasId/:mapelId" element={<MapelDetail />} />
        <Route path="/kelas/:kelasId/:mapelId/:materiId" element={<MateriDetail />} />
        <Route path="/kelas/:kelasId/:mapelId/:materiId/:topikId" element={<TopikDetail />} />
        <Route path="/video/:videoId" element={<VideoDetail />} />


        {/* Others */}
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/kontak" element={<Kontak />} />
      </Routes>
    </>
  )
}

export default App
