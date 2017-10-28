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
   		const portId = sessionStorage.getItem('portId');
   		console.log('portId ', portId);
   		const { destroyPortfolio } = this.props.destroyPortfolio;
   		const { handleSubmit } = this.props;
   		const user = [];
   		const portfolio = [];
   		// console.log('STARTS here');
   		// console.log('userId', userId);	
   		if(userId > 0) {
   			this.setState({ id: userId });
	   		axios.post('http://localhost:3000/api/v1/port/port_check', { "id": userId })
	   			.then(response => {
	   				// console.log('response below');
	   				// console.log(response);
	   				const port_active = response.data;
	   				// console.log('port_active underneeth me');
	   				// console.log(port_active);
	   				// console.log('postActive boolean below');
	   				if(port_active.active === false) {
	   					// console.log('port_active is false');
	   					this.setState({ activePort: false });
	   				}

	   				let temp_user = response.data;
	  		    	sessionStorage.setItem('portId', response.data.id);
	  		    	const portId = sessionStorage.setItem('portId', response.data.id);
	  		    	console.log('portId ', portId);
	   				this.setTheStateActive(port_active);
	   			})
	   			.catch(err => {alert(err)});
   		};
   	}
   	setTheStateActive(array) {
   		const new_array = array;
   		this.setState({ activePort: new_array });
   		// console.log('activePort below');
   		// console.log(this.state.activePort);

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
		    	sessionStorage.setItem('budget', payload.data.budget);
		    	const budget = sessionStorage.setItem('budget', payload.data.budget);
		    	console.log('budget ', budget);
				window.location = "http://localhost:3001";
			})
			.catch(err => {alert(err)});
			this.forceUpdate();
	}
	render() {
		const { destroyPortfolio } = this.props.destroyPortfolio;
		const { handleSubmit } = this.props;
		if((this.state.id === 0 || this.state.id === null)) {
			return (
				<div className="portfolio_top_right">
					<div className="portfolio_top_right_content">
						<h4>Do You Have What it Takes to Make Money Investing in Stocks? Sign Up and Initialize Your Portfolio and Compete to be the Best! Start Your Simple Stocks Experience Today!</h4>
					</div>
				</div>
			);
		} else if(this.state.activePort['active'] !== false) {
			return (
				<div className="portfolio_top_right">
					<div className="portfolio_top_right_content">
						<form action="http://localhost:3001/port">
    						<input type="submit" value="Port Page" />
						</form>
						<h2>Last Portfolio Check</h2>
						{renderPortfolio(this.state.activePort)}
						<DestroyPortfolio destroyPortfolio={this.props.destroyPortfolio} />
					</div>
				</div>
			);
		} else if((this.state.id > 0 || this.state.id !== 0) && !(this.state.activePort['active'])) {
			return (
				<div className="portfolio_top_right">
					<div className="portfolio_top_right_content">
						<h4>Welcome! {this.user} We Do Not Detect a Portfolio in Your Account. Initialize Your Portfolio to Get Started!</h4>
						<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
							<p>Your Beginning Cash Capital Limit is $100,000</p>
							<p>If You Are Succesfull, You Will Unlock Larger Limits</p> 
							<Field
								label="Add Cash Capital"
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
const renderPortfolio = (traits) => {
	console.log('traits');
	console.log(traits);
	const integer_stock_capital = parseInt(traits.stock_capital);
	const new_stock_capital = integer_stock_capital.toFixed(2);
	const integer_cash = parseInt(traits.cash);
	const new_cash = integer_cash.toFixed(2);
	const integer_total_capital = parseInt(traits.total_capital);
	const new_total_capital = integer_total_capital.toFixed(2);
	const integer_dollar_change = parseInt(traits.days_dollar_change);
	const new_dollar_change = integer_dollar_change.toFixed(2);
	const integer_month_change = parseInt(traits.months_dollar_change);
	const new_month_change = integer_month_change.toFixed(2);
	const integer_year_change = parseInt(traits.years_dollar_change);
	const new_year_change = integer_year_change.toFixed(2);
	const integer_alltime_change = parseInt(traits.all_time_dollar);
	const new_alltime_change = integer_alltime_change.toFixed(2);
	const integer_investment = parseInt(traits.investment);
	const new_investment = integer_investment.toFixed(2);

	return(
		<div key={traits.id}>
			<div id="render_search_portfolio">
				<p><span>Stock Capital</span></p>
				<p>${new_stock_capital}</p>
				<p><span>Cash</span></p>
				<p>${new_cash}</p>
				<p><span>Total Capital</span></p>
				<p>${new_total_capital}</p>
				<p><span>Days Percent</span></p>
				<p>{traits.daily_stock_capital_percentage}%</p>
				<p><span>Days Dollar Change</span></p>
				<p>${new_dollar_change}</p>
				<p><span>Months Percent</span></p>
				<p>{traits.monthly_stock_capital_percentage}%</p>
				<p><span>Months Dollar Change</span></p>
				<p>${new_month_change}</p>
				<p><span>Years Percent Change</span></p>
				<p>{traits.yearly_stock_capital_percentage}%</p>
				<p><span>Years Dollar Change</span></p>
				<p>${new_year_change}</p>
				<p><span>All Time Dollar Change</span></p>
				<p>${new_alltime_change}</p>
				<p><span>All Time Percent Change</span></p>
				<p>{traits.all_time_percent}%</p>
				<p><span>Investment Total</span></p>
				<p>${new_investment}</p>
			</div>
		</div>
	);


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