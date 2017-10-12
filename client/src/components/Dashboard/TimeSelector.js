import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import moment from 'moment';

class TimeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPickerShown: false,
    }
  }

  togglePicker = () => {
    this.setState({isPickerShown: !this.state.isPickerShown});
  }

  render() {
    const { startDate, onTimeChange } = this.props;
    const displayDate = moment(startDate).format('D MMMM');
    const buttonClass = this.state.isPickerShown ? 'time-selector__trigger is-hidden' : 'time-selector__trigger';
    const pickerClass = this.state.isPickerShown ? 'time-selector__picker is-active' : 'time-selector__picker';

    return (
      <div className="time-selector">
        <button 
          className={buttonClass}
          onClick={this.togglePicker}
        >
          {displayDate}
        </button>
        <div className={pickerClass}>
          <DayPicker 
            selectedDays={startDate}
            disabledDays={{ after: new Date() }}
            onDayClick={(date) => {
              const formattedDate = moment(date).format();
              onTimeChange(formattedDate);
              this.togglePicker();
            }}
          />
        </div>
      </div>
    );
  }
};

TimeSelector.propTypes = {
  startDate: PropTypes.object.isRequired,
  onTimeChange: PropTypes.func.isRequired,
}

export default TimeSelector;