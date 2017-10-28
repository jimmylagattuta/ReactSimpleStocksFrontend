import { PORT_CHECK } from '../actions';

const INITIAL_STATE = {};
export default(state = INITIAL_STATE, action) => {
	switch(action.type) {
		case PORT_CHECK:
			// console.log('action.payload.data below');
			// console.log(action.payload.data);
			return [...action.payload.data];
		default:
			return state;
	}
};