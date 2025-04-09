import axios from 'axios';

axios.defaults.baseURL = window.location.origin + '/';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.axios = axios;
