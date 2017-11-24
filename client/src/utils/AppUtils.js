import configureStore from '../store/configureStore';
import {toggleModal as toggleModalAction} from '../containers/App/AppDuck';

// app store
export const store = configureStore();

export const toggleModal = modalId => {
  store.dispatch(toggleModalAction(modalId));
};

export function isMobileVersion() {
  const url = window.location.href;
  const re = /mobile/i;
  const found = url.match(re);
  return !!found;
}

export function hasAuthRedirectUrl(response) {
  return /realAuthentication.do/.test(response);
}