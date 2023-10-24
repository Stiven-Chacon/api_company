import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import storage from '../Storage/Storage'

//Esta función es para validar que el usuario esta logeado para poder ingresar a las url
 export const ProtectedRoutes = ({ children}) => {
    //valida si el usuario esta logeado
    const authUser = storage.get('authUser');
    if (!authUser) {
        //Si no esta logeado lo envia a login
        return <Navigate to='/login'/>;
    }
    return <Outlet />
}

export default ProtectedRoutes