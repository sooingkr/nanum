import { homeDuck } from '../home-page/HomeDuck';

export const reducers = {
  [homeDuck.storeName]: homeDuck.reducer,
};