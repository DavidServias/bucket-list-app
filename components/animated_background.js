import React, { Component } from "react";
import styles from '../styles/animated-background.module.css';

export class AnimatedBackground extends Component {
    render() {

        return (
            <div>
                <div className={styles.bg}></div>
                <div className={styles.bg2}></div>
                <div className={styles.bg3}></div>
            </div>
        );
    }
}

export default AnimatedBackground;