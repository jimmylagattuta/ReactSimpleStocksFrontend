import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { signUp, signIn } from '../actions';
import { Field, reduxForm } from 'redux-form';
import './signinsignup.css';
import axios from 'axios';

export const { SIGN_OUT } = 'sign_out';

class SignInSignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {  signIn: false,
						signUp: false,
						userLive: false,
						email: "",
						id: 0
					}
		this.onClickSignChange = this.onClickSignChange.bind(this);
		this.onClickSignUpChange = this.onClickSignUpChange.bind(this);
		this.onUserLive = this.onUserLive.bind(this);
		this.logOut = this.logOut.bind(this);
		// this.setStateFuncEmail = this.setStateFuncEmail.bind(this);
		// this.setStateFuncId = this.setStateFuncId.bind(this);
	}

	componentWillMount() {
		console.log('componentWillMount');
   		const userId = sessionStorage.getItem('userId');
   		console.log('userID below');
   		console.log(userId);
   		console.log('this.state.email below');
   		console.log(this.state.email);

	}

	onClickSignChange() {
		console.log('onClickSignChange');
		if(this.state.signIn === false) {
			this.setState({ signIn: true });
		} else if(this.state.signIn === true) {
			this.setState({ signIn: false });
		}
	}

	onClickSignUpChange() {
		console.log('onClickSignUpChange');
		if(this.state.signUp === false) {
			this.setState({ signUp: true });
		} else if(this.state.signUp === true) {
			this.setState({ signUp: false });
		}
	}
	onUserLive() {
		console.log('onUserLive');
		if(this.state.userLive === false) {
			this.setState({ userLive: true });
		} else if(this.state.userLive === true) {
			this.setState({ userLive: false });
		}
	}
	// setStateUser() {
	// 	console.log('setStateUser');
	// 	if(this.state.userLive === false) {
	// 		this.setState({ userLive: true });
	// 	} else if(this.state.userLive === true) {
	// 		this.setState({ userLive: false });
	// 	}
	// }
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
    	const email = document.getElementById('email').value;
    	const password = document.getElementById('password').value;

    	axios.post('http://localhost:3000/api/v1/sessions', { email, password })
    		.then(response => {
    			console.log('response below');
    			console.log(response.data);
		        sessionStorage.setItem('confirmed', response.data.confirmed_at);
		    	sessionStorage.setItem('userId', response.data.id);
        		const id = response.data.id;
        		console.log('id below');
        		console.log(id);
        		console.log('email below');
        		console.log(email);
        		window.location = "http://localhost:3001";

       			// this.setStateFuncEmail(email);
       		})
   			.catch(err => {alert(err)});
       		this.onClickSignChange();

    }
    // setStateFuncEmail(email) {
   	// 	this.setState({ 'email': email });
   	// 	console.log('email', this.state.email );
    // }
    // setStateFuncId(id) {
   	// 	this.setState({ id: parseInt(id) });
    // }
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
   			.catch(err => {alert(err)});;
   			this.onClickSignUpChange()
    }
    logOut() {
    	console.log('logOut');
		axios.post('http://localhost:3000/api/v1/user_logout')
			.then(response => {
		    	sessionStorage.setItem('userId', response.data.id);
   				window.location = "http://localhost:3001";

			})
   			.catch(err => {alert(err)});

    }

	render() {
	    const { handleSubmit } = this.props;

		if(this.state.userLive === false && this.state.signIn === false && this.state.signUp === false) {
			return (
				<div className="signinsignup_top_left">
					<div className="signinsignup_top_left_content">
						<div onClick={this.onClickSignChange.bind(this)}>
							<h3>Sign In!(click me)</h3>
						</div>
						<div onClick={this.onClickSignUpChange.bind(this)}>
							<h3>Sign Up!(click me)</h3>
						</div>
						<div onClick={this.logOut.bind(this)}>
							<h3>Sign Out</h3>
						</div>
					</div>
				</div>
			);
		} else if(this.state.userLive === false && this.state.signIn === true && this.state.signUp === false) {
			return (
				<div className="signinsignup_top_left">
					<div className="signinsignup_top_left_content">
						<div onClick={this.onClickSignChange.bind(this)}>
							<h3>Sign In!(click me)</h3>
						</div>
	    				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
	       	    			<div className="cred">
	         					<p>Email</p>
	         					<input type="text" id="email"/>
			    			</div>
		        			<div className="cred">
	 	            			<p>Password</p>
	       						<input type="password" id="password" />
	       					</div>
		        			<button className="btn btn-success" type="submit">Submit</button>
						</form>
					</div>
				</div>
			);
		} else if(this.state.userLive === false && this.state.signIn === false && this.state.signUp === true) {
			return (
				<div className="signinsignup_top_left">
					<div className="signinsignup_top_left_content">
						<div onClick={this.onClickSignUpChange.bind(this)}>
							<h3>Sign Up!(click me)</h3>
						</div>
						<form onSubmit={handleSubmit(this.onSubmitSignup.bind(this))}>
							<Field
								label="Email "
								name="email"
								component={this.renderTextField}
							/>
							<Field 
								label="Password "
								name="password"
								component={this.renderPasswordField}
							/>
							<Field
								label="Password Confirmation "
								name="password_confirmation"
								component={this.renderPasswordField}
							/>
							<button className="btn btn-success" type="submit">Submit</button>
						</form>
					</div>
				</div>
			);
		} else if(this.state.userLive === true && this.state.signIn === false && this.state.signUp === false ) {
			return (
				<div className="signinsignup_top_left">
					<div className="signinsignup_top_left_content">
						<h1>Welcome User!</h1>
						<div onClick={this.logOut.bind(this)}>
							<h3>Sign Out</h3>
						</div>
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