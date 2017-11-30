import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
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
  { ingredient: '탄수화물', current: mockDatapoint(), fullMark: 100 },
  { ingredient: '단백질', current: mockDatapoint(), fullMark: 100 },
  { ingredient: '무기질', current: mockDatapoint(), fullMark: 100 },
  { ingredient: '비타민', current: mockDatapoint(), fullMark: 100 },
  { ingredient: '지방', current: mockDatapoint(), fullMark: 100 },
]

class IngredientsChartContainer extends Component {
  render () {
    const data = this.props.data;
    return (
      <div className="ingredients-chart">
        <ResponsiveContainer>
          <RadarChart 
            cx={300} 
            cy={250} 
            outerRadius={100} 
            data={data} 
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
            <Tooltip />
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
  data: PropTypes.arrayOf(PropTypes.object)
}

const noInfoCondition = (props) => {
  return !props.data || isEmpty(props.data)
}

IngredientsChartContainer = NoInfo(
  noInfoCondition, 
  { data: mockIngredientsData },
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

