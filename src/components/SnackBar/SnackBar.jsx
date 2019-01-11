import React from 'react';
import {connect} from 'react-redux';
import {removeSnackBar} from '../../actions/SnackBarActions';

const mapStateToProps = state => {
  return {snackbar: state.snackbar};
};

function mapDispatchToProps(dispatch) {
  return {
    removeSnackBar: () => dispatch(removeSnackBar())
  };
}

class SnackbarsComponent extends React.Component {
  state = {
    classes             : ['snackbar'],
    updatedFromComponent: false,
  };


  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(prevProps);
    console.log(this.props);
    if (this.props.snackbar && !prevProps.snackbar) {
      setTimeout(() => {
        this.setState({
          classes             : [...this.state.classes,`snackbar-${this.props.snackbar.type}`, 'show'],
          updatedFromComponent: true,
        });
      }, 5);
      setTimeout(() => {
        this.props.removeSnackBar();
        this.setState({
          classes             : ['snackbar'],
          updatedFromComponent: true,
        });
      }, 5000);
    }
  }

  render() {
    return (
      <div className={this.state.classes.join(' ')} id="messageContainer">
        {this.props.snackbar ? this.props.snackbar.message : ''}
      </div>
    );
  };
}

const SnackBar = connect(mapStateToProps, mapDispatchToProps)(SnackbarsComponent);
export default SnackBar;
