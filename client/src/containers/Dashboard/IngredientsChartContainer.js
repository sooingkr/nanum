import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { includes } from 'lodash';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Tooltip,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import NoInfo from '../../components/Dashboard/NoInfo';
import { selectors } from './DashboardDuck';
import {convertMgToGam} from '../../utils/AppUtils';

const mockIngredientsData = [
  { ingredient: '탄수화물', current: mockDatapoint(), fullMark: 100, name: '탄수화물' },
  { ingredient: '단백질', current: mockDatapoint(), fullMark: 100, name: '단백질' },
  { ingredient: '지방', current: mockDatapoint(), fullMark: 100, name: '지방' },
  { ingredient: '나트륨', current: mockDatapoint(), fullMark: 100, name: '나트륨' },
  { ingredient: '콜레스테롤', current: mockDatapoint(), fullMark: 100, name: '콜레스테롤' },
]

const CustomTooltip = (props) => {
  const { active, payload } = props;
  if (active) {
    return (
      <div className="ingredients-chart-tooltip">
        <span className="ingredients-chart-tooltip__name">{payload[0].payload.name}</span>
        <span className="ingredients-chart-tooltip__value">{payload[0].payload.current}</span>
      </div>
    );
  }

  return null;
}

class IngredientsChartContainer extends Component {
  formatData(data) {
    if (includes(Object.values(data.targets), undefined)) {
      return mockIngredientsData;
    }

    const {
      // protein = 0,
      // sodium = 0,
      // calcium = 0,
      // cellulose = 0,
      // potassium = 0,
      carbohydrate = 0,
      protein = 0,
      fat = 0,
      sodium = 0,
      cholesterol = 0,
    } = data.targets;

    return [
      {
        // ingredient: `단백질 (${convertMgToGam(protein)} g)`,
        // current: convertMgToGam(data.current.protein),
        // fullMark: 100,
        // name: '단백질'
        ingredient: `탄수화물 (${convertMgToGam(carbohydrate)} g)`,
        current: convertMgToGam(data.current.carbohydrate),
        fullMark: 100,
        name: '탄수화물'
      },
      {
        // ingredient: `나트륨 (${convertMgToGam(sodium)} g)`,
        // current: convertMgToGam(data.current.sodium),
        // fullMark: 100,
        // name: '나트륨'
        ingredient: `단백질 (${convertMgToGam(protein)} g)`,
        current: convertMgToGam(data.current.protein),
        fullMark: 100,
        name: '단백질'
      },
      {
        // ingredient: `칼슘 (${convertMgToGam(calcium)} g)`,
        // current: convertMgToGam(data.current.calcium),
        // fullMark: 100,
        // name: '칼슘'
        ingredient: `지방 (${convertMgToGam(fat)} g)`,
        current: convertMgToGam(data.current.fat),
        fullMark: 100,
        name: '지방'
      },
      {
        // ingredient: `탄수화물 (${convertMgToGam(cellulose)} g)`,
        // current: convertMgToGam(data.current.cellulose),
        // fullMark: 100,
        // name: '탄수화물'
        ingredient: `나트륨 (${convertMgToGam(sodium)} g)`,
        current: convertMgToGam(data.current.sodium),
        fullMark: 100,
        name: '나트륨'
      },
      {
        // ingredient: `칼륨 (${convertMgToGam(potassium)} g)`,
        // current: convertMgToGam(data.current.potassium),
        // fullMark: 100,
        // name: '칼륨'
        ingredient: `콜레스테롤 (${convertMgToGam(cholesterol)} g)`,
        current: convertMgToGam(data.current.cholesterol),
        fullMark: 100,
        name: '콜레스테롤'
      },
    ]
  }

  render () {
    const { data, sourceCalories } = this.props;
    const formattedData = this.formatData(data);

    return (
      <div className="ingredients-chart">
        <span className="title">일일 권장섭취량</span>
        <ResponsiveContainer>
          <RadarChart
            outerRadius={120}
            data={formattedData}
            startAngle={(360 + 90)}
            endAngle={(0 + 90)}
          >
            <PolarGrid gridType='circle' />
            <PolarAngleAxis
              dataKey='ingredient'
              axisLineType='circle'
              radius={90}
              floodColor='#00c03c'
            />
            <Tooltip content={<CustomTooltip external={formattedData} />}/>
            <Radar
              name='Nutrient'
              dataKey='current'
              stroke='#00c03c'
              fill='#00c03c'
              fillOpacity={0.6}
              dot={true}
              isAnimationActive={false}
            />
          </RadarChart>
        </ResponsiveContainer>
        <span className="source">{sourceCalories}</span>
      </div>
    );
  }
}

IngredientsChartContainer.propTypes = {
  data: PropTypes.object
}

const noInfoCondition = (props) => {
  return includes(Object.values(props.data.targets, undefined));
}

IngredientsChartContainer = NoInfo(
  noInfoCondition,
  null,
  '정보를 입력하시면 오늘의 식품을 추천받으실 수 있습니다',
  '/user/setting',
)(IngredientsChartContainer);

const mapStateToProps = (state) => ({
  data: selectors.getIngredients(state),
  sourceCalories: selectors.getSourceCalories(state),
});

export default connect(mapStateToProps)(IngredientsChartContainer);

function mockDatapoint () {
  return Math.floor(Math.random() * 101) + 0;
}
