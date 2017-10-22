import { ADD_STOCKS } from '../actions';

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case ADD_STOCKS:
			return [action.payload.data, ...state];
		default:
			return state;
	}
};