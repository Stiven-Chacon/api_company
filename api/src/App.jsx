import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Nav from './components/Navegation';
import Deparments from './views/Departments/Index';
import EditDeparments from './views/Departments/Edit';
import CreateDeparments from './views/Departments/Create';
import Empleados from './views/Empleados/Index';
import Graphic from './views/Empleados/Graphic';
import Login from './views/Login';
import Register from './views/Register';
import ProtectedRoutes from './components/ProtectedRoutes';



function App() {
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* Colocamos la proteccion de las rutas  */}
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<Deparments />}  />
          <Route path='/CreateDeparments' element={<CreateDeparments />} />
          <Route path='/EditDeparments/:id' element={<EditDeparments />} />
          <Route path='/Empleados' element={<Empleados />} />
          <Route path='/Graphic' element={<Graphic />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App