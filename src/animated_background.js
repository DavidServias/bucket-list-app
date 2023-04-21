import React, { Component } from "react";
import "./css/background.css";

export class AnimatedBackground extends Component {
    render() {

        return (
            <div>
                <div className="bg"></div>
                <div className="bg bg2"></div>
                <div className="bg bg3"></div>
            </div>
        );
    }
}

export default AnimatedBackground;