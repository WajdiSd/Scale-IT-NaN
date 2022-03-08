import React, { Component } from 'react';
import Routes from './routes/Routes';
import { useSelector, useDispatch } from 'react-redux';

// setup fake backend
import { configureFakeBackend } from './helpers';

// Themes

// default
import './assets/scss/Theme.scss';
import { Route } from 'react-router-dom';

// dark
// import './assets/scss/theme-dark.scss';

// rtl
// import './assets/scss/theme-rtl.scss';

// configure fake backend
configureFakeBackend();

/**
 * Main app component
 */
export const App = () => {
    const reducerState = useSelector((state) => state);
    console.log(reducerState);
    return <Routes></Routes>;
};

export default App;
