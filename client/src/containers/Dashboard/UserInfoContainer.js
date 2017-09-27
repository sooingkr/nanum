import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TagBox from '../../components/Dashboard/TagBox';

class UserInfoContainer extends Component {
  onRemove = (id) => {
    // TODO
    console.log(id);
  }

  render() {
    const { male, name, interests, diseases } = this.props.user;
    // This will be replaced by icon url later
    const genderIcon = male ? 'M' : 'Fe';

    return (
      <div className="user-info">
        <div className="user-info__basic">
          <h2>
            {name}
            <img src={genderIcon} alt={male ? 'male' : 'female'} />
          </h2>
        </div>
        <div className="user-info__interests-disease">
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
        <div className="user-info__edit">
          {/* Link to Edit member page will be added later */}
          <Link to="/user/settings">Edit</Link>
        </div>
      </div>
    );
  }
}

UserInfoContainer.propTypes = {
  user: PropTypes.shape({
    male: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    interests: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })).isRequired,
    diseases: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })).isRequired,
  })
}

export default UserInfoContainer;