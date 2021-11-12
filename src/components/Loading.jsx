import React, { Component } from "react";
import '../Loading.css'

class Loading extends Component {
  render() {
    return (
      <div className="loading-container">
        <div className="loader" data-testid="loading">
          <div className="outer"></div>
          <div className="middle"></div>
          <div className="inner"></div>
        </div>
      </div>
    );
  }
}

export default Loading;
