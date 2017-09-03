const checkValidity = ({value, isRequired, minLength, maxLength, regex, isDirty}) => {
    let isValid = true;
    let errors = [];
    if(isRequired){
        if((value === undefined || value === null ||  value.length === 0) && isDirty){
            isValid = false;
            errors.push(isRequired.message);
        }
    }

    if(minLength) {
        if(value && value.length < minLength.value){
            isValid = false;
            errors.push(minLength.message)
        }
    }

    if(maxLength) {
        if(value && value.length > maxLength.value){
            isValid = false;
            errors.push(maxLength.message)
        }
    }

    // This function will be enhanced to perform regex validation.

    return { errorMessage: errors.join(' '), isValid}
}

const setValidity = ({group, name, value, validations, isDirty, fieldName, setError, state}) => {
    const result = checkValidity({ value, ...validations, isDirty });
    if (!state[fieldName].ignored) {
        state[fieldName] = {
            isDirty: true,
            hasError: !!result.errorMessage.length,
            errorMessage: result.errorMessage,
            validationState: !result.errorMessage.length ? 'VALIDATION_NEUTRAL' : 'VALIDATION_ERROR',
            ignored: state[fieldName].ignored
        };
        setError({
            group,
            name,
            type: fieldName,
            hasError: !!result.errorMessage });
    }
    return state;
  }

export {
    checkValidity, setValidity
}