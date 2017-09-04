# v-react
This validation package can be used with **react** and **redux**.

This package will help you to update the validation error messages in redux store and you can use the validations in store to allow/reject actions in UI.

**Example Project:** https://github.com/kalyanchakravarthys/v-react-example

**STEP 1:** npm install v-react


**STEP 2:** Update your combine reducers file as below

    import { errorReducer } from './errorReducer';

    const rootReducer = combineReducers({
      errorReducer,
      // other reducers go here
    });
    
    export default rootReducer;

**STEP 3:** Pass the v-react error action to your component

    import { setErrors } from './errorReducer';
    
    function mapDispatchToProps(dispatch) {
      return {
          errorActions: bindActionCreators({setErrors}, dispatch),
          // Other actions go here 
      };
    }

**STEP 4: [Optional]** Set a local state to temporarily store the validation messages

    import { setValidity } from 'v-react';

Maintain a local state in your component for all your input fields which need validation, this goes into your component constructor

    (['input-field1-name', 'input-field2-name', 'input-field3-name']).forEach((str) => {
          this.state[str] = {
            isDirty: false,
            hasError: false,
            errorMessage: '',
            validationState: 'VALIDATION_NEUTRAL'
          };
        });

**STEP 5:** This is how you invoke the 'v-react' package to update the validations in your redux state.

*Below code should go in **input on change event or button click event**, etc where ever you need the validation checks to be triggered.*

    const params = {
      group: 'validation-group-name',
      name: 'validation-name',
      value: 'string/bool/number/null/undefined', // Value to be validated.
      validations: 'refer-sample-validation-object ##Ref1', // List of validations in the below specified format.
      isDirty: 'bool', // Only if you set this value to true, validations check will be performed.
      fieldName: 'input-field-name',
      state: _.cloneDeep(this.state), // Local state, only if you have followed the STEP 4,
      setError: this.props.errorActions.setErrors // Fetch the set error function from 'v-react' and pass it on the set validity function
    };

    validators.setValidity(params); //##Ref2
    this.setState({ ...params.state });

**STEP 6:** This is how your html goes

    <input	name="firstName"	type="text"		onChange={this.onNameChange}	className="form-control"	value={this.props.firstName}/>
    <span style="color:red;">{this.state.drugName.errorMessage}</span>

***`##Ref1`* Format for validations:**

    const validations = {
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

***`##Ref2`* The result of setValidity function will be in below format**

    {
	    //other properties of state
	    ['fieldName']: {
				isDirty: true,
				hasError: 'bool',
				errors: ['errormessage1', 'errormessage2'],
				errorMessage: 'All error messages combined in a single string',
				validationState: '"VALIDATION_NEUTRAL" or "VALIDATION_ERROR"',
				ignored: 'bool'
			   }
    }
