import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TagBox from '../../components/Dashboard/TagBox';
import { selectors } from './DashboardDuck';
import MaleIcon from '../../assets/images/icons/male.svg';
import FemaleIcon from '../../assets/images/icons/female.svg';

export class UserInfoContainer extends Component {
  renderNoInfo = () => (
    <div className="user-info__noInfo">
    <Link
      to="/user/setting"
      className="button button--outline"
      >
        내 정보 입력하기
      </Link>
    </div>
  )

  render() {
    const user = this.props.user;
    const { gender, firstName, lastName, diseases, interests } = user;
    const genderIcon = isMale(gender) ? MaleIcon : FemaleIcon;
    const hasNoInfo = !diseases || !interests;
    return (
      <div className="user-info">
        <div className="user-info__heading">
          { (firstName || lastName) &&
            <div className="user-info__name">
              <h2>{lastName}{firstName}</h2>
              <img src={genderIcon} alt={gender} />
            </div>
          }
          <Link 
            to="/user/setting" 
            className="user-info__edit button button--link">Edit
          </Link>
        </div>
        { hasNoInfo &&
          this.renderNoInfo()
        }

        { !hasNoInfo &&
          <div className="user-info__details">
            { 
              diseases.map(disease => (
              <TagBox 
                key={disease.id}
                id={disease.id}
                text={disease.name} 
              />
            ))}
            { 
              interests.map(interest => (
              <TagBox 
                key={interest.id}
                id={interest.id}
                text={interest.name} 
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
    interests: PropTypes.arrayOf(PropTypes.shape({
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