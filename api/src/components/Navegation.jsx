import {Link, useNavigate} from 'react-router-dom';
import storage from '../Storage/Storage';


const Navegation = () => {
  const go = useNavigate();
  const logout = async() =>{
    storage.remove('authToken');
    storage.remove('authUser');
    await axios.get('/api/auth/logout',storage.get('authToken'));
    go('/login');
  }
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-black">
      <div className="container">
        <a className="navbar-brand text-white" >COMPANY</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      {storage.get('authUser') ? (
        <div className='collapse navbar-collapse' id='nav'>
          <ul className='navbar-nav mx-auto mb-2'>
            {/* Nombre Del Usuario Logeado */}
            <li className='nav-item px-lg-5 h4'>
              {storage.get('authUser').name}
            </li>
            {/* Vista Departamentos */}
            <li className='nav-item px-lg-5'>
              <Link to ='/' className='nav-link text-white'>Departamentos</Link>
            </li>
            {/* Vista Empleados */}
            <li className='nav-item px-lg-5'>
              <Link to ='/Empleados' className='nav-link text-white'>Empleados</Link>
            </li>
            {/* Vista Departamentos */}
            <li className='nav-item px-lg-5'>
              <Link to ='/Graphic' className='nav-link text-white'>Grafica</Link>
            </li>
          </ul>
          {/* Cerrar Sesión */}
          <ul className='navbar-nav mx-auto mb-2'>
            <li className='nav-item px-lg-5 text-white'>
              <button className='btn btn.info text-danger' onClick={logout}>Cerrar Sesión</button>
            </li>
          </ul>
        </div>
      ): ''}
    </nav>  )
}

export default Navegation