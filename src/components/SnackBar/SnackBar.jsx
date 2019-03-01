import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeSnackBar } from '../../actions/SnackBarActions';

const mapStateToProps = state => ({ snackbar: state.snackbar });

function mapDispatchToProps(dispatch) {
  return {
    removeSnackBar: () => dispatch(removeSnackBar()),
  };
}

class SnackbarsComponent extends React.Component {
  state = {
    classes: ['snackbar'],
  };


  componentDidUpdate(prevProps, prevState, snapshot) {
    const { snackbar } = this.props;
    const { classes } = this.state;
    if (snackbar && !prevProps.snackbar) {
      setTimeout(() => {
        this.setState({
          classes: [...classes, `snackbar-${snackbar.type}`, 'show'],
        });
      }, 5);
      setTimeout(() => {
        this.props.removeSnackBar();
        this.setState({
          classes: ['snackbar'],
        });
      }, 5000);
    }
  }

  render() {
    const { classes } = this.state;
    return (
      <div className={classes.join(' ')} id="messageContainer">
        {this.props.snackbar ? this.props.snackbar.message : ''}
      </div>
    );
  }
}

SnackbarsComponent.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.string),
  snackbar: PropTypes.shape({ message: PropTypes.string, type: PropTypes.string }),
};

SnackbarsComponent.defaultProps = {
  classes: ['snackbar'],
  snackbar: undefined,
};

const SnackBar = connect(mapStateToProps, mapDispatchToProps)(SnackbarsComponent);
export default SnackBar;
