import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty, round } from 'lodash';
import moment from 'moment';
import {
  Area,
  AreaChart,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import NoInfo from '../../components/Dashboard/NoInfo';
import { selectors } from './DashboardDuck';
import {convertMgToGam} from '../../utils/AppUtils';

const mockNutritionLog = [
  { day: '17', protein: mockDatapoint(), sodium: mockDatapoint(), potassium: mockDatapoint()},
  { day: '18', protein: mockDatapoint(), sodium: mockDatapoint(), potassium: mockDatapoint()},
  { day: '19', protein: mockDatapoint(), sodium: mockDatapoint(), potassium: mockDatapoint()},
  { day: '20', protein: mockDatapoint(), sodium: mockDatapoint(), potassium: mockDatapoint()},
  { day: '21', protein: mockDatapoint(), sodium: mockDatapoint(), potassium: mockDatapoint()},
  { day: '22', protein: mockDatapoint(), sodium: mockDatapoint(), potassium: mockDatapoint()},
]

const tooltipLabels = {
  protein: '단백질',
  sodium: '나트륨',
  potassium: '칼륨',
}

const CustomTooltip = (props) => {
  const { active, payload, external } = props;

  if (active) {
    return (
      <div className="nutrition-log-chart-tooltip">
        <p>{external[payload[0].dataKey] + ' : '}<span>{payload[0].value}</span></p>
        <p>{external[payload[1].dataKey] + ' : '}<span>{payload[1].value}</span></p>
        <p>{external[payload[2].dataKey] + ' : '}<span>{payload[2].value}</span></p>
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
    const { data, todayNutrients} = this.props;
    const formattedData = this.formatData(data);

    return (
      <div className="nutrition-log-chart">
        <div className="nutrition-log-chart__date">
          {getDateLabel()}
        </div>
        <div className="nutrition-log-chart__recap">
          <div className="recap-item">
            <p>{convertMgToGam(round(todayNutrients.current.protein || 0, 0))}</p>
            <p>단백질(g)</p>
          </div>
          <div className="recap-item">
            <p>{convertMgToGam(round(todayNutrients.current.sodium || 0, 0))}</p>
            <p>나트륨(g)</p>
          </div>
          <div className="recap-item">
            <p>{convertMgToGam(round(todayNutrients.current.potassium || 0, 0))}</p>
            <p>칼륨(g)</p>
          </div>
        </div>
        <ResponsiveContainer>
          <AreaChart data={formattedData} >
            <XAxis dataKey="day" />
            <CartesianGrid />
            <Tooltip content={<CustomTooltip external={tooltipLabels} />} />
            <Area dataKey="protein" stroke="#69c7d6" fill="#69c7d6" fillOpacity={0.6} strokeWidth={2} yAxisId={0} isAnimationActive={false} />
            <Area dataKey="sodium" stroke="#e66e65" fill="#e66e65" fillOpacity={0.6} strokeWidth={2} yAxisId={1} isAnimationActive={false} />
            <Area dataKey="potassium" stroke="#f8ac39" fill="#f8ac39" fillOpacity={0.6} strokeWidth={2} yAxisId={2} isAnimationActive={false} />
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
  todayNutrients: selectors.getIngredients(state),
});

export default connect(mapStateToProps)(NutritionLogContainer);

function mockDatapoint () {
  return Math.floor(Math.random() * 1001) + 0;
}

function getDateLabel () {
  let today = new Date();
  return `${moment(today).subtract(6, 'days').format('DD MMM')} - ${moment(today).format('DD MMM')}`
}
