import { random } from 'lodash';

export const currentUser = () => {
  return {
    user: {
      id: random(100, 500),
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