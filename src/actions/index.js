import axios from 'axios';

export const FETCH_STOCKS = 'fetch_stocks';
export const SEARCH_STOCK = 'search_stock';
export const DELETE_STOCK = 'delete_stock';
export const GET_NEWS = 'get_news';
export const PORT_CHECK = 'port_check';
export const DESTROY_PORTFOLIO = 'destroy_portfolio';
export const ADD_STOCKS = 'add_stocks';
export const CARTED_STOCKS = 'carted_stocks';
export const GET_SYMBOLS = 'get_symbols';

export const fetchStocks = () => {
 const request = axios.get('http://localhost:3000/api/v1/stocks');
 return {
 	type: FETCH_STOCKS,
 	payload: request
 };
};	

export const searchStock = (symbol) => {
 	const request = axios.post('http://localhost:3000/api/v1/stocks', {'symbol': symbol});
	return {
		type: SEARCH_STOCK, 
		payload: request
 	};

};

export const getNews = () => {
	const request = axios.get('http://localhost:3000/api/v1/news');
	return {
		type: GET_NEWS,
		payload: request
	};
};

export const signOut = (id) => {
	const request = axios.delete('http://localhost:3000/api/v1/sessions', { 'id': id});
	return {
		type: DELETE_STOCK,
		payload: request
	}
}

export const portCheck = (id) => {
	const request = axios.post('http://localhost:3000/api/v1/port/port_check', { 'id': id });
	return {
		type: PORT_CHECK,
		payload: request
	}
}

export const destroyPortfolio = (id) => {
	const request = axios.post('http://localhost:3000/api/v1/port/destroy', { 'id': id });
	return {
		type: DESTROY_PORTFOLIO, 
		payload: request
	};
};

export const addStocks = (stocks) => {
	const request = axios.post('http://localhost:3000/api/v1/port/add_to', { 'stocks': stocks });
	console.log('request', request);
	
	return {
		type: ADD_STOCKS,
		payload: request
	};
};

export const cartedStocks = (portId) => {
	console.log('portId', portId);
	const request = axios.post('http://localhost:3000/api/v1/port/retrieve_the_added_to', { data: portId });
	console.log('request', request);

	return {
		type: CARTED_STOCKS,
		payload: request
	};
};

export const getSymbols = () => {
	const request = axios.get('http://localhost:3000/api/v1/stock_symbols/symbols');
	// console.log('getSymbols request', request);

	return { 
		type: GET_SYMBOLS,
		payload: request 
	};
}