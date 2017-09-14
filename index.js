'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.setErrors = setErrors;
exports.errorReducer = errorReducer;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function setErrors(error) {
    return {
        type: 'SET_V_REACT_ERROR',
        error: error
    };
}

var checkValidity = exports.checkValidity = function checkValidity(_ref) {
    var value = _ref.value,
        isRequired = _ref.isRequired,
        minLength = _ref.minLength,
        maxLength = _ref.maxLength,
        custom = _ref.custom,
        isDirty = _ref.isDirty;

    var isValid = true;
    var errors = [];
    if (isDirty) {
        if (isRequired) {
            if (value === undefined || value === null || value.length === 0) {
                isValid = false;
                errors.push(isRequired.message);
            }
        }

        if (minLength) {
            if (value && value.length < minLength.value) {
                isValid = false;
                errors.push(minLength.message);
            }
        }

        if (maxLength) {
            if (value && value.length > maxLength.value) {
                isValid = false;
                errors.push(maxLength.message);
            }
        }

        if (custom && custom.length) {
            custom.forEach(function (c) {
                if (c.action(value)) {
                    errors.push(c.message);
                }
            });
        }
    }

    return { errorMessage: errors.join(' '), isValid: isValid, errors: errors };
};

var setValidity = exports.setValidity = function setValidity(_ref2) {
    var group = _ref2.group,
        name = _ref2.name,
        value = _ref2.value,
        validations = _ref2.validations,
        isDirty = _ref2.isDirty,
        fieldName = _ref2.fieldName,
        setError = _ref2.setError,
        state = _ref2.state;

    var result = checkValidity(_extends({ value: value }, validations, { isDirty: isDirty }));
    if (!state) {
        state = [];
        state[fieldName] = { ignored: false };
    }

    if (!state[fieldName].ignored) {
        state[fieldName] = {
            isDirty: true,
            hasError: !!result.errorMessage.length,
            errorMessage: result.errorMessage,
            validationState: !result.errorMessage.length ? 'VALIDATION_NEUTRAL' : 'VALIDATION_ERROR',
            ignored: state[fieldName].ignored,
            errors: result.errors
        };
        if (setError) {
            setError({
                group: group,
                name: name,
                type: fieldName,
                hasError: !!result.errorMessage });
        }
    }
    return state;
};

var pickError = function pickError(e, error) {
    return e.group === error.group && e.name === error.name && e.type === error.type;
};
var getErrors = exports.getErrors = function getErrors(state, error) {
    if (!state) {
        return [].concat(_toConsumableArray(error));
    }
    var newErrors = [];
    var isExisting = state.find(function (e) {
        return pickError(e, error);
    });
    if (isExisting && !error.hasError) {
        newErrors = state.filter(function (e) {
            return !pickError(e, error);
        });
    } else if (!isExisting) {
        newErrors = state.map(function (e) {
            return Object.assign({}, e);
        });
        newErrors.push(error);
    } else {
        newErrors = state;
    }
    return newErrors.filter(function (e) {
        return e.hasError;
    });
};

function errorReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];
debugger;
    switch (action.type) {
        case 'SET_V_REACT_ERROR':
            {
                return [].concat(_toConsumableArray(getErrors(state, action.error)));
            }
        default:
            return state;
    }
}