import { FETCH_STOCKS } from '../actions';

const INITIAL_STATE = {};
export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case FETCH_STOCKS:
			// console.log('action.payload below');
			// console.log(action.payload.data);
			return [action.payload.data, ...state];
		default:
			return state;
	}
};