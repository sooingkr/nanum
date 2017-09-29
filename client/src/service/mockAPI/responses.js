import { random } from 'lodash';

export const currentUser = () => {
  return {
    user: {
      id: random(100, 500),
      male: true,
      name: "김레클",
      interests: [
        { id: "asdasd1", text: "soccer" },
        { id: "asdd1", text: "Scala" },
        { id: "asdd1asd", text: "penny" },
      ],
      diseases: [
        { id: "123asd", text: "suck shti" },
        { id: "123as2d", text: "psycho" },
        { id: "123asggd", text: "obese" },
      ],
    }
  };
}

export const foodIntakeTracking = (userId) => {
  return {
    foodIntakeTracking: {
      calories: {
        target: 1800,
        current: 1560,
      },
      when: {
        breakfast: [
          { 
            id: '123', 
            name: 'Banana', 
            imageUrl: 'http://via.placeholder.com/20x20',
            quantity: 'A truckload (15k kcal)',
          },
          { 
            id: '123asd', 
            name: 'Milk', 
            imageUrl: 'http://via.placeholder.com/20x20',
            quantity: 'A truckload (15k kcal)',
          },
    
        ],
        lunch: [
          { 
            id: 'qwe', 
            name: 'Pizza', 
            imageUrl: 'http://via.placeholder.com/20x20',
            quantity: 'A truckload (15k kcal)',
          },
        ],
        dinner: []
      }
    }
  }
}