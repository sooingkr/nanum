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
  onRemove = (id) => {
    // TODO
    console.log(id);
  };

  render() {
    const user = this.props.user;

    if (_.isEmpty(user)) {
      return (<div/>);
    }

    const { male, name, interests, diseases } = user;

    // This will be replaced by icon url later
    const genderIcon = male ? MaleIcon : FemaleIcon;

    return (
      <div className="user-info">
        <div className="user-info__heading">
          <div className="user-info__name">
            <h2>{name} 님 </h2>
            <img src={genderIcon} alt={male ? 'male' : 'female'} />
          </div>
          
          <div className="user-info__edit">
            {/* Link to Edit member page will be added later */}
            <Link to="/user/settings">Edit</Link>
          </div>
        </div>
        <div className="user-info__details">
          { interests.map(interest => (
            <TagBox 
              key={interest.id} 
              id={interest.id}
              text={interest.text} 
              onRemove={this.onRemove}
            />
          ))}
          { diseases.map(disease => (
            <TagBox 
              key={disease.id}
              id={disease.id}
              text={disease.text} 
              onRemove={this.onRemove}
            />
          ))}
        </div>
      </div>
    );
  }
}

UserInfoContainer.propTypes = {
  user: PropTypes.shape({
    male: PropTypes.bool,
    name: PropTypes.string,
    interests: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
    })),
    diseases: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
    })),
  }).isRequired,
};

const mapStateToProps = state => ({
  user: selectors.getCurrentUser(state),
});

export default connect(mapStateToProps)(UserInfoContainer);