import { random, times } from 'lodash';
import faker from 'faker';

const MAX_FOOD = 100;

export const searchFood = {
  results: times(MAX_FOOD, () => ({
    id: faker.random.uuid(),
    type: '아이스크림',
    flavor: '캔모아 딸기',
    company: '캔모아',
    imageUrl: "https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
  }))
};

export const suggestFood = {
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
};

export const tracking = {
  diagnostic: {
    type: 'danger',
    message: '김레클 님은 아토피가 있습니다. 단백질 섭취 제한을 추천합니다. 단백질 식사를 줄여주세요.',
  },
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
  },
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
  },
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

export const login = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQwMjg4MDlhNWVlYjk1MzYwMTVlZWI5YWQzYjYwMDAxIiwidXNlcm5hbWUiOiJuZ3V5ZW5hbmh2dS5jc0BnbWFpbC5jb20iLCJlbmFibGVkIjp0cnVlLCJleHBpcmUiOm51bGwsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifV19.UuTiFCFlSnmBhaiKhMunufuR6vm9IO4t1ASdECXnSfg";

export const checkValidToken = true;