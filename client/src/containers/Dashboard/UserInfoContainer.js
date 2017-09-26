import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TagBox from '../../components/Dashboard/TagBox';

const mockUserInfo = {
  male: true,
  name: "David Coffee",
  interests: [
    { id: "asdasd1", text: "soccer" },
    { id: "asdd1", text: "Scala" },
    { id: "asdd1asd", text: "penny" },
  ],
  diseases: [
    { id: "123asd", text: "suck shti" },
    { id: "123as2d", text: "psycho" },
    { id: "123asggd", text: "obese" },
  ]
};

class UserInfoContainer extends Component {
  onRemove = (id) => {
    // TODO
    console.log(id);
  }

  render() {
    // This will be replaced by icon url later
    const genderIcon = mockUserInfo.male ? 'M' : 'Fe';

    return (
      <div className="user-info">
        <div className="user-info__basic">
          <h2>
            {mockUserInfo.name}
            <img src={genderIcon} alt={mockUserInfo.male ? 'male' : 'female'} />
          </h2>
        </div>
        <div className="user-info__interests-disease">
          { mockUserInfo.interests.map(interest => (
            <TagBox 
              key={interest.id} 
              id={interest.id}
              text={interest.text} 
              onRemove={this.onRemove}
            />
          ))}
          { mockUserInfo.diseases.map(disease => (
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
          <Link to="/">Edit</Link>
        </div>
      </div>
    );
  }
}

// Uncomment this after connect to the Redux store
// UserInfoContainer.propTypes = {
//   user: PropTypes.objectOf(PropTypes.shape({
//     male: PropTypes.bool.isRequired,
//     name: PropTypes.string.isRequired,
//     interests: PropTypes.arrayOf(PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       text: PropTypes.string.isRequired,
//     })).isRequired,
//     diseases: PropTypes.arrayOf(PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       text: PropTypes.string.isRequired,
//     })).isRequired,
//   }))
// }

export default UserInfoContainer;