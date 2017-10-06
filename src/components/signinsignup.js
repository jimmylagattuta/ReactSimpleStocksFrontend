import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { signUp, signIn } from '../actions';
import { Field, reduxForm } from 'redux-form';
import './signinsignup.css'; 
import axios from 'axios';

class SignInSignUp extends Component {
	constructor(props) {
		super(props);

			this.state = { signUp: false }
		this.onClickSignChange = this.onClickSignChange.bind(this);

	}

	componentWillMount() {
		console.log('componentWillMount');
   		const userId = sessionStorage.getItem('userId');
   		console.log('userID below');
   		console.log(userId);

	}

	onClickSignChange() {
		console.log('onClickSignChange');
		if(this.state.signUp === false) {
			this.setState({ signUp: true });
		} else if(this.state.signUp === true) {
			this.setState({ signUp: false });
		}
	}
    renderTextField(field) {
	    const { meta: {touched, error} } = field
	    const className = `form-group ${ touched && error ? 'has-danger' : '' }`;

	    return (
	      <div className={className} id="field-form">
	        <label>{field.label}</label>
	        <input
	          className="form-control"
	          type="text"
	          {...field.input}
	          placeholder={field.label}
	        />
	        <div className="text-help">
	          {touched ? error : ''}
	        </div>
	      </div>
	    );
    }
    renderPasswordField(field) {
	    const { meta: {touched, error} } = field
	    const className = `form-group ${ touched && error ? 'has-danger' : '' }`;

	    return (
	      <div className={className} id="field-form">
	        <label>{field.label}</label>
	        <input
	          className="form-control"
	          type="password"
	          {...field.input}
	          placeholder={field.label}
	        />
	        <div className="text-help">
	          {touched ? error : ''}
	        </div>
	      </div>
	    );
    }
    onSubmit(values) {
    	console.log('onSubmit');
    	console.log('values below');
    	console.log(values);
   		// const userId = sessionStorage.getItem('userId');

    	axios.post('http://localhost:3000/api/v1/sessions/signin', values)
    		.then(payload => {
    			console.log('payload below');
    			console.log(payload.data);
        		alert('user signed in');
        		window.location = "http://localhost:3001";
       		})
       		.catch(err => {alert(err)});
    }
    onSubmitSignup(values) {
    	console.log('onSubmitSignup');
    	console.log('values below');
    	console.log(values);
   		// const userId = sessionStorage.getItem('userId');

   		axios.post('http://localhost:3000/api/v1/users', values)
   			.then(payload => {
   				console.log('payload below');
   				console.log(payload.data);
   				alert('user created, you can now sign up using you username');
   				window.location = "http://localhost:3001";
   			})
   			.catch(err => {alert(err)});
    }

	render() {
	    const { handleSubmit } = this.props;

		if(this.state.signUp === false) {
			return (
				<div className="signinsignup_top_left">
					<div className="signinsignup_top_left_content">
						<div onClick={this.onClickSignChange}>
							<h3>Sign In!(click me)</h3>
						</div>
						<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
							<Field
								label="Username "
								name="username_signin"
								component={this.renderTextField.bind(this)}
							/>
							<Field
								label="Password "
								name="password_signin"
								component={this.renderPasswordField.bind(this)}
							/>
	                        <button className="btn btn-success" type="submit">Submit</button>
						</form>
					</div>
				</div>
			);
		} else if(this.state.signUp === true) {
			return (
				<div className="signinsignup_top_left">
					<div className="signinsignup_top_left_content">
						<div onClick={this.onClickSignChange}>
							<h3>Sign Up!(click me)</h3>
						</div>
						<form onSubmit={handleSubmit(this.onSubmitSignup.bind(this))}>
							<Field
								label="Username "
								name="username"
								component={this.renderTextField.bind(this)}
							/>
							<Field 
								label="Password "
								name="password"
								component={this.renderPasswordField.bind(this)}
							/>
							<Field
								label="Password Confirmation "
								name="password_confirmation"
								component={this.renderPasswordField.bind(this)}
							/>
							<Field
								label="Email "
								name="email"
								component={this.renderTextField.bind(this)}
							/>
							<button className="btn btn-success" type="submit">Submit</button>

						</form>
					</div>
				</div>
			);
		};
	};
};

function validate(values) {
  const errors = {};
  if (!values.username) {
    errors.username = 'Enter a Username';
  }
  if (!values.password) {
    errors.password = "Enter a Password";
  }
  if (values.password_confirmation !== values.password) {
  	errors.password_confirmation = "Your Passwords Dont Match";
  }
  if (!values.email) {
  	errors.email = "Enter your Email"
  }
  return errors;
}

export default reduxForm({
	validate,
	form: 'signUp',
	form: 'signIn'
})(
 connect(null)(SignInSignUp)
);