import _ from 'axios';
import React, { Component } from 'react';
import './one_stock_render.css';

class AllStocksRender extends Component {
	componentWillMount() {
		console.log('componentWillMount Searchbarrender');
		const { fetchStock } = this.props;
		console.log(fetchStock);

	}

	render() {
		const { fetchStock } = this.props;
		return (
			<div className="search_bar_render">
				<div className="search_bar_render_content">
					<p>All Stocks Render</p>
				</div>
			</div>
		);
	}
}

const renderSearch = (stock_traits) => {
	return _.map(stock_traits, stock => {
		return (
			<div key={stock.id}>
				<div id="render_search">
					<p>Symbol: {}</p>
					<p>Company Name: {}</p>
					<p>Asking Price: {}</p>
					<p>Bidding Price: {}</p>
					<p>Days Percent: {}</p>
					<p>Day High: {}</p>
					<p>Day Low: {}</p>
					<p>Year High: {}</p>
					<p>Year Low: {}</p>
					<p>Average Daily Volume: {}</p>
				</div>
			</div>
		);
	});
};

export default AllStocksRender;