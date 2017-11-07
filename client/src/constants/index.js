// api
const isProd = (process.env.NODE_ENV === 'production');

console.log("---- is prod:", isProd);
export const API_BASE_PATH = isProd ? '' : 'http://test.baikal.io:8080';

// auth
export const STORAGE_ID = 'user_id';
export const STORAGE_TOKEN = 'Authorization';