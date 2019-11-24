import React from 'react';
import PropTypes from 'prop-types';
import './aux.css';

const aux = (props) => { 
    return (
        <div className= "container">
            {props.children}
        </div>
    );
}

aux.propTypes = {
    children : PropTypes.any
};


export default aux;