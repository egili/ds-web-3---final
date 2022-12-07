import axios from "axios";

const API_URL = "http://localhost:5255/api/Home";

const user = JSON.parse(localStorage.getItem('user'));

const getPublicContent = () => {
    return axios.get(API_URL + "anonymous");
};

const getAuthenticatedBoard = async () => {
    return await axios.get(API_URL + "authenticated", {
        headers: {
            Authorization:
                'Bearer ' + user.token
        }
    });
};

const isCurrentUserAdm = () => {
    console.log('user role :::::' + user.role)
    return user.role === 'Cliente' ? false : true;
}

const isCurrentUserCliente = () => {
    console.log('user role :::::' + user.role)
    return user.role !== 'Cliente' ? true : false;
}

const UserService = {
    getPublicContent,
    getAuthenticatedBoard,
    isCurrentUserAdm,
    isCurrentUserCliente
};

export default UserService;