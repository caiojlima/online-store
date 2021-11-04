import React, { Component } from "react";
import '../Loading.css'

class Loading extends Component {
  render() {
    return (
      <div className="loading-container">
        <div class="loader">
          <div class="outer"></div>
          <div class="middle"></div>
          <div class="inner"></div>
        </div>
      </div>
    );
  }
}

export default Loading;
