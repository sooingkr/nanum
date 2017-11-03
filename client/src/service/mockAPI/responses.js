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
      id: guid(),
      type: '아이스크림',
      flavor: '캔모아 딸기',
      company: '캔모아',
      imageUrl: "https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
    })
  ),
  total: 300,
  hasNextPage:
    true,
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

export const foodDetail = [
  {
    id: 1,
    imgSrc: 'https://i.pinimg.com/originals/46/48/25/4648254906b1203aa8775a7f02f63473.jpg',
    foodName: '캔모아딸기아이스크림',
    foodKcal: '1200',
    foodInfo: '임산부인 김레클 님에게 좋지 않은 비타민 c 와 비타민 e 가 다량 함유된 제품입니다. 김레클 님에게 추천하지 않습니다.',
    carbonKcal: 95,
    proteinKcal: 90,
    lipidKcal: 5,
    type: "desert"
  },
  {
    id: 2,
    imgSrc: 'https://i.pinimg.com/originals/46/48/25/4648254906b1203aa8775a7f02f63473.jpg',
    foodName: '캔모아딸기아이스크림',
    foodKcal: '1200',
    foodInfo: '임산부인 김레클 님에게 좋지 않은 비타민 c 와 비타민 e 가 다량 함유된 제품입니다. 김레클 님에게 추천하지 않습니다.',
    carbonKcal: 70,
    proteinKcal: 60,
    lipidKcal: 20,
    type: "breakfast"

  },
  {
    id: 3,
    imgSrc: 'https://i.pinimg.com/originals/46/48/25/4648254906b1203aa8775a7f02f63473.jpg',
    foodName: '캔모아딸기아이스크림',
    foodKcal: '1200',
    foodInfo: '임산부인 김레클 님에게 좋지 않은 비타민 c 와 비타민 e 가 다량 함유된 제품입니다. 김레클 님에게 추천하지 않습니다.',
    carbonKcal: 70,
    proteinKcal: 60,
    lipidKcal: 20,
    type: "lunch"

  },
  {
    id: 4,
    imgSrc: 'https://i.pinimg.com/originals/46/48/25/4648254906b1203aa8775a7f02f63473.jpg',
    foodName: '캔모아딸기아이스크림',
    foodKcal: '1200',
    foodInfo: '임산부인 김레클 님에게 좋지 않은 비타민 c 와 비타민 e 가 다량 함유된 제품입니다. 김레클 님에게 추천하지 않습니다.',
    carbonKcal: 70,
    proteinKcal: 60,
    lipidKcal: 20,
    type: "desert"

  },
  {
    id: 5,
    imgSrc: 'https://i.pinimg.com/originals/46/48/25/4648254906b1203aa8775a7f02f63473.jpg',
    foodName: '캔모아딸기아이스크림',
    foodKcal: '1200',
    foodInfo: '임산부인 김레클 님에게 좋지 않은 비타민 c 와 비타민 e 가 다량 함유된 제품입니다. 김레클 님에게 추천하지 않습니다.',
    carbonKcal: 70,
    proteinKcal: 60,
    lipidKcal: 20,
    type: "breakfast"

  },
  {
    id: 6,
    imgSrc: 'https://i.pinimg.com/originals/46/48/25/4648254906b1203aa8775a7f02f63473.jpg',
    foodName: '캔모아딸기아이스크림',
    foodKcal: '1200',
    foodInfo: '임산부인 김레클 님에게 좋지 않은 비타민 c 와 비타민 e 가 다량 함유된 제품입니다. 김레클 님에게 추천하지 않습니다.',
    carbonKcal: 70,
    proteinKcal: 60,
    lipidKcal: 20,
    type: "lunch"

  },
  {
    id: 7,
    imgSrc: 'https://i.pinimg.com/originals/46/48/25/4648254906b1203aa8775a7f02f63473.jpg',
    foodName: '캔모아딸기아이스크림',
    foodKcal: '1200',
    foodInfo: '임산부인 김레클 님에게 좋지 않은 비타민 c 와 비타민 e 가 다량 함유된 제품입니다. 김레클 님에게 추천하지 않습니다.',
    carbonKcal: 70,
    proteinKcal: 60,
    lipidKcal: 20,
    type: "lunch"
  },
];

export const alternativeFoodDetails = [
  {
    users: [
      {
        id: 1,
        alternativeFoods: [
          {
            "id": "4439b754-dbb8-47b2-b008-55f238082071",
            "name": "Test food 5",
            "type": "breakfast",
            "nutrient": "'철분과 비타민A 가 함유된\n' + 'HACCP 인증 식품인 요거트 그릭을\n' + '대체식품으로 추천합니다.'",
            "globalId": "globalId 5",
            "images": [
              {
                "image": "image 5",
                "url": 'https://static-communitytable.parade.com/wp-content/uploads/2016/07/Crescent-Bacon-Breakfast-Ring.jpg'
              }
            ]
          },
          {
            "id": "4439b754-dbb8-47b2-b008-55f238082071",
            "name": "Test food 5",
            "type": "desert",
            "nutrient": "'철분과 비타민A 가 함유된\n' + 'HACCP 인증 식품인 요거트 그릭을\n' + '대체식품으로 추천합니다.'",
            "globalId": "globalId 5",
            "images": [
              {
                "image": "image 5",
                "url": 'https://halachaaday.files.wordpress.com/2014/12/546566_food_dessert_yummy_sweet_cheris_chocolate_plate_2500x1923_www-gdefon-ru.jpg'
              }
            ]
          },
          {
            "id": "4439b754-dbb8-47b2-b008-55f238082071",
            "name": "Test food 5",
            "type": "desert",
            "nutrient": "'철분과 비타민A 가 함유된\n' + 'HACCP 인증 식품인 요거트 그릭을\n' + '대체식품으로 추천합니다.'",
            "globalId": "globalId 5",
            "images": [
              {
                "image": "image 5",
                "url": 'https://happyspeedy.com/sites/default/files/styles/product_display_node_large/public/straw_shortcake_bar.jpg?itok=IRm7bcEb'
              }
            ]
          },
          {
            "id": "4439b754-dbb8-47b2-b008-55f238082071",
            "name": "Test food 5",
            "type": "desert",
            "nutrient": "'철분과 비타민A 가 함유된\n' + 'HACCP 인증 식품인 요거트 그릭을\n' + '대체식품으로 추천합니다.'",
            "globalId": "globalId 5",
            "images": [
              {
                "image": "image 5",
                "url": 'https://happyspeedy.com/sites/default/files/styles/product_display_node_large/public/straw_shortcake_bar.jpg?itok=IRm7bcEb'
              }
            ]
          },
          {
            "id": "4439b754-dbb8-47b2-b008-55f238082071",
            "name": "Test food 5",
            "type": "desert",
            "nutrient": "'철분과 비타민A 가 함유된\n' + 'HACCP 인증 식품인 요거트 그릭을\n' + '대체식품으로 추천합니다.'",
            "globalId": "globalId 5",
            "images": [
              {
                "image": "image 5",
                "url": 'https://happyspeedy.com/sites/default/files/styles/product_display_node_large/public/straw_shortcake_bar.jpg?itok=IRm7bcEb'
              }
            ]
          },
          {
            "id": "4439b754-dbb8-47b2-b008-55f238082071",
            "name": "Test food 5",
            "type": "lunch",
            "nutrient": "'철분과 비타민A 가 함유된\n' + 'HACCP 인증 식품인 요거트 그릭을\n' + '대체식품으로 추천합니다.'",
            "globalId": "globalId 5",
            "images": [
              {
                "image": "image 5",
                "url": 'https://www.google.com.vn/search?q=lunch&tbm=isch&tbs=rimg:CSPqeSJBDpxtIjhO1v0F_1XjKffzPhLeBhCycTYn-RetgCSJ7J9w61Y3gxsPUjRZS7ThhmrjVlpaLHoT_1AGaCWOZZZSoSCU7W_1QX9eMp9EXqTXqfODyRwKhIJ_1M-Et4GELJwRqd-3JMbhyLkqEglNif5F62AJIhGSi_1eXy_11WJCoSCXsn3DrVjeDGEV2tb98_1HtZbKhIJw9SNFlLtOGERUfyix70htvEqEgmauNWWlosehBGfr6ebSMpiOSoSCf8AZoJY5lllEWAxjUfEudYn&tbo=u&sa=X&ved=0ahUKEwjrm9Pg_qHXAhXFjpQKHYdFD40Q9C8IHw&biw=1440&bih=826&dpr=2#imgrc=eCkXcwz5p5_FPM:'
              }
            ]
          },
          {
            "id": "4439b754-dbb8-47b2-b008-55f238082071",
            "name": "Test food 5",
            "type": "lunch",
            "nutrient": "'철분과 비타민A 가 함유된\n' + 'HACCP 인증 식품인 요거트 그릭을\n' + '대체식품으로 추천합니다.'",
            "globalId": "globalId 5",
            "images": [
              {
                "image": "image 5",
                "url": 'https://static.pexels.com/photos/14737/pexels-photo.jpg'
              }
            ]
          },
          {
            "id": "4439b754-dbb8-47b2-b008-55f238082071",
            "name": "Test food 5",
            "type": "breakfast",
            "nutrient": "'철분과 비타민A 가 함유된\n' + 'HACCP 인증 식품인 요거트 그릭을\n' + '대체식품으로 추천합니다.'",
            "globalId": "globalId 5",
            "images": [
              {
                "image": "image 5",
                "url": 'https://www.casarealhotel.com.mo/wp-content/uploads/2017/03/buffet-breakfast-img2.jpg'
              }
            ]
          }
        ]
      },

      {
        id: 2,
        alternativeFoods: [
          {
            "id": "4439b754-dbb8-47b2-b008-55f238082071",
            "name": "Test food 5",
            "type": "breakfast",
            "nutrient": "'철분과 비타민A 가 함유된\n' + 'HACCP 인증 식품인 요거트 그릭을\n' + '대체식품으로 추천합니다.'",
            "globalId": "globalId 5",
            "images": [
              {
                "image": "image 5",
                "url": 'https://static-communitytable.parade.com/wp-content/uploads/2016/07/Crescent-Bacon-Breakfast-Ring.jpg'
              }
            ]
          },
          {
            "id": "4439b754-dbb8-47b2-b008-55f238082071",
            "name": "Test food 5",
            "type": "desert",
            "nutrient": "'철분과 비타민A 가 함유된\n' + 'HACCP 인증 식품인 요거트 그릭을\n' + '대체식품으로 추천합니다.'",
            "globalId": "globalId 5",
            "images": [
              {
                "image": "image 5",
                "url": 'https://halachaaday.files.wordpress.com/2014/12/546566_food_dessert_yummy_sweet_cheris_chocolate_plate_2500x1923_www-gdefon-ru.jpg'
              }
            ]
          },
          {
            "id": "4439b754-dbb8-47b2-b008-55f238082071",
            "name": "Test food 5",
            "type": "desert",
            "nutrient": "'철분과 비타민A 가 함유된\n' + 'HACCP 인증 식품인 요거트 그릭을\n' + '대체식품으로 추천합니다.'",
            "globalId": "globalId 5",
            "images": [
              {
                "image": "image 5",
                "url": 'https://happyspeedy.com/sites/default/files/styles/product_display_node_large/public/straw_shortcake_bar.jpg?itok=IRm7bcEb'
              }
            ]
          },
          {
            "id": "4439b754-dbb8-47b2-b008-55f238082071",
            "name": "Test food 5",
            "type": "lunch",
            "nutrient": "'철분과 비타민A 가 함유된\n' + 'HACCP 인증 식품인 요거트 그릭을\n' + '대체식품으로 추천합니다.'",
            "globalId": "globalId 5",
            "images": [
              {
                "image": "image 5",
                "url": 'https://happyspeedy.com/sites/default/files/styles/product_display_node_large/public/straw_shortcake_bar.jpg?itok=IRm7bcEb'
              }
            ]
          }
        ]
      }
    ]
  }
]