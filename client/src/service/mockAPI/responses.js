import { random, times } from 'lodash';

//Create API json

const MAX_FOOD = 20;

function guid() {
  var seed = Date.now();

  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4() + seed;
}

export const searchFood = {
  results: times(MAX_FOOD, () => ({
    foodId: guid(),
    name: '아이스크림 캔모아 딸기',
    manufacturer: '캔모아',
    imageUrl: "https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
  })),
  total: 300,
  hasNextPage: true,
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
  alert: {
    type: 'danger',
    message: '김해섭 님은 아토피가 있습니다. 단백질 섭취 제한을 추천합니다. 단백질 식사를 줄여주세요.',
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

export const foodDetail = {
  foodDetail: [
    {
      imgSrc: 'https://i.pinimg.com/originals/46/48/25/4648254906b1203aa8775a7f02f63473.jpg',
      foodName: '캔모아딸기아이스크림',
      foodKcal: '1200',
      foodInfo: '임산부인 김레클 님에게 좋지 않은 비타민 c 와 비타민 e 가 다량 함유된 제품입니다. 김레클 님에게 추천하지 않습니다.',
      carbonKcal: 95,
      proteinKcal: 90,
      lipidKcal: 5
    }
  ]
}

export const removeFood = true;