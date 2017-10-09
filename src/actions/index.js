import axios from 'axios';

export const FETCH_STOCKS = 'fetch_stocks';
export const SEARCH_STOCK = 'search_stock';
export const DELETE_STOCK = 'delete_stock';
export const GET_NEWS = 'get_news';
export const PORT_CHECK = 'port_check';

export const fetchStocks = () => {
 const request = axios.get('http://localhost:3000/api/v1/stocks');
 console.log('request', request);
 return {
 	type: FETCH_STOCKS,
 	payload: request
 };
};	

export const searchStock = (symbol) => {
	console.log('symbol');
	console.log(symbol);
 	const request = axios.post('http://localhost:3000/api/v1/stocks', {'symbol': symbol});
 	console.log('request', request);
	return {
		type: SEARCH_STOCK, 
		payload: request
 	};

};

export const getNews = () => {
	console.log('getNews');
	const request = axios.get('http://localhost:3000/api/v1/news');
	console.log('request', request);
	return {
		type: GET_NEWS,
		payload: request
	};
};

export const signOut = (id) => {
	console.log('id below');
	console.log(id);
	const request = axios.delete('http://localhost:3000/api/v1/sessions', { 'id': id});
	console.log('request', request);
	return {
		type: DELETE_STOCK,
		payload: request
	}
}

export const portCheck = (id) => {
	console.log('id below');
	console.log(id);
	const request = axios.post('http://localhost:3000/api/v1/port/port_check', { 'id': id });
	console.log('request', request);
	return {
		type: PORT_CHECK,
		payload: request
	}
}