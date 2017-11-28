import { times } from 'lodash';
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

export const mockFoodDetails = {
  name: "캔모아딸기아이스크림",
  imageUrl: "https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
  diagnosticMessage: "임산부인 김레클 님에게 좋지 않은 비타민 c 와 비타민 e 가 다량 함유된 제품입니다. 김레클 님에게 추천하지 않습니다.",
  calories: 1200,
  proteins: 102,
  carbohydrates: 340,
  fat: 201,
  alternativeFoods: [{
    id: "d3b8d7ba-c451-11e7-abc4-cec278b6b50a",
    imageUrl: "http://via.placeholder.com/203x243",
    alternativeReason: "철분과 비타민A 가 함유된 HACCP 인증 식품인 <a href='/recommendation/#/foods/2'>요거트 그릭</a>을 대체식품으로 추천합니다."
  }, {
    id: "28146c5c-c452-11e7-abc4-cec278b6b50a",
    imageUrl: "http://via.placeholder.com/203x243",
    alternativeReason: "철분과 비타민A 가 함유된 HACCP 인증 식품인 <a href='/recommendation/#/foods/2'>요거트 그릭</a>을 대체식품으로 추천합니다."
  }]
}

export const removeFood = true;