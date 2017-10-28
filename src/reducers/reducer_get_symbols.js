import { GET_SYMBOLS } from '../actions';

const INITIAL_STATE = {}
export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case GET_SYMBOLS:
			// console.log(' get symbols action.payload below');
			// console.log(action.payload);
			return [action.payload.data, ...state];
		default:
			return state;
	}
};