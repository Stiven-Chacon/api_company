import React,{useState} from 'react'
import {useNavigate, Link} from 'react-router-dom';
import {sendRequest} from '../Funtions';
import DivInput from '../components/DivInput';
import storage from '../Storage/Storage';

const Login = () => {
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const go = useNavigate();
  const csrf = async()=>{
    await axios.get('/sanctum/csrf-cookie')
  }
  const login = async(e)=>{
    e.preventDefault();
    await csrf();
    const form ={email:email, password:password};
    const res = await sendRequest('POST',form,'/api/auth/login','',false);
    if (res.status == true) {
      //Recibe el token
      storage.set('authToken',res.token);
      //Recibe los datos
      storage.set('authUser',res.data);
      go('/');
    }
  }
  return (
    <div className='container-fluid'>
      <div className='row mt-5'> 
        <div className='col-md-4 offset-md-4'>
          <div className='card border border-dark'>
            <div className='card-header bg-dark border border-dark text-white text-center'>
              Iniciar Sesión
            </div>
            <div className='card-body'>
              <form onSubmit={login}>
                {/* Email */}
                <DivInput type='email' icon='fa-at' value={email} className='form-control' placeholder='ingresa el email'
                          required='required' handleChange={ (e) => setEmail(e.target.value)}/>
               {/* Password */}
               <DivInput type='password' icon='fa-key' value={password} className='form-control' placeholder='ingresa la Contraseña'
                          required='required' handleChange={ (e) => setPassword(e.target.value)}/>
                {/* Boton */}
                <div className='d-grid col-10 mx-auto'>
                  <button className='btn btn-dark'>
                    <i className='fa-solid fa-door-open '></i>  Ingresar
                  </button>
                </div>
              </form>
              <Link to='/register'>
                <i className='fa-solid fa-user-plus'></i> Registrar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login