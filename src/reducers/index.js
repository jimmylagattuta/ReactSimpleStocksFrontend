import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import StocksReducer from './reducer_stocks';
import SearchStockReducer from './reducer_search_stock';
import GetNewsReducer from './reducer_get_news';
import PortCheckReducer from './reducer_port_check';
import DestroyPortfolio from './reducer_destroy_portfolio';
import CartedStocks from './reducer_carted_stocks';
import GetSymbols from './reducer_get_symbols';

const rootReducer = combineReducers({
	form: formReducer,
	stocks: StocksReducer,
	searchStock: SearchStockReducer,
	getStocks: GetNewsReducer,
	portCheck: PortCheckReducer,
	destroyPortfolio: DestroyPortfolio,
	cartedStocks: CartedStocks,
	getSymbols: GetSymbols
});

export default rootReducer;
