import { random, times } from 'lodash';
import Food1 from '../../assets/images/mock/food1.jpg';
import Food2 from '../../assets/images/mock/food2.jpg';
import Food3 from '../../assets/images/mock/food3.jpg';
import Food4 from '../../assets/images/mock/food4.jpg';
import Food5 from '../../assets/images/mock/food5.jpg';

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

export const mockFoodSuggestions = {
  reason: "다이어트에 도움이 되는 무기질이 풍부한 식품을 추천해드립니다.",
  foodSuggestions: [
    {
      globalId: "1",
      name: "다논 그릭요거트",
      calories: 150,
      type: null,
      nutrient: null,
      expiryDate: null,
      barcode: null,
      imageUrl: Food1
    },
    {
      globalId: "2",
      name: "두툼한 등심 돈까스",
      calories: 130,
      type: null,
      nutrient: null,
      expiryDate: null,
      barcode: null,
      imageUrl: Food2
    },
    {
      globalId: "3",
      name: "빅스모크햄",
      calories: 204,
      type: null,
      nutrient: null,
      expiryDate: null,
      barcode: null,
      imageUrl: Food3
    },
    {
      globalId: "4",
      name: "시금치 &당근 주키니 스파게티",
      calories: 400,
      type: null,
      nutrient: null,
      expiryDate: null,
      barcode: null,
      imageUrl: Food4
    },
    {
      globalId: "5",
      name: "시금치 베이컨 볶음",
      calories: 500,
      type: null,
      nutrient: null,
      expiryDate: null,
      barcode: null,
      imageUrl: Food5
    }
  ]
}

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

export const foodDetail =
  {
    name: "캔모아딸기 \r\n 아이스크림",
    imageUrl: 'https://i.pinimg.com/originals/46/48/25/4648254906b1203aa8775a7f02f63473.jpg',
    diagnosticMessage: '임산부인 김레클 님에게 좋지 않은 비타민 c 와 비타민 e 가 다량 함유된 제품입니다. 김레클 님에게 추천하지 않습니다.',
    calories: 1200,
    carbohydrates: 340,
    proteins: 102,
    fat: 201,
    alternativeFoods: [
      {
        id: 1,
        name: 'food',
        imageUrl: 'http://data.whicdn.com/images/25342540/original.jpg',
        alternativeReason: '철분과 비타민A 가 함유된\n HACCP 인증 식품인 요거트 그릭을\n 대체식품으로 추천합니다.'
      },
      {
        id: 2,
        name: 'food',
        imageUrl: 'https://halachaaday.files.wordpress.com/2014/12/546566_food_dessert_yummy_sweet_cheris_chocolate_plate_2500x1923_www-gdefon-ru.jpg',
        alternativeReason: '철분과 비타민A 가 함유된\n HACCP 인증 식품인 요거트 그릭을\n 대체식품으로 추천합니다.'
      },
      {
        id: 3,
        name: 'food',
        imageUrl: 'https://happyspeedy.com/sites/default/files/styles/product_display_node_large/public/straw_shortcake_bar.jpg?itok=IRm7bcEb',
        alternativeReason: '철분과 비타민A 가 함유된\n HACCP 인증 식품인 요거트 그릭을\n 대체식품으로 추천합니다.'
      },
      {
        id: 4,
        name: 'food',
        imageUrl: 'https://happyspeedy.com/sites/default/files/styles/product_display_node_large/public/straw_shortcake_bar.jpg?itok=IRm7bcEb',
        alternativeReason: '철분과 비타민A 가 함유된\n HACCP 인증 식품인 요거트 그릭을\n 대체식품으로 추천합니다.'
      },
      {
        id: 5,
        name: 'food',
        imageUrl: 'https://happyspeedy.com/sites/default/files/styles/product_display_node_large/public/straw_shortcake_bar.jpg?itok=IRm7bcEb',
        alternativeReason: '철분과 비타민A 가 함유된\n HACCP 인증 식품인 요거트 그릭을\n 대체식품으로 추천합니다.'
      },
      {
        id: 6,
        name: 'food',
        imageUrl: 'https://happyspeedy.com/sites/default/files/styles/product_display_node_large/public/straw_shortcake_bar.jpg?itok=IRm7bcEb',
        alternativeReason: '철분과 비타민A 가 함유된\n HACCP 인증 식품인 요거트 그릭을\n 대체식품으로 추천합니다.'
      },
      {
        id: 7,
        name: 'food',
        imageUrl: 'https://halachaaday.files.wordpress.com/2014/12/546566_food_dessert_yummy_sweet_cheris_chocolate_plate_2500x1923_www-gdefon-ru.jpg',
        alternativeReason: '철분과 비타민A 가 함유된\n HACCP 인증 식품인 요거트 그릭을\n 대체식품으로 추천합니다.'
      },
      {
        id: 8,
        name: 'food',
        imageUrl: 'https://happyspeedy.com/sites/default/files/styles/product_display_node_large/public/straw_shortcake_bar.jpg?itok=IRm7bcEb',
        alternativeReason: '철분과 비타민A 가 함유된\n HACCP 인증 식품인 요거트 그릭을\n 대체식품으로 추천합니다.'
      },
      {
        id: 9,
        name: 'food',
        imageUrl: 'https://halachaaday.files.wordpress.com/2014/12/546566_food_dessert_yummy_sweet_cheris_chocolate_plate_2500x1923_www-gdefon-ru.jpg',
        alternativeReason: '철분과 비타민A 가 함유된\n HACCP 인증 식품인 요거트 그릭을\n 대체식품으로 추천합니다.'
      },
      {
        id: 10,
        name: 'food',
        imageUrl: 'http://data.whicdn.com/images/25342540/original.jpg',
        alternativeReason: '철분과 비타민A 가 함유된\n HACCP 인증 식품인 요거트 그릭을\n 대체식품으로 추천합니다.'
      }
    ]
  };

export const removeFood = true;