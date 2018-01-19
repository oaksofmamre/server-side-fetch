export const GET_APOD_REQUEST = "GET_APOD_REQUEST";
export const GET_APOD_SUCCESS = "GET_APOD_SUCCESS";
export const GET_APOD_FAILURE = "GET_APOD_FAILURE";

export function getAPODRequest() {
	return {
		type: GET_APOD_REQUEST
	};
}

export function getAPODSuccess(data) {
	return {
		type: GET_APOD_SUCCESS,
		data
	};
}

export function getAPODFailure(error) {
	return {
		type: GET_APOD_FAILURE,
		error
	};
}

export function getInitialAPOD() {
	return dispatch => {
		// Update the state so that it knows the request has begun
		dispatch(getAPODRequest());

		fetch("api/apod")
			.then(response => {
				// If response not okay, throw an error
				if (!response.ok) {
					throw new Error(`${response.status} ${response.statusText}`);
				}
				// Otherwise, extract the response into json
				return response.json();
			})
			.then(json => {
				// Dispatch success which sets the APOD.
				dispatch(getAPODSuccess(json));
			})
			.catch(error => {
				// Dispatch failure which sets the error in state
				dispatch(getAPODFailure(error));
			});
	};
}
