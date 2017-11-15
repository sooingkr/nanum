// api
const isProd = (process.env.NODE_ENV === 'production');

console.log("---- is prod:", isProd);
export const API_BASE_PATH = isProd ? '/nanum-api' : 'http://192.168.0.102:8080/nanum-api';

// auth
export const STORAGE_ID = 'user_id';
export const STORAGE_TOKEN = 'Authorization';

// services
export const DEFAULT_PAGE_SIZE = 20;