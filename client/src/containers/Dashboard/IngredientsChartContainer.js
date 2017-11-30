import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  Tooltip,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import { isEqual } from 'lodash';
import { selectors } from './DashboardDuck';

class IngredientsChartContainer extends Component {
  render () {
    const data = this.props.data;
    return (
      <div className="ingredients-chart" style={{width: 600, height: 500}}>
        <ResponsiveContainer>
          <RadarChart 
            cx={300} 
            cy={250} 
            outerRadius={150} 
            width={600} 
            height={500} 
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

const mapStateToProps = (state) => ({
  data: selectors.getIngredients(state)
});

export default connect(mapStateToProps)(IngredientsChartContainer);

function mockDatapoint () {
  return Math.floor(Math.random() * 101) + 0;
}