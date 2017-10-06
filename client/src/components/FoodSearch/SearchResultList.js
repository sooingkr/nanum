// import React, { Component } from "react";
// // import PropTypes from 'prop-types';
// import _ from 'lodash';
//
// import FoodImageLink from "../FoodImageLink/FoodImageLink";
//
// class SearchResultList extends Component {
//
//   render() {
//     const foods = [
//       {
//         id: '1',
//         name: 'Food 1',
//         src: '../images/images.jpg'
//       },
//       {
//         id: '2',
//         name: 'Food 2',
//         src: '../images/images.jpg'
//       },
//       {
//         id: '3',
//         name: 'Food 3',
//         src: '../images/images.jpg'
//       },
//       {
//         id: '4',
//         name: 'Food 4',
//         src: '../images/images.jpg'
//       },
//       {
//         id: '5',
//         name: 'Food 5',
//         src: '../images/images.jpg'
//       },
//       {
//         id: '6',
//         name: 'Food 6',
//         src: '../images/images.jpg'
//       },
//       {
//         id: '7',
//         name: 'Food 7',
//         src: '../images/images.jpg'
//       }
//     ];
//     return(
//       <div className="search-food-list">
//         {
//           _.isArray(foods) && foods.map((food, i) => (
//             <div className="image-link-outer" key={i}>
//               <FoodImageLink foodData={ food }/>
//             </div>
//           ))
//         }
//       </div>
//     );
//   }
// }
// // SearchResultList.propTypes = {
// //   foods: PropTypes.array.isRequired
// // }
// export default SearchResultList;