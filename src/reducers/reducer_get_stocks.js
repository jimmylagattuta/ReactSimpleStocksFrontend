import { GET_STOCKS } from '../actions';

const INITIAL_STATE = {}
export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case GET_STOCKS:
			console.log('get stocks port action.payload below');
			console.log(action.payload);
			return [action.payload.data, ...state];
		default:
			return state;
	}
};