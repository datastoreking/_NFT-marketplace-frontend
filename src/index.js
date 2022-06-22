import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import ScrollToTop from './ScrollToTop';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { GRAPHQL_ENDPOINT } from './constant';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <ApolloProvider client={client}>
      <BrowserRouter >
        <ScrollToTop />
        <App />
        <ToastContainer
          autoClose={50000}
          hideProgressBar
        />
      </BrowserRouter>
    </ApolloProvider>
  </Web3ReactProvider>,
  document.getElementById('root')
);
