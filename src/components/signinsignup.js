import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { signUp, signIn } from '../actions';
import { Field, reduxForm } from 'redux-form';
import './signinsignup.css'; 

class SignInSignUp extends Component {
	constructor(props) {
		super(props);

			this.state = { signUp: false }
		this.onClickSignChange = this.onClickSignChange.bind(this);

	}

	componentWillMount() {
		console.log('componentWillMount');
	}

	onClickSignChange() {
		console.log('onClickSignChange');
		if(this.state.signUp === false) {
			this.setState({ signUp: true });
		} else if(this.state.signUp === true) {
			this.setState({ signUp: false });
		}
	}

	render() {
		if(this.state.signUp === false) {
			return (
				<div className="signinsignup_top_left">
					<div className="signinsignup_top_left_content">
					<div onClick={this.onClickSignChange}>
						<h3>Sign In!</h3>
					</div>
					</div>
				</div>
			);
		} else if(this.state.signUp === true) {
			return (
				<div className="signinsignup_top_left">
					<div className="signinsignup_top_left_content">
						<div onClick={this.onClickSignChange}>
							<h3>Sign Out!</h3>
						</div>
					</div>
				</div>
			);
		};
	};
};

export default SignInSignUp;