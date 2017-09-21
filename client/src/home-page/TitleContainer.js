import {connect} from 'react-redux';
import {homeDuck} from './HomeDuck';
import { TitleView } from '../views/HomeTitleView';

const mapStateToProps = state => {
  const homeState = state[homeDuck.storeName];

  return {
    title: homeState.title
  };

};

export const HomeTitle = connect(mapStateToProps)(TitleView);
