import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from './layout/AuthLayout.js';
import { AuthProvider } from './context/AuthContext';
import Login from './paginas/Login.js';
import ConfirmarCuenta from './paginas/ConfirmarCuenta.js';
import OlvidePassword from './paginas/OlvidePassword.js';
import Registrar from './paginas/Registrar.js';
import Mapa from './paginas/Mapa.js';

import AgregarMascota from './paginas/AgregarMascota.js';
import ListarMascotas from './paginas/ListarMascotas';
import ModificarMascota from './paginas/ModificarMascota.js';
import DetallesMascota from './paginas/DetallesMascota.js';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
            <Route path='olvide-password' element={<OlvidePassword />} />
            <Route path="olvide-password/:token" element={<OlvidePassword />} />
            <Route path='registrar' element={<Registrar />} />
            <Route path='mapa' element={<Mapa />} />
            <Route path="agregarMascota" element={<AgregarMascota />} />
            <Route path="listadoMascotas" element={<ListarMascotas />} />
            <Route path="modificarMascota/:id" element={<ModificarMascota />} />
            <Route path="detallesMascota/:id" element={<DetallesMascota />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
