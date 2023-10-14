import React from 'react';
import {Link} from "react-router-dom";
import styles from './Title.module.css'
const Title = ({navigation, loading, iconStyles, ...props}) => {
    return (
        <h2 className="text-center">
            <span className="fs-3 fw-semibold">{props.children}</span>
            {
                (loading)
                ? <i className={"fa-solid fa-spinner fa-spin fa-xs " + styles.absolute}></i>
                : null
            }
            <Link style={{float:'right'}} to={navigation}><i className={styles.ichibeHyosube + " " + iconStyles}/></Link>
        </h2>
    );
};

export default Title;