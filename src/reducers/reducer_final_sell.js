import { FINAL_SELL } from '../actions';

const INITIAL_STATE = {}
export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case FINAL_SELL:
			console.log('finalSell data', action.payload);
			return [action.payload.data, ...state];
		default:
			return state;
	}
};