import React, { Component } from "react";
import { connect } from "react-redux";
import Apod from "./Apod";
import { getInitialAPOD } from "./actions";

// Define the class so that we can populate componentDidMount
class ApodContainer extends Component {
  componentDidMount() {
    this.props.getInitialAPOD();
  }

  // Render is required for all class components
  render() {
    const { apod, isFetching } = this.props;

    // Manually set the props - the presentational component
    // does not need the getInitialAPOD action since it
    // was already dispatched
    return <Apod apod={apod} isFetching={isFetching} />;
  }
}

const mapStateToProps = state => {
  return {
    apod: state.apod,
    isFetching: state.isFetching
  };
};

// Add our new getInitialAPOD action dispatch to props
const mapDispatchToProps = dispatch => {
  return {
    getInitialAPOD: () => {
      dispatch(getInitialAPOD());
    }
  };
};

// Map props and dispatch to ApodContainer which will
// now render Apod itself.
// Export the result of `connect` directly.
export default connect(mapStateToProps, mapDispatchToProps)(ApodContainer);
