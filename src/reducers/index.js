import { combineReducers } from 'redux';
import StocksReducer from './reducer_stocks';
import SearchStockReducer from './reducer_search_stock';

const rootReducer = combineReducers({
	stocks: StocksReducer,
	searchStock: SearchStockReducer
});

export default rootReducer;
