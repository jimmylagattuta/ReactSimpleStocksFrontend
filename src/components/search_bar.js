import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchStock } from '../actions';
import './search_bar.css';
import OneStockRender from './smallercomponents/one_stock_render';
import axios from 'axios';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		
		this.state = { term: "",
					   search_boolean: false,
					   searched_stock: [],
					   delete_boolean: false,
					   delete_id: 0 };
		this.onSubmitDelete = this.onSubmitDelete.bind(this);
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

	onSubmitDelete(event) {
		event.preventDefault();
		console.log('onSubmitDelete');
		console.log('state.term below');
		console.log(this.state.term);
		axios.post('http://localhost:3000/api/v1/stocks/delete_the_stock', { "stock_id": this.state.term })
			.then(response => {
				console.log('response below');
				console.log(response.data);
				// this.setState({ delete_boolean: false });
			});
			window.location = "http://localhost:3001/"
	}

	render() {
		if(this.state.searched_stock.length === 0) {
			return (
				<div className="searchbar_middle_top">
					<div className="searchbar_middle_top_content">
						<OneStockRender searchStock={this.props.searchStock} />
							<div id="form_to_delete">
								<form onSubmit={this.onSubmitDelete}>
									<input
										placeholder="Remove from list by id"
										value={this.state.term}
										onChange={this.onInputChange.bind(this)}
									/>
									<div id="form_to_delete_button">
										<button className="btn btn-success" type="submit">Remove</button>
									</div>
								</form>
							</div>
						<p id="title_list">Your Stock List</p>
							<h4 id="loading">Loading...</h4>
						
					</div>
				</div>
			);
		}

		const { searchStock } = this.props;
		const { handleSubmit } = this.props;
		return (
			<div className="searchbar_middle_top">
				<div className="searchbar_middle_top_content">
					<OneStockRender searchStock={this.props.searchStock} />
						<div id="form_to_delete">
							<form onSubmit={this.onSubmitDelete}>
								<input
									placeholder="Remove from list by id"
									value={this.state.term}
									onChange={this.onInputChange.bind(this)}
								/>
								<div id="form_to_delete_button">
									<button className="btn btn-success" type="submit">Submit</button>
								</div>
							</form>
						</div>
					<p id="title_list">Your Stock List</p>
					{renderSearch(this.state.searched_stock)}
				</div>
			</div>
		);	
	};
}

const renderSearch = (stock_traits) => {
	console.log('stock_traits below');
	console.log(stock_traits);
	return _.map(stock_traits['stocks'], stock => {
		const stock_id = stock.id
		console.log('stock_id below');
		console.log(stock_id);

		return (
			<div key={stock.id}>
				<div id="render_search">
					<p id="symbol"><span>Symbol:</span> {stock['symbol']}</p>
					<p>Company Name: {stock.company_name}</p>
					<p>Asking Price: {stock.asking_price}</p>
					<p>Bidding Price: {stock.bidding_price}</p>
					<p>Days Percent: {stock.days_percent}</p>
					<p>Day High: {stock.days_high}</p>
					<p>Day Low: {stock.days_low}</p>
					<p>Year High: {stock.year_high}</p>
					<p>Year Low: {stock.year_low}</p>
					<p>Average Daily Volume: {stock.average_daily_volume}</p>
					<p id="delete_from_list">delete with id: {stock.id}</p>
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