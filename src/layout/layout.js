import React from 'react';
import Aux from '../hoc/aux/aux';
import PropTypes from 'prop-types';

const layout = (props) => {
    return (
        <Aux>
            <main>{props.children}
            </main>
        </Aux>
    );
}

layout.propTypes = {
    children : PropTypes.any
};


export default layout;