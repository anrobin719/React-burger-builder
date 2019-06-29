import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-heavy-burger.firebaseio.com/'
});

export default instance;