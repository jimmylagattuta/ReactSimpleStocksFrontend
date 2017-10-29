import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import StocksReducer from './reducer_stocks';
import SearchStockReducer from './reducer_search_stock';
import GetNewsReducer from './reducer_get_news';
import PortCheckReducer from './reducer_port_check';
import DestroyPortfolio from './reducer_destroy_portfolio';
import CartedStocks from './reducer_carted_stocks';
import GetSymbols from './reducer_get_symbols';
import GetStocks from './reducer_get_stocks';
import StockToSell from './reducer_stock_to_sell';
import FinalSell from './reducer_final_sell';

const rootReducer = combineReducers({
	form: formReducer,
	stocks: StocksReducer,
	searchStock: SearchStockReducer,
	getStocks: GetNewsReducer,
	portCheck: PortCheckReducer,
	destroyPortfolio: DestroyPortfolio,
	cartedStocks: CartedStocks,
	getSymbols: GetSymbols,
	getStocks: GetStocks,
	stockToSell: StockToSell,
	finalSell: FinalSell
});

export default rootReducer;
