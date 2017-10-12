import { SEARCH_STOCK } from '../actions';

const INITIAL_STATE = {};
export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case SEARCH_STOCK:
			console.log('action.payload below');
			console.log(action.payload.data);
			return [action.payload.data];
		default:
			return state;
	}
};