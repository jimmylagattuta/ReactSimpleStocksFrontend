import { CARTED_STOCKS } from '../actions';

const INITIAL_STATE = {}
export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case CARTED_STOCKS:
			console.log('actioin.payload below');
			console.log(action.payload);
			return [action.payload.data, ...state];
		default:
			return state;
	}
};