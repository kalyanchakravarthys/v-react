# v-react
This validation package can be used with **react** and **redux**.

This package will help you to update the validation error messages in redux store and you can use the validations in store to allow/reject actions in UI.

**STEP 1:** npm install v-react


**STEP 2:**
Update your combine reducers file as below

    import errorReducer from './errorReducer';

    const rootReducer = combineReducers({
      errorReducer,
      // other reducers go here
    });
    
    export default rootReducer;

**STEP 3: [Optional]**
Use v-react as below in your component

    import { setValidity } from 'v-react';

Maintain a local state in your component for all your input fields which need validation, this goes into your component constructor

    (['input-field1', 'input-field2', 'input-field3']).forEach((str) => {
          this.state[str] = {
            isDirty: false,
            hasError: false,
            errorMessage: '',
            validationState: 'VALIDATION_NEUTRAL'
          };
        });

**STEP 4:**
This is how you invoke the 'v-react' package to update the validations in your redux state.

Below code should go in input on change event or button click even, etc where ever you need the validation checks to be triggered.

    const params = {
      group: 'string', // Group a set of validtions with a unique name.
      name: 'string', // Unique name for the validation. This should be different for each of the field.
      value: 'string/bool/number/null/undefined', // Value to be validated.
      validations: 'array', // List of validations in the below specified format.
      isDirty: 'bool', // Only if you set this value to true, validations check will be performed.
      fieldName: 'string', // Name of the field to be validated
      state: '_.cloneDeep(this.state)' // Local state, only if you have followed the STEP 3
    };

    validators.setValidity(params);
    this.setState({ ...params.state });

***Format for validations:***

    'INPUT_FIELD_NAME': {
            isRequired: { 
		            value: true, 
		            message: 'error message' 
	            },
            maxLength: { 
		            value: 1000, message: 'error message' },
		            minLength: { value: 10, message: 'error message' },
            custom: [
                {
                    name: 'unique name'
                    action: function(value) { return 'bool'; }
                    message: 'error message'
                },
                {
                    name: 'unique name'
                    action: function(value) { return 'bool'; }
                    message: 'error message'
                }
            ]
          }

