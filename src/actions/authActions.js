import {
	SIGN_UP,
	SIGN_IN,
	SET_LOADING,
	AUTH_LOG_ERROR,
	CLEAR_AUTH_DATA,
	AUTH_PERSONAL_DETAILS,
	AUTH_PROJECTS,
	AUTH_EDUCATIONS,
	AUTH_WORK,
	AUTH_SKILLS,
	CLEAR_MSG,
	CLOSE_ALERT,
	SET_ALERT_MSG,
} from './types'
import axios from 'axios'
import { remote } from '../config'
export const registerUser = (userData, reset) => async (dispatch) => {
	setLoading()
	const options = {
		headers: {
			'Content-type': 'application/json',
		},
	}
	try {
		setLoading()
		const res = await axios.post(`${remote.signUp}`, userData, options)

		if (res.data.errors !== undefined) {
			dispatch({
				type: AUTH_LOG_ERROR,
				payload: res.data.msg,
			})
		} else {
			//status success
			// clear the form field
			reset()
			dispatch({
				type: SIGN_UP,
				payload: res.data,
			})
		}
	} catch (error) {
		//alert()

		dispatch({
			type: AUTH_LOG_ERROR,
			payload:
				error.response === undefined
					? 'Network'
					: error.response.data.errors === undefined
					? error.response.data.message
					: error.response.data.errors,
		})
	}
}
export const verifyEmail = (verifyData, reset) => async (dispatch) => {
	const options = {
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
		},
	}

	try {
		const res = await axios.post(`${remote.activateAcc}`, verifyData, options)

		if (res.status === 200) {
			if (res.data.status === 'error') {
				dispatch({
					type: AUTH_LOG_ERROR,
					payload: res.data.message,
				})
			} else {
				reset()
				dispatch({
					type: SIGN_UP,
					payload: res.data,
				})
			}
		}
	} catch (error) {
		dispatch({
			type: AUTH_LOG_ERROR,
			payload:
				error.response === undefined
					? 'Network'
					: error.response.data.errors === undefined
					? error.response.data.message
					: error.response.data.errors,
		})
	}
}

export const loginUser = (userData, reset) => async (dispatch) => {
	setLoading()
	const options = {
		headers: {
			'Content-type': 'application/json',
		},
	}
	try {
		setLoading()
		const res = await axios.post(`${remote.signIn}`, userData, options)

		if (res.data.status === 'error') {
			dispatch({
				type: AUTH_LOG_ERROR,
				payload: res.data.message,
			})
		} else {
			// clear the form field
			reset()
			dispatch({
				type: SIGN_IN,
				payload: res.data,
			})
		}
	} catch (error) {
		dispatch({
			type: AUTH_LOG_ERROR,
			//payload: error.message,
			payload: 'Error in connection. Please Try Again',
		})
	}
}



// ::::::::::::::::::::::::

// Set loading to true
export const setLoading = () => {
	return {
		type: SET_LOADING,
	}
}
// Set loading to true
export const clearData = () => {
	return {
		type: CLEAR_AUTH_DATA,
	}
}
//
export const clearMsg = () => {
	return {
		type: CLEAR_MSG,
	}
}
//
export const closeAlert = () => {
	return {
		type: CLOSE_ALERT,
	}
}
//
export const setModal = (actionType, data) => {
	return {
		type: actionType,
		payload: data,
	}
}
//
export const setDelData = (actionType, data) => {
	return {
		type: actionType,
		payload: data,
	}
}
export const setToastMsg = (data) => {
	return {
		type: SET_ALERT_MSG,
		payload: data,
	}
}

// ! :::::::::::::::::::::::::::::::::::::::::::::::::::
export const getRequestWithToken =
	(token, url, actionType) => async (dispatch) => {
		const options = {
			headers: {
				'Content-type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
		//
		dispatch({
			type: SET_LOADING,
		})
		try {
			const res = await axios.get(`${url}`, options)
			if (res.status === 200) {
				dispatch({
					type: actionType,
					payload: res.data,
				})
			}
		} catch (error) {
			dispatch({
				type: AUTH_LOG_ERROR,
				payload:
					error.response === undefined
						? 'Network Error'
						: error.response.data.errors === undefined
						? error.response.data.message
						: error.response.data.errors,
			})
		}
	}
/**
 *
 * @param {*} token
 * @param {*} url
 * @param {*} actionType
 * @param {*} postData
 * @param {*} reset
 * @returns
 */
export const postRequest =
	(token, url, actionType, postData, reset) => async (dispatch) => {
		const options = {
			headers: {
				'Content-type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
		//
		dispatch({
			type: SET_LOADING,
		})
		try {
			const res = await axios.post(`${url}`, postData, options)
			if (res.status === 200) {
				reset && reset()
				dispatch({
					type: actionType,
					payload: res.data,
				})
			}
		} catch (error) {
			dispatch({
				type: AUTH_LOG_ERROR,
				payload:
					error.response === undefined
						? 'Network Error'
						: error.response.data.errors === undefined
						? error.response.data.message
						: error.response.data.errors,
			})
		}
	}

export const postRequestWithoutToken =
	(url, actionType, postData, reset) => async (dispatch) => {
		const options = {
			headers: {
				'Content-type': 'application/json',
				Accept: 'application/json',
			},
		}
		//
		dispatch({
			type: SET_LOADING,
		})
		try {
			const res = await axios.post(`${url}`, postData, options)
			if (res.status === 200) {
				reset && reset()
				dispatch({
					type: actionType,
					payload: res.data,
				})
			}
		} catch (error) {
			dispatch({
				type: AUTH_LOG_ERROR,
				payload:
					error.response === undefined
						? 'Network Error'
						: error.response.data.errors === undefined
						? error.response.data.message
						: error.response.data.errors,
			})
		}
	}

export const postRequestWithoutReset =
	(token, url, actionType, postData) => async (dispatch) => {
		const options = {
			headers: {
				'Content-type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
		//
		dispatch({
			type: SET_LOADING,
		})
		try {
			const res = await axios.post(`${url}`, postData, options)
			if (res.status === 200) {
				dispatch({
					type: actionType,
					payload: res.data,
				})
			}
		} catch (error) {
			dispatch({
				type: AUTH_LOG_ERROR,
				payload:
					error.response === undefined
						? 'Network Error'
						: error.response.data.errors === undefined
						? error.response.data.message
						: error.response.data.errors,
			})
		}
	}
/**
 *
 * @param {*string} token
 * @param {*url} url
 * @param {*action} actionType
 * @param {*object} postData
 * @param {*func} reset
 * @returns
 */
export const postWithFileReq =
	(token, url, actionType, postData, reset) => async (dispatch) => {
		const options = {
			headers: {
				'Content-type': 'multipart/form-data',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
		dispatch({
			type: SET_LOADING,
		})
		try {
			const res = await axios.post(`${url}`, postData, options)
			if (res.status === 200) {
				reset()
				dispatch({
					type: actionType,
					payload: res.data,
				})
			}
		} catch (error) {
			dispatch({
				type: AUTH_LOG_ERROR,
				payload:
					error.response === undefined
						? 'Network Error'
						: error.response.data.errors === undefined
						? error.response.data.message
						: error.response.data.errors,
			})
		}
	}
// put
export const putWithFileReq =
	(token, url, actionType, postData) => async (dispatch) => {
		const options = {
			headers: {
				'Content-type': 'multipart/form-data',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
		dispatch({
			type: SET_LOADING,
		})
		try {
			const res = await axios.put(`${url}`, postData, options)
			if (res.status === 200) {
				dispatch({
					type: actionType,
					payload: res.data,
				})
			}
		} catch (error) {
			dispatch({
				type: AUTH_LOG_ERROR,
				payload:
					error.response === undefined
						? 'Network Error'
						: error.response.data.errors === undefined
						? error.response.data.message
						: error.response.data.errors,
			})
		}
	}
// delete
export const deleteRequest = (token, url, actionType) => async (dispatch) => {
	const options = {
		headers: {
			Accept: 'application/josn',
			'Content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}
	dispatch({
		type: SET_LOADING,
	})
	try {
		const res = await axios.delete(`${url}`, options)
		if (res.status === 200) {
			dispatch({
				type: actionType,
				payload: res.data,
			})
		}
	} catch (error) {
		dispatch({
			type: AUTH_LOG_ERROR,
			payload:
				error.response === undefined
					? 'Network Error'
					: error.response.data.errors === undefined
					? error.response.data.message
					: error.response.data.errors,
		})
	}
}

//
/*
export const newProject = (projectData, token, reset) => async (dispatch) => {
	const options = {
		headers: {
			'Content-type': 'multipart/form-data',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}
	try {
		const res = await axios.post(`${remote.project}`, projectData, options)
		//
		if (res.data.errors !== undefined) {
			// there is an error
			dispatch({
				type: AUTH_LOG_ERROR,
				payload: res.data.msg,
			})
		} else if (res.data.status === 'success') {
			// clear the form field
			reset()
			dispatch({
				type: AUTH_PROJECTS,
				payload: res.data,
			})
		}
	} catch (error) {
		dispatch({
			type: AUTH_LOG_ERROR,
			//payload: error.message,
			payload: 'Error in connection. Please Try Again',
		})
	}
}
// 
export const updatePersonalDetails = (userData, token) => async (dispatch) => {
	setLoading()
	const options = {
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}
	try {
		setLoading()
		const res = await axios.post(`${remote.editProfile}`, userData, options)
		//alert(res.data.success)
		if (res.data.errors !== undefined) {
			dispatch({
				type: AUTH_LOG_ERROR,
				payload: res.data.errors,
			})
		} else if (res.data.status === 'success') {
			// clear the form field
			//reset()
			dispatch({
				type: AUTH_PERSONAL_DETAILS,
				payload: res.data,
			})
		}
	} catch (error) {
		dispatch({
			type: AUTH_LOG_ERROR,
			payload:
				error.response === undefined
					? 'Network'
					: error.response.data.errors === undefined
					? error.response.data.message
					: error.response.data.errors,
		})
	}
}
// 
export const newSkill = (skillData, token, reset) => async (dispatch) => {
	const options = {
		headers: {
			'Content-type': 'multipart/form-data',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}
	try {
		const res = await axios.post(`${remote.skill}`, skillData, options)
		//
		if (res.data.errors !== undefined) {
			// there is an error
			dispatch({
				type: AUTH_LOG_ERROR,
				payload: res.data.msg,
			})
		} else if (res.data.status === 'success') {
			// clear the form field
			reset()
			dispatch({
				type: AUTH_SKILLS,
				payload: res.data,
			})
		}
	} catch (error) {
		dispatch({
			type: AUTH_LOG_ERROR,
			//payload: error.message,
			payload: 'Error in connection. Please Try Again',
		})
	}
}
// add education
export const newEducation = (educationData, token, username, reset) => async (
	dispatch
) => {
	setLoading()
	const options = {
		headers: {
			'Content-type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}
	try {
		setLoading()
		const res = await axios.post(`${remote.education}`, educationData, options)
		//
		if (res.data.errors !== undefined) {
			// there is an error
			dispatch({
				type: AUTH_LOG_ERROR,
				payload: res.data.msg,
			})
		} else if (res.data.status === 'success') {
			// clear the form field
			reset()
			dispatch({
				type: AUTH_EDUCATIONS,
				payload: res.data,
			})
		}
	} catch (error) {
		dispatch({
			type: AUTH_LOG_ERROR,
			//payload: error.message,
			payload: 'Error in connection. Please Try Again',
		})
	}
}


*/
