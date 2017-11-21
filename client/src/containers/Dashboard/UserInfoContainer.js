import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import TagBox from '../../components/Dashboard/TagBox';
import { selectors } from './DashboardDuck';
import MaleIcon from '../../assets/images/icons/male.svg';
import FemaleIcon from '../../assets/images/icons/female.svg';

export class UserInfoContainer extends Component {
  renderNoInfo = () => (
    <div className="user-info__noInfo">
      <Link 
      to="/user/edit"
      className="button button--outline"
      >
        내 정보 입력하기
      </Link>
    </div>
  )

  render() {
    const user = this.props.user;

    if (_.isEmpty(user)) {
      return (<div/>);
    }

    const { gender, name, diseases } = user;

    const genderIcon = isMale(gender) ? MaleIcon : FemaleIcon;
    const shouldShowTags = diseases.length > 0;
    return (
        <div className="user-info">
          <div className="user-info__heading">
            <div className="user-info__name">
              <h2>{name} 님 </h2>
              <img src={genderIcon} alt={gender} />
            </div>
            
            <Link to="/user/edit" 
                  className="user-info__edit button button--link">Edit
            </Link>
          </div>
          { !shouldShowTags &&
            this.renderNoInfo()
          }

          { shouldShowTags &&
            <div className="user-info__details">
              { 
                diseases.map(disease => (
                <TagBox 
                  key={disease.id}
                  id={disease.id}
                  text={disease.name} 
                />
              ))}
            </div>
          }
      </div>
    );
  }
}

UserInfoContainer.propTypes = {
  user: PropTypes.shape({
    male: PropTypes.bool,
    name: PropTypes.string,
    diseases: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })),
  }).isRequired,
};

const mapStateToProps = state => ({
  user: selectors.getCurrentUser(state),
});

export default connect(mapStateToProps)(UserInfoContainer);

function isMale(gender) {
  return gender === 'MALE';
}