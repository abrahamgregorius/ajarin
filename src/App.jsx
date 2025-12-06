
import { Route, Routes } from 'react-router-dom'
import Beranda from './pages/Beranda'
import Jelajahi from './pages/Jelajahi'
import Langganan from './pages/Langganan'
import Profil from './pages/Profil'
import Masuk from './pages/Masuk'
import Daftar from './pages/Daftar'
import Tentang from './pages/Tentang'
import Kontak from './pages/Kontak'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/beranda" element={<Beranda />} />
        <Route path="/jelajahi" element={<Jelajahi />} />
        <Route path="/langganan" element={<Langganan />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/masuk" element={<Masuk />} />
        <Route path="/daftar" element={<Daftar />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/kontak" element={<Kontak />} />
      </Routes>
    </>
  )
}

export default App
