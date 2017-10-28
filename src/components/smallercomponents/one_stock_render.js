import _ from 'axios';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import './one_stock_render.css';

class OneStockRender extends Component {
	constructor(props) {
		super(props);

		this.state = { term: '',
						search: false,
						searched_stock: [] }

		this.onFormSubmit = this.onFormSubmit.bind(this);

	}
	componentWillMount() {
		// console.log('componentWillMount Searchbarrender');
		const { searchStock } = this.props;
		// console.log('HERE IS THE SEARCHED STOCK');
		// console.log(this.state.searched_stock);
		// console.log('search boolean here mounted');
		// console.log(this.state.search);
	}

	onInputChange(event) {
		// console.log(event.target.value);
		this.setState({ term: event.target.value });
	}
	onFormSubmit(event) {
		event.preventDefault();
		// this.props.searchStock(this.state.term);
		// console.log('search_boolean below');
		// console.log(this.state.search_boolean);
		this.props.searchStock(this.state.term).then((response) => {
			// console.log('response below');
			// console.log(response.payload.data);
			if(response.payload.data.innie) {
				alert('Symbol or Company Name Error');
			} else if(response.payload.data.jsonSymbol) {
				alert('Enter stock symbol ' + response.payload.data.jsonSymbol);
			} else {
				this.setState({ searched_stock: response.payload.data });
				this.setState({ search: true });
				// console.log('HERE IT IS AGAIN');
				// console.log(this.state.searched_stock);
			};
		});

	}

	render() {
		const { searchStock } = this.props;
		const stock = this.state.searched_stock;
		// console.log('AND AGAIN');
		// console.log(this.state.searched_stock);
		// console.log('search boolean here render');
		// console.log(this.state.search);


		if(this.state.search === false) {
			return (
				<div className="search_bar_render">
					<div className="search_bar_render_content">
						<form onSubmit={this.onFormSubmit} className="input-group">
							<input 
								placeholder="Symbol or Company Name"
								className="form-control"
								value={this.state.term}
								onChange={this.onInputChange.bind(this)}
							/>
							<span className="input-group-btn">
								<button type="submit" className="btn btn-secondary">Submit</button>
							</span>
						</form>
					</div>
				</div>
			);
		} else if(this.state.search === true && this.state.searched_stock) {
			return (
				<div className="search_bar_render">
					<div className="search_bar_render_content">
						<form onSubmit={this.onFormSubmit} className="input-group">
							<input 
								placeholder="Enter Stock Symbol"
								className="form-control"
								value={this.state.term}
								onChange={this.onInputChange.bind(this)}
							/>
							<span className="input-group-btn">
								<button type="submit" className="btn btn-secondary">Submit</button>
							</span>
						</form>
						{renderSearch(stock)}
					</div>
				</div>
			);
		} else {
			return (
				<div className="search_bar_render">
					<div className="search_bar_render_content">
						<p>Loading... </p>
					</div>
				</div>
			);
		};
	};
}

const renderSearch = (stock) => {
	// console.log('stock here');
	// console.log(stock);
	return (
		<div key={stock.id}>
			<div key="render_search_for_one_stock">
				<p id="title">Here's the Stock!</p>
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
				<p id="delete_from_list">delete with id: {stock.id}</p>
			</div>
		</div>
	);
};



export default OneStockRender;