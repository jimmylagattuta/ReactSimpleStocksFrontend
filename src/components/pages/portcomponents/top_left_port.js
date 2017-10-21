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
		if(!this.state.portfolio) {
			return (
				<div className="top_left_port">
					<div className="top_left_port_content">
						<h4 id="loading">Loading...</h4>
					</div>
				</div>
			);
		};

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
	return(
		<div key={traits['id']}>
			<div id="render_port_page_portfolio">
				<p><span>Stock Capital: </span> ${traits['stock_capital']}</p>
				<p><span>Cash in Account: </span> ${traits.cash}</p>
				<p><span>Day's Percent: </span> {traits.daily_stock_capital_percentage}%</p>
				<p><span>Day's Dollar: </span> ${traits.days_dollar_change}</p>
				<p><span>Month's Percent: </span> {traits.monthly_stock_capital_percentage}%</p>
				<p><span>Month's Dollar: </span> ${traits.months_dollar_change}</p>
				<p><span>Year's Percent: </span> {traits.yearly_stock_capital_percentage}%</p>
				<p><span>Year's Dollar Change: </span> ${traits.years_dollar_change}</p>
				<p><span>All Time Percent: </span> {traits.all_time_percent}%</p>
				<p><span>All Time Dollar: </span> ${traits.all_time_dollar}</p>
				<p><span>Investment Total: </span> ${traits.investment}</p>
			</div>
		</div>
	);

}

export default TopLeftPort;