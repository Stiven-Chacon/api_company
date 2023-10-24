import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {sendRequest} from '../Funtions';
import axios from 'axios';
import DivInput from '../components/DivInput';

const Register = () => {
  const[name, setName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const go = useNavigate();
    // Configurar el token CSRF
  const csrf = async()=>{
    await axios.get('/sanctum/csrf-cookie')
  }
  const register = async(e)=>{
    e.preventDefault();
    await csrf();
    const form ={name:name,email:email, password:password};
    const res = await sendRequest('POST',form,'/api/auth/register','',false);
    if (res && res.status === true) {
      go('/login');
  }
  }

  return (
    <div className='container-fluid'>
      <div className='row mt-5'> 
        <div className='col-md-4 offset-md-4'>
          <div className='card border border-dark'>
            <div className='card-header bg-dark border border-dark text-white text-center'>
              Registro
            </div>
            <div className='card-body'>
              <form onSubmit={register}>
                {/* name */}
                <DivInput type='text' icon='fa-user' value={name} className='form-control' placeholder='ingresa el nombre'
                          required='required' handleChange={ (e) => setName(e.target.value)}/>
                {/* Email */}
                <DivInput type='email' icon='fa-at' value={email} className='form-control' placeholder='ingresa el email'
                          required='required' handleChange={ (e) => setEmail(e.target.value)}/>
               {/* Password */}
               <DivInput type='password' icon='fa-key' value={password} className='form-control' placeholder='ingresa la Contraseña'
                          required='required' handleChange={ (e) => setPassword(e.target.value)}/>
                {/* Boton */}
                <div className='d-grid col-10 mx-auto'>
                  <button className='btn btn-dark'>
                    <i className='fa-solid fa-door-open '></i>  Registrarme
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
