import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import StocksReducer from './reducer_stocks';
import SearchStockReducer from './reducer_search_stock';

const rootReducer = combineReducers({
	form: formReducer,
	stocks: StocksReducer,
	searchStock: SearchStockReducer
});

export default rootReducer;
