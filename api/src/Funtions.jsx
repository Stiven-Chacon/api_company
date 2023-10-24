import Swal from 'sweetalert2';
import storage from './Storage/Storage';
import axios from 'axios';

export const show_alerta = (msj, icon) => {
    Swal.fire({ title: msj, icon: icon, buttonsStyling: true});
};

export const sendRequest = async(method,params,url,redir='',token=true) => {
    if (token) {
        const authToken = storage.get('authToken');
        axios.defaults.headers.common['Authorization'] = 'Bearer '+authToken;
    }
    let res;
    await axios({ method:method, url:url, data:params}).then(
        response =>{
            res = response.data,
            (method != 'GET') ? show_alerta(response.data.message,'success') :''
            setTimeout( () => 
            (redir !=='') ? window.location.href = redir : '',2000)
        }).catch( (errors)=>{
            let desc = '';
    if (errors.response && errors.response.data && errors.response.data.errors) {
        res = errors.response.data;
        errors.response.data.errors.map((e) => {
            desc = desc + ' ' + e;
        });
    } else {
        desc = 'Error desconocido';
    }
    show_alerta(desc, 'error');
    })
    return res;
}

export const confirmation = async(name,url,redir) => {
    const alert = Swal.mixin({buttonsStyling: true});
    alert
        .fire({
            title: '¿Estás seguro de eliminar el ' + name + '?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '<i class="fa-solid fa-check"></i> Sí, eliminar',
            cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar',
        })
        .then((result) => {
            if (result.isConfirmed) {
                sendRequest('DELETE',{},url,redir);
            }
        });
};

export default show_alerta;