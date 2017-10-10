import {  STORAGE_ID, STORAGE_TOKEN } from '../constants';

export function saveAuth(id, token) {
  if (typeof window !== 'undefined') {
    const { localStorage } = window;
    if (id && token) {
      localStorage.setItem(STORAGE_ID, id);
      localStorage.setItem(STORAGE_TOKEN, token);
    }
  }
}

export function clearStorage() {
  if (typeof window !== 'undefined') {
    const { localStorage } = window;
    localStorage.removeItem(STORAGE_ID);
    localStorage.removeItem(STORAGE_TOKEN);
  }
}

export function getAuth() {
  if (typeof window !== 'undefined') {
    const { localStorage } = window;
    let id = localStorage.getItem(STORAGE_ID);
    id = (typeof id === 'string') ? id : null;

    let token = localStorage.getItem(STORAGE_TOKEN);

    if(id && token) {
      return { id, token };
    } else {
      return null;
    }
  }    
}