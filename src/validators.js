import setErrors from './errorActions';

const checkValidity = ({value, isRequired, minLength, maxLength, custom, isDirty}) => {
    let isValid = true;
    let errors = [];
    if(isDirty) {
        if(isRequired){
            if((value === undefined || value === null ||  value.length === 0)){
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
        
        if(custom && custom.length) {
            custom.forEach(c => {
                if(c.action(value)) {
                    errors.push(e.message)
                }
            })
        }
    }

    return { errorMessage: errors.join(' '), isValid, errors}
}

const setValidity = ({group, name, value, validations, isDirty, fieldName, setError, state}) => {
    const result = checkValidity({  value, 
                                    isRequired: validations.isRequired, 
                                    minLength: validations.minLength, 
                                    maxLength: validations.maxLength, 
                                    custom:validations.custom, 
                                    isDirty 
                                 }); 
    if(!state) {
        state = [];
        state[fieldName] = { ignored: false }
    }

    if (!state[fieldName].ignored) {
        state[fieldName] = {
            isDirty: true,
            hasError: !!result.errorMessage.length,
            errorMessage: result.errorMessage,
            validationState: !result.errorMessage.length ? 'VALIDATION_NEUTRAL' : 'VALIDATION_ERROR',
            ignored: state[fieldName].ignored,
            errors
        };
        if(setError) {
            setError({
                group,
                name,
                type: fieldName,
                hasError: !!result.errorMessage });
        }
    }
    return state;
  }

export {
    checkValidity, setValidity
}