// Central API URL config
const API_BASE =
    import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_BASE_API = API_BASE.replace(/\/$/, '') + '/api';

export { API_BASE, API_BASE_API };