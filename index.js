'use strict';
import {checkValidity, setValidity, errorReducer, getErrors, errorActions } from './build/main.bundle.js'

const validatorConfig = []

export { 
    getErrors,
    checkValidity,
    setValidity,
    validatorConfig,
    errorReducer,
    errorActions
 }