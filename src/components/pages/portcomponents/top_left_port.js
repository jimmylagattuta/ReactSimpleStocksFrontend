import React, { Component } from 'react';
import { connect } from 'react-redux';
import './top_left_port.css';

class TopLeftPort extends Component {
	constructor(props) {
		super(props);

		this.state = { portfolio: [] }

		this.setPortfolioToState = this.setPortfolioToState.bind(this);
	}

	componentWillMount() {
		const userId = sessionStorage.getItem('userId');
		const { portCheck } = this.props;
		const hold_port = [];
		this.props.portCheck(userId).then((response) => {
			const hold_porfolio = response.payload.data;
			this.setPortfolioToState(hold_porfolio);
		});
	}

	setPortfolioToState(port) {
		this.setState({ portfolio: port });
	}

	render() {


		return (
			<div className="top_left_port">
				<div className="top_left_port_content">
					<div id="portfolio_title">
						<h2>Your Portfolio Details</h2>
						{renderPortfolio(this.state.portfolio)}						
					</div>
				</div>
			</div>

		);
	}
}

const renderPortfolio = (traits) => {
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
		<div key={traits['id']}>
			<div id="render_port_page_portfolio">
				<p><span>Stock Capital: </span> ${new_stock_capital}</p>
				<p><span>Cash in Account: </span> ${new_cash}</p>
				<p><span>Day's Percent: </span> {traits.daily_stock_capital_percentage}%</p>
				<p><span>Total Capital: </span> ${new_total_capital}</p>
				<p><span>Day's Dollar: </span> ${new_dollar_change}</p>
				<p><span>Month's Percent: </span> {traits.monthly_stock_capital_percentage}%</p>
				<p><span>Month's Dollar: </span> ${new_month_change}</p>
				<p><span>Year's Percent: </span> {traits.yearly_stock_capital_percentage}%</p>
				<p><span>Year's Dollar Change: </span> ${new_year_change}</p>
				<p><span>All Time Percent: </span> {traits.all_time_percent}%</p>
				<p><span>All Time Dollar: </span> ${new_alltime_change}</p>
				<p><span>Investment Total: </span> ${new_investment}</p>
			</div>
		</div>
	);

}

export default TopLeftPort;