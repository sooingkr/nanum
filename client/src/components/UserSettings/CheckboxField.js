import React from 'react';
import PropTypes from 'prop-types';

class CheckboxField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false,
    }
  }

  handleClick = () => {
    this.setState({ showTooltip: true });
  }

  handleMouseOut = () => {
    this.setState({ showTooltip: false });
  }

  renderTooltip() {
    const className = this.state.showTooltip 
      ? 'fade in tooltip top'
      : 'fade out tooltip top';

    return (
      <div>
        <div className={className}>
          <div className="tooltip-arrow"></div>
          <div className='tooltip-inner'>서비스 준비중입니다</div>
        </div>
      </div>
    );
  }

  render() {
    const { field, option, checked, disabled, handleChange } = this.props;
    const { showTooltip } = this.state;

    return (
      <div 
        onClick={this.handleClick}
        onMouseOut={this.handleMouseOut}
        style={{position: 'relative'}}
      >
        <label>{option.name}</label>
        <input
          {...field}
          type="checkbox"
          onChange={event => handleChange(event, option, disabled)}
          onBlur={(e) => e.preventDefault()}
          checked={checked && !disabled}
          value={option.id}
        />
        { disabled &&
          showTooltip &&
          this.renderTooltip()
        }
      </div>
    )
  }
}

CheckboxField.propTypes = {
  field: PropTypes.object.isRequired,
  option: PropTypes.object.isRequired,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default CheckboxField;