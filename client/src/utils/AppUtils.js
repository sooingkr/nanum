import configureStore from '../store/configureStore';
import {toggleModal as toggleModalAction} from '../containers/App/AppDuck';

// app store
export const store = configureStore();

export const toggleModal = modalId => {
  store.dispatch(toggleModalAction(modalId));
};