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

const mockIngredientsData = [
  { ingredient: '단백질', current: mockDatapoint(), fullMark: 100, name: '단백질' },
  { ingredient: '나트륨', current: mockDatapoint(), fullMark: 100, name: '나트륨' },
  { ingredient: '칼슘', current: mockDatapoint(), fullMark: 100, name: '칼슘' },
  { ingredient: '식이섬유', current: mockDatapoint(), fullMark: 100, name: '식이섬유' },
  { ingredient: '칼륨', current: mockDatapoint(), fullMark: 100, name: '칼륨' },
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
      protein = 0,
      sodium = 0,
      calcium = 0,
      cellulose = 0,
      potassium = 0,
    } = data.targets;

    return [
      {ingredient: `단백질 (${protein} mg)`, current: data.current.protein, fullMark: 100, name: '단백질'},
      {ingredient: `나트륨 (${sodium} mg)`, current: data.current.sodium, fullMark: 100, name: '나트륨'},
      {ingredient: `칼슘 (${calcium} mg)`, current: data.current.calcium, fullMark: 100, name: '칼슘'},
      {ingredient: `식이섬유 (${cellulose} mg)`, current: data.current.cellulose, fullMark: 100, name: '식이섬유'},
      {ingredient: `칼륨 (${potassium} mg)`, current: data.current.potassium, fullMark: 100, name: '칼륨'},
    ]
  }

  render () {
    const { data } = this.props;
    const formattedData = this.formatData(data);

    return (
      <div className="ingredients-chart">
        <ResponsiveContainer>
          <RadarChart 
            cx={'50%'} 
            cy={'50%'} 
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
  data: selectors.getIngredients(state)
});

export default connect(mapStateToProps)(IngredientsChartContainer);

function mockDatapoint () {
  return Math.floor(Math.random() * 101) + 0;
}
