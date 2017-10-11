import { DESTROY_PORTFOLIO } from "../actions";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case DESTROY_PORTFOLIO:
			return [...action.payload.data];
		default:
			return state;
	}
};