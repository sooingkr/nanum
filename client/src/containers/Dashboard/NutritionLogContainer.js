import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import moment from 'moment';
import {
  Area,
  AreaChart,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from 'recharts';
import NoInfo from '../../components/Dashboard/NoInfo';
import { selectors } from './DashboardDuck';
import {convertMgToGam} from '../../utils/AppUtils';

const mockNutritionLog = [
  { day: '17', carbohydrate: mockDatapoint(), protein: mockDatapoint(), fat: mockDatapoint()},
  { day: '18', carbohydrate: mockDatapoint(), protein: mockDatapoint(), fat: mockDatapoint()},
  { day: '19', carbohydrate: mockDatapoint(), protein: mockDatapoint(), fat: mockDatapoint()},
  { day: '20', carbohydrate: mockDatapoint(), protein: mockDatapoint(), fat: mockDatapoint()},
  { day: '21', carbohydrate: mockDatapoint(), protein: mockDatapoint(), fat: mockDatapoint()},
  { day: '22', carbohydrate: mockDatapoint(), protein: mockDatapoint(), fat: mockDatapoint()},
]

const tooltipLabels = {
  carbohydrate: '탄수화물',
  protein: '단백질',
  fat: '지방',
}

const CustomTooltip = (props) => {
  const { active, payload, external } = props;

  if (active) {
    return (
      <div className="nutrition-log-chart-tooltip">
        <p className="carbohydrate">{external[payload[0].dataKey] + ' : '}<span>{payload[0].value}</span></p>
        <p className="protein">{external[payload[1].dataKey] + ' : '}<span>{payload[1].value}</span></p>
        <p className="fat">{external[payload[2].dataKey] + ' : '}<span>{payload[2].value}</span></p>
      </div>
    );
  }

  return null;
};

class NutritionLogContainer extends Component {
  formatData(data) {
    return !data || isEmpty(data) ? mockNutritionLog : data;
  }

  render () {
    const { data, nutrientsToday, queryTime} = this.props;
    const formattedData = this.formatData(data);

    return (
      <div className="nutrition-log-chart">
        <div className="nutrition-log-chart__date">
          {getDateLabel(queryTime)}
        </div>
        <h3 className="nutrition-log-chart__title first">
          주간 섭취량
        </h3>
        <h3 className="nutrition-log-chart__title second">
          오늘 섭취량
        </h3>
        <div className="nutrition-log-chart__recap">
          <div className="recap-item">
            <p className="carbohydrate">{convertMgToGam(nutrientsToday.carbohydrate)}</p>
            <p className="carbohydrate">탄수화물(g)</p>
          </div>
          <div className="recap-item">
            <p className="protein">{convertMgToGam(nutrientsToday.protein)}</p>
            <p className="protein">단백질(g)</p>
          </div>
          <div className="recap-item">
            <p className="fat">{convertMgToGam(nutrientsToday.fat)}</p>
            <p className="fat">지방(g)</p>
          </div>
        </div>
        <ResponsiveContainer>
          <AreaChart data={formattedData} >
            <XAxis dataKey="day" />
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip content={<CustomTooltip external={tooltipLabels} />} />
            <Area dataKey="carbohydrate" stackId="1" stroke="#f8ac39" fill="#f8ac39" fillOpacity={0.6} strokeWidth={2} isAnimationActive={false} />
            <Area dataKey="protein" stackId="1" stroke="#e66e65" fill="#e66e65" fillOpacity={0.6} strokeWidth={2} isAnimationActive={false} />
            <Area dataKey="fat" stackId="1" stroke="#69c7d6" fill="#69c7d6" fillOpacity={0.6} strokeWidth={2} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

NutritionLogContainer.propTypes = {
  data: PropTypes.array
}

const noInfoCondition = (props) => {
  return !props.data || isEmpty(props.data);
}

NutritionLogContainer = NoInfo(
  noInfoCondition,
  null,
  '정보를 입력하시면 오늘의 식품을 추천받으실 수 있습니다',
  '/user/setting',
)(NutritionLogContainer);

const mapStateToProps = (state) => ({
  data: selectors.getNutritionLog(state),
  nutrientsToday: selectors.getNutrientsToday(state),
  queryTime: selectors.getTime(state),
});

export default connect(mapStateToProps)(NutritionLogContainer);

function mockDatapoint () {
  return Math.floor(Math.random() * 1001) + 0;
}

function getDateLabel (queryTime) {
  return `${moment(queryTime).subtract(6, 'days').format('DD MMM')} - ${moment(queryTime).format('DD MMM')}`
}
