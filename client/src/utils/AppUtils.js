import configureStore from '../store/configureStore';
import {toggleModal as toggleModalAction} from '../containers/App/AppDuck';
import AverageNutrients from '../assets/average-nutrients.json';

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

export function makeNoInfoLink(hasUserInfo, status) {
  let result = { link: '', isExternal: false };
  if (status === 200 && !hasUserInfo) {
    result.link = '/realAuthentication.do';
    result.isExternal = true;
    if(isMobileVersion()) {
      result.link = '/mobile' + result.link;
    }
  } else {
    result.link = '/user/setting';
  }
  return result;
}

export function hasAuthRedirectUrl(response) {
  return /realAuthentication.do/.test(response);
}

export function averageNutrients(categoryCode) {
  return AverageNutrients[categoryCode];
}

export function convertMgToGam(value) {
  return Number.parseFloat((value / 1000).toFixed(1));
}