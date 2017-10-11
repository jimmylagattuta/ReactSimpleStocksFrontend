import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { destroyPortfolio } from '../actions';
import axios from 'axios';
import DestroyPortfolio from './smallercomponents/destroy_portfolio';
import './portfolio.css';

class Portfolio extends Component {
	constructor(props) {
		super(props);

		this.state = { id: 0,
					   activePort: false }
					   this.setTheStateActive = this.setTheStateActive.bind(this);
	}

	componentWillMount() {
   		const userId = sessionStorage.getItem('userId');
   		const { destroyPortfolio } = this.props.destroyPortfolio;
   		const { handleSubmit } = this.props;
   		const user = [];
   		if(userId > 0) {
   			this.setState({ id: userId });
	   		axios.post('http://localhost:3000/api/v1/port/port_check', { "id": userId })
	   			.then(response => {
	   				const port_active = response.data['active'];
	   				let temp_user = response.data;
	   				this.setTheStateActive(port_active);
	   			})
	   			.catch(err => {alert(err)});
   		};
   	}
   	setTheStateActive(array) {
   		const new_array = array;
   		this.setState({ activePort: new_array });
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
	};
	onSubmit(values) {
		const userId = sessionStorage.getItem('userId');
		axios.post('http://localhost:3000/api/v1/portfolios/init', { values, userId })
			.then(payload => {
				window.location = "http://localhost:3001";
			})
			.catch(err => {alert(err)});
			this.forceUpdate();
	}
	render() {
		const { destroyPortfolio } = this.props.destroyPortfolio;
		const { handleSubmit } = this.props;
		if((this.state.id === 0 || this.state.id === null) && !(this.state.activePort)) {
			return (
				<div className="portfolio_top_right">
					<div className="portfolio_top_right_content">
						<h4>Do You Have What it Takes to Make Money Investing in Stocks? Sign Up and Initialize Your Portfolio and Compete to be the Best! Start Your Simple Stocks Experience Today!</h4>
					</div>
				</div>
			);
		} else if(this.state.activePort) {
			return (
				<div className="portfolio_top_right">
					<div className="portfolio_top_right_content">
						<h2>Welcome {this.user}!</h2>
						<div className="destroy_port">
							<DestroyPortfolio destroyPortfolio={this.props.destroyPortfolio} />
						</div>
					</div>
				</div>
			);
		} else if((this.state.id > 0 || this.state.id !== 0) && !(this.state.activePort)) {
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
const mapStateToProps = (state) => {
	const { destroyPortfolio } = state;
	return { destroyPortfolio };
}
export default reduxForm({
	validate,
	form: 'initPortForm'
})(
	connect(mapStateToProps, { destroyPortfolio })(Portfolio)
);