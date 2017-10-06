import { random } from 'lodash';

export const currentUser = () => {
  return {
    user: {
      id: String(random(100, 500)),
      male: true,
      name: "김레클",
      interests: [
        { id: "asdasd1", text: "고혈압" },
        { id: "asdd1", text: "아토피" },
      ],
      diseases: [
        { id: "123asd", text: "근육량" },
      ],
    }
  };
}

export const foodIntakeTracking = (userId) => {
  return {
    foodIntakeTracking: {
      calories: {
        target: 1800,
        current: 687,
      },
      when: {
        breakfast: [
          { 
            id: '123', 
            name: 'Banana', 
            imageUrl: 'http://via.placeholder.com/20x20',
            quantity: 'A truckload (15k kcal)',
            calories: 128,
          },
          { 
            id: '123asd', 
            name: 'Milk', 
            imageUrl: 'http://via.placeholder.com/20x20',
            quantity: 'A truckload (15k kcal)',
            calories: 234,
          },
    
        ],
        lunch: [
          { 
            id: 'qwe', 
            name: 'Pizza', 
            imageUrl: 'http://via.placeholder.com/20x20',
            quantity: 'A truckload (15k kcal)',
            calories: 325,
          },
        ],
        dinner: []
      }
    }
  }
}

export const searchFood = (query) => {
  return {
    matches: [
      { 
        label: 'Pizza',
        value: {
          id: 'qwea',
          imageUrl: 'http://via.placeholder.com/20x20',
          name: 'pizza',
          quantity: 'one slice',
          calories: 325,
        }
      },
      {
        label: 'Pineapple',
        value: {
          id: 'qwea1',
          imageUrl: 'http://via.placeholder.com/20x20',
          name: 'pineapple',
          quantity: 'one slice',
          calories: 112,
        }
      },
      {
        label: 'Chocolate',
        value: {
          id: 'qwe12a',
          imageUrl: 'http://via.placeholder.com/20x20',
          name: 'chocolate',
          quantity: 'one bag',
          calories: 554,
        }
      },
    ]
  }
}

export const foodSuggestions = userId => {
  return {
    foodSuggestions: {
      reason: "이들은 당신의 건강에 아주 좋습니다",
      foods: [
        { 
          id: '123', 
          name: 'Banana', 
          thumbUrl: 'http://via.placeholder.com/200x150',
          quantity: 'A truckload (150 gram)',
          calories: 128,
        },
        { 
          id: '123asd', 
          name: 'Milk', 
          thumbUrl: 'http://via.placeholder.com/200x150',
          quantity: 'A truckload (150 gram)',
          calories: 234,
        },
        { 
          id: '123alqw', 
          name: 'Fried eggs', 
          thumbUrl: 'http://via.placeholder.com/200x150',
          quantity: 'A truckload (150 gram)',
          calories: 128,
        },
        { 
          id: '123qwepo', 
          name: 'Pasta', 
          thumbUrl: 'http://via.placeholder.com/200x150',
          quantity: 'A truckload (150 gram)',
          calories: 654,
        },
        { 
          id: '123masmdq', 
          name: 'Steak', 
          thumbUrl: 'http://via.placeholder.com/200x150',
          quantity: 'A truckload (150 gram)',
          calories: 345,
        },
        { 
          id: '123qweqweo', 
          name: 'Beef noodles', 
          thumbUrl: 'http://via.placeholder.com/200x150',
          quantity: 'A truckload (150 gram)',
          calories: 228,
        },
      ]
    }
  } 
}

export const login = () => {
  return "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6bnVsbCwidXNlcm5hbWUiOiJhZG1pbiIsImVuYWJsZWQiOnRydWUsImV4cGlyZSI6bnVsbCwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifV19.X1fGk2j3zkqEPDAPOScKmFudlO_Z48tHEbVLWlgkIIU";
}

export const checkValidToken = (token) => {
  return true;
}