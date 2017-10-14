import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';



import Homepage from './components/homepage';
import Port from './components/pages/port';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
	<BrowserRouter>
		<div>
			<Switch>
		  		<Route path="/port" component={Port} />
		  		<Route path="/" component={Homepage} />
		  	</Switch>
		 </div>
  	</BrowserRouter>
  </Provider>
  , document.querySelector('#root'));
registerServiceWorker();
