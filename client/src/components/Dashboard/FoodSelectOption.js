import React from 'react';
import PropTypes from 'prop-types';

class FoodSelectOption extends React.Component {
  handleMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onSelect(this.props.option, event);
  }

  handleMouseEnter = (event) => {
    this.props.onFocus(this.props.option, event);
  }

  handleMouseMove = (event) => {
    if (this.props.isFocused) return;
    this.props.onFocus(this.props.option, event);
  }

  render() {
    return (
      <div 
        className={this.props.className}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
        title={this.props.option.label}
      >
        <div className="food-select-option">
          <h4 className="food-select-option__name">{this.props.option.label}</h4>
          <p className="food-select-option__manu">{this.props.option.value.manufacturer}</p>
        </div>
      </div>
    );
  }
}

FoodSelectOption.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool,
  onFocus: PropTypes.func,
  onSelect: PropTypes.func,
  option: PropTypes.object.isRequired,
}

export default FoodSelectOption;