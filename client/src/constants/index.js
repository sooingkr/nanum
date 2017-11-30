// api
const isProd = (process.env.NODE_ENV === 'production');

export const API_BASE_PATH = isProd ? '/recommendation-api' : 'http://192.168.0.26:8080/recommendation-api'; // server by navcs

// auth
export const STORAGE_ID = 'user_id';
export const STORAGE_TOKEN = 'Authorization';

// services
export const DEFAULT_PAGE_SIZE = 20;

// UI
export const DEFAULT_PAGINATE_SIZE = 20;