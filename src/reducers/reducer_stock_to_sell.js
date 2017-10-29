import { STOCK_TO_SELL } from '../actions';

const INITIAL_STATE = {};

export default(state = INITIAL_STATE, action) => {
	switch(action.type) {
		case STOCK_TO_SELL:
			console.log('get to sell action.payload ', action.payload);
			return[action.payload.data, ...state];
		default:
			return state;
	}
};