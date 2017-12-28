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
  { ingredient: '탄수화물', percentage: 25, current: mockDatapoint(), fullMark: 100, name: '탄수화물' },
  { ingredient: '단백질', percentage: 40, current: mockDatapoint(), fullMark: 100, name: '단백질' },
  { ingredient: '지방', percentage: 32, current: mockDatapoint(), fullMark: 100, name: '지방' },
  { ingredient: '나트륨', percentage: 28, current: mockDatapoint(), fullMark: 100, name: '나트륨' },
  { ingredient: '콜레스테롤', percentage: 86, current: mockDatapoint(), fullMark: 100, name: '콜레스테롤' },
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
      carbohydrate = 0,
      protein = 0,
      fat = 0,
      sodium = 0,
      cholesterol = 0,
    } = data.targets;

    return [
      {
        ingredient: `탄수화물 (${convertMgToGam(carbohydrate)} g)`,
        percentage: getPercentage(data.current.carbohydrate, carbohydrate),
        current: convertMgToGam(data.current.carbohydrate),
        fullMark: 100,
        name: '탄수화물'
      },
      {
        ingredient: `단백질 (${convertMgToGam(protein)} g)`,
        percentage: getPercentage(data.current.protein, protein),
        current: convertMgToGam(data.current.protein),
        fullMark: 100,
        name: '단백질'
      },
      {
        ingredient: `지방 (${convertMgToGam(fat)} g)`,
        percentage: getPercentage(data.current.fat, fat),
        current: convertMgToGam(data.current.fat),
        fullMark: 100,
        name: '지방'
      },
      {
        ingredient: `나트륨 (${convertMgToGam(sodium)} g)`,
        percentage: getPercentage(data.current.sodium, sodium),
        current: convertMgToGam(data.current.sodium),
        fullMark: 100,
        name: '나트륨'
      },
      {
        ingredient: `콜레스테롤 (${convertMgToGam(cholesterol)} g)`,
        percentage: getPercentage(data.current.cholesterol, cholesterol),
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
              dataKey='percentage'
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

function getPercentage (value, target) {
  if (value > target) {
    value = target;
  }
  return Math.floor((value / target) * 100)
}

function mockDatapoint () {
  return Math.floor(Math.random() * 101) + 0;
}
