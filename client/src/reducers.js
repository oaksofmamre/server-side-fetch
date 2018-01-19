import * as Actions from "./actions";

const initialState = {
  apod: {},
  isFetching: false,
  error: null
};

export function apod(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_APOD_SUCCESS:
      return {
        ...state,
        apod: action.data,
        isFetching: false
      };
    case Actions.GET_APOD_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Actions.GET_APOD_FAILURE:
      console.log("Error:", action.error);
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}
