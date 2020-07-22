import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getData from '@/api/data';
import '@/styles/Load.css';

const DataContext = React.createContext();

const DataProvider = ({ children }) => {
  const [state, setState] = useState({ isLoading: true, attributes: [], items: [] });

  useEffect(() => {
    getData()
      .then((data) => setState({
        isLoading: false,
        items: data[0] ? data[0] : [],
        attributes: data[1] ? data[1] : [],
      }));
  }, []);

  return (
    <DataContext.Provider value={state}>
      {!state.isLoading && children}
      {state.isLoading && <img className="animation-target" alt="load" src="/assets/ajax-loader.gif" />}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DataProvider, DataContext };
