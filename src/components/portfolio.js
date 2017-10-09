import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// import { portCheck } from '../actions';
import axios from 'axios';
import './portfolio.css';

class Portfolio extends Component {
	constructor(props) {
		super(props);

		this.state = { id: 0,
					   activePort: false }

	}

	componentWillMount() {
		console.log('componentWillMount');
   		const userId = sessionStorage.getItem('userId');
   		console.log('userId below c.w.m port.js');
   		console.log(userId);
   		// const { portCheck } = this.props.portCheck;
   		// this.props.portCheck(userId);
   		const port_active = [];
   		const user = [];
   		if(userId > 0) {
   			this.setState({ id: userId });
   			console.log('state.id below c.w.m. port if userId > 0');
   			console.log(this.state.id);
	   		axios.post('http://localhost:3000/api/v1/port/port_check', { "id": userId })
	   			.then(response => {
	   				console.log('response below');
	   				console.log(response.data);
	   				port_active.push(response.data[0]['active']);
	   				let temp_user = response.data[0]['user'];
	   				console.log('temp_user');
	   				console.log(temp_user);

	   				user.push(temp_user);
	   			})
	   			.catch(err => {alert(err)});
	   			console.log('port_active below right here');
	   			console.log(port_active);
	   			this.setState({ activePort: port_active });
	   			console.log('state.activePort below');
	   			console.log(this.state.activePort);
	   			console.log('user email below');

   		};

   		// if(userId === ) {
   		// 	this.setState({ activePort: true });
   		// 	console.log('this.state.activePort below');
   		// 	console.log(this.state.activePort);
   		// };
   	}

	renderCashCapital(field) {
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

	onSubmit(values) {
		console.log('onSubmit');
		console.log('values below');
		console.log(values);

		axios.post('http://localhost:3000/api/v1/portfolios/init', values)
			.then(payload => {
				console.log('payload below');
				console.log(payload.data);
				alert('port initialized!');
				window.location = "http://localhost:3001";
			})
			.catch(err => {alert(err)});
	}

	render() {
		// const { port } = this.props;
		console.log('render port below @_@');
		// console.log(port);
		const { handleSubmit } = this.props;
		if(this.state.id === 0 || this.state.id === null && this.state.activePort === false) {
			return (
				<div className="portfolio_top_right">
					<div className="portfolio_top_right_content">
						<h4>Do You Have What it Takes to Make Money Investing in Stocks? Sign Up and Initialize Your Portfolio and Compete to be the Best! Start Your Simple Stocks Experience Today!</h4>
					</div>
				</div>
			);
		} else if(this.state.id > 0 && this.state.activePort === true) {
			return (
				<div className="portfolio_top_right">
					<div className="portfolio_top_right_content">
						<h2>Welcome {this.user}!</h2>
					</div>
				</div>
			);
		} else if(this.state.id > 0 || this.state.id !== 0 && this.state.activePort === false) {
			return (
				<div className="portfolio_top_right">
					<div className="portfolio_top_right_content">
						<h4>Welcome! {this.user} We Do Not Detect a Portfolio in Your Account. Initialize Your Portfolio to Get Started!</h4>
						<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
							<p>Your Beginning Cash Capital Limit is $100,000</p>
							<p>If You Are Succesfull, You Will Unlock Larger Limits</p> 
							<Field
								label="Cash Capital"
								name="cash_capital"
								component={this.renderCashCapital}
							/>
							<button className="btn btn-success" type="submit">Submit</button>
						</form>
					</div>
				</div>
			);

		}
	};
};

function validate(values) {
	const errors = {};
	if (!values.cash_capital) {
		errors.cash_capital = 'Fund Your Account!';
	}
	if (parseInt(values.cash_capital) > 100000) {
		errors.cash_capital = "Your Limit is $100,000!";
	}
	return errors;
}

export default reduxForm({
	validate,
	form: 'initPortForm'
})(
	connect(null)(Portfolio)
);