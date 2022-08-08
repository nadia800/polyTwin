
import { SET_MESSAGE, CLEAR_MESSAGE } from "./types";

export const setMessage = (message) => ({
    type: SET_MESSAGE,
    payload: message,
});

//return type clear message
export const clearMessage = () => ({
    type: CLEAR_MESSAGE,
});