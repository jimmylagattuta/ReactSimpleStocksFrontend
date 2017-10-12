import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchStock } from '../actions';
import './search_bar.css';
// import OneStockRender from './smallercomponents/one_stock_render';
import axios from 'axios';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		
		this.state = { term: "",
					   search_boolean: false,
					   searched_stock: []};

		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.updatePage = this.updatePage.bind(this);
	}
	componentWillMount() {
		const { searchStock } = this.props;
		// console.log('fetchStocks below');
		// this.props.fetchStocks();
		axios.get('http://localhost:3000/api/v1/stocks')
			.then(response => {
				console.log('response.data below');
				console.log(response.data);
				this.setState({ searched_stock: response.data });
				console.log('searched_state below');
				console.log(this.state.searched_stock);
			});
			console.log('this.fetched_stocks_array below H_H');
			console.log(this.fetched_stocks_array);
		// this.props.fetchStocks();
		// this.props.searchStock();
	}
	onInputChange(event) {
		console.log(event.target.value);
		this.setState({ term: event.target.value });
	}
	onFormSubmit(event) {
		event.preventDefault();
		// this.props.searchStock(this.state.term);
		console.log('search_boolean below');
		console.log(this.state.search_boolean);
		this.props.searchStock(this.state.term).then(() => {
			// console.log('search boolean below');
			// this.setState({  });
		});

	}

	updatePage() {
		console.log('updatePage');

	}

	render() {
		const { searchStock } = this.props;

		return (
			<div className="searchbar_middle_top">
				<div className="searchbar_middle_top_content">
					<form onSubmit={this.onFormSubmit} className="input-group">
						<input 
							placeholder="Enter Stock Symbol"
							className="form-control"
							value={this.state.term}
							onChange={this.onInputChange}
						/>
						<span className="input-group-btn">
							<button type="submit" className="btn btn-secondary">Submit</button>
						</span>
					</form>
					{renderSearch(this.state.searched_stock)}
				</div>
			</div>
		);
	}
}

const renderSearch = (stock_traits) => {
	console.log('stock_traits below');
	console.log(stock_traits);
	return _.map(stock_traits['stocks'], stock => {
		return (
			<div key={stock.id}>
				<div id="render_search">
					<p>Symbol: {stock['symbol']}</p>
					<p>Company Name: {stock.company_name}</p>
					<p>Asking Price: {stock.asking_price}</p>
					<p>Bidding Price: {stock.bidding_price}</p>
					<p>Days Percent: {stock.days_percent}</p>
					<p>Day High: {stock.days_high}</p>
					<p>Day Low: {stock.days_low}</p>
					<p>Year High: {stock.year_high}</p>
					<p>Year Low: {stock.years_low}</p>
					<p>Average Daily Volume: {stock.average_daily_volume}</p>
				</div>
			</div>
		);
	})
};

const renderSearchOneStock = (stock_traits) => {
	console.log('stock_traits below renderSearchOneStock');
	console.log(stock_traits);
	return _.map(stock_traits, stock => {
		return (
			<div key={stock.id}>
				<div id="render_search">
					<p>Symbol: {stock['symbol']}</p>
					<p>Company Name: {stock.company_name}</p>
					<p>Asking Price: {stock.asking_price}</p>
					<p>Bidding Price: {stock.bidding_price}</p>
					<p>Days Percent: {stock.days_percent}</p>
					<p>Day High: {stock.days_high}</p>
					<p>Day Low: {stock.days_low}</p>
					<p>Year High: {stock.year_high}</p>
					<p>Year Low: {stock.years_low}</p>
					<p>Average Daily Volume: {stock.average_daily_volume}</p>
				</div>
			</div>
		);
	})
};

const mapStateToProps = (state) => {
	const { searchStock } = state;
	return { searchStock };
}


export default connect(mapStateToProps, { searchStock })(SearchBar);