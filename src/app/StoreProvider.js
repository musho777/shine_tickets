'use client'
import React from 'react';
import { Provider } from 'react-redux';
import store from '../services/store'; // Import your Redux store

export default function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}