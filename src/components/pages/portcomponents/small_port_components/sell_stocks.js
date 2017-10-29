import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import './sell_stock.css';

class SellStocks extends Component {
	constructor(props) {
		super(props);

		this.state = { sellable: {},
					   boolean: false,
					   selling: {} 
					}

		this.renderSellableStocks = this.renderSellableStocks.bind(this);
		this.onClickAdd = this.onClickAdd.bind(this);
		this.checkStockSell = this.checkStockSell.bind(this);
	}

	componentWillMount() {
		console.log('componentWillMount SellStocks');
		if(this.state.sellable.length) {
			this.setState({ sellable: {} });
		}
		const { getStocks, stockToSell, finalSell } = this.props;
		const { handleSubmit } = this.props;
		console.log('getStocks here', this.props.getStocks);
		const portId = sessionStorage.getItem('portId');
		const box_of_stuff = [];
		this.props.getStocks(portId).then((response) => {
			console.log('getStocks done, response ~> ', response.payload.data);
			box_of_stuff.push(response.payload.data);
			this.setState({ sellable: box_of_stuff });
			this.checkStockSell(portId);
		});
		let bag = [];
	}

	checkStockSell(portId) {
		this.props.stockToSell(portId).then((response) => {
			console.log('response.payload.data checkStockSell', response.payload.data);
			const parsed = response.payload.data['content'][0];
			console.log('parsed ', parsed);
			// INDIVIDUAL STORAGE SESSION ITEMS
			const pps_sell = sessionStorage.setItem('pps_sell', parsed['pps_at_purchase']);
			const selling_stock_id = sessionStorage.setItem('selling_stock_id', parsed['stock_id']);
			const selling_owned = sessionStorage.setItem('selling_owned', parsed['quantity']);
			const selling_symbol = sessionStorage.setItem('selling_symbol', parsed['symbol']);
			// const selling_stock = sessionStorage.setItem('selling_stock', parsed);
			// const selling_stock = sessionStorage.setItem('selling_stock', parsed);

		});
	}

	onClickAdd(item) {
		console.log('onClickAdd ', item);
		this.setState({ boolean: true });
		const portId = sessionStorage.getItem('portId');
		const bag_of_items = {
			items: item,
			portId: portId
		}
			axios.post('http://localhost:3000/api/v1/port_stocks/save_to_sell', { "data": bag_of_items })
	   			.then(response => {
	  		    	console.log('response ', response);
	   			})
	   			.catch(err => {alert(err)});

	}

	
	renderSellableStocks(sellable) {
		console.log('sellable ', sellable);
		console.log('sellable[0]', sellable);
		return _.map(sellable, item => {
			console.log('item', item[0]);
			console.log('item.symbol ', item[0].symbol);
			console.log('item', item);
			return (
				<div key={item[0].id}> 
					<div id="onclicktosell">
					<p id="floatleftsell"> {item[0].symbol},  Bidding Price: ${item[0].bid} </p> 
					<p id="floatrightsell" onClick={() =>{ this.onClickAdd(item[0])}}> + Click To Sell </p>
						
					</div>
				</div>
			);
		});
	}

	renderShares(field) {
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

	onSubmitQuantity(values) {
		console.log('values onSubmitQuantity ', values);
		const portId = sessionStorage.getItem('portId');
		const q = parseInt(values.quantity_of_shares);
		const selling_stock_id = sessionStorage.getItem('selling_stock_id');
		console.log('q >_>', q);
		const items = {
			portId: portId,
			quantityToBuy: q,
			stockId: selling_stock_id
		 }
		console.log('items to send to finalSell ', items);
		this.props.finalSell(items).then((response) => {
			console.log('finalSell backend response ', response.payload.data);
		});

	}

	render() {
		const { getStocks, stockToSell, finalSell } = this.props.getStocks;
		const { handleSubmit } = this.props;
		const portId = sessionStorage.getItem('portId');
		const selling_symbol = sessionStorage.getItem('selling_symbol');
		const pps_sell = sessionStorage.getItem('pps_sell');
		const selling_stock_id = sessionStorage.getItem('selling_stock_id');
		const selling_owned = sessionStorage.getItem('selling_owned');
		// console.log('selling_symbol here', selling_symbol);
		// console.log('pps_sell here', pps_sell);
		// console.log('selling_stock_id here', selling_stock_id);
		// console.log('selling owned here', selling_owned);
		// this.props.stockToSell(portId).then((response) => {
		// 	console.log('checking stocks to sell response ', response.payload.data);
		// });
		if(this.state.boolean) {
			return (
					<div className="sell_stocks">
						<form onSubmit={handleSubmit(this.onSubmitQuantity.bind(this))}>
							<h2>Sell your shares of {selling_symbol}</h2>
							<Field
								label="Sell Shares"
								name="quantity_of_shares"
								component={this.renderShares}
							/>
							<button className="btn btn-success" type="submit">Submit</button>
						</form>
					</div>
			);
		} else {		
			if(this.state.sellable.length === 0) {
				return (
					<div className="sell_stocks">
						<div className="sell_stock_content">
						<h4>Loading...</h4>
						</div>
					</div>
				);
			}
			return (
				<div className="sell_stocks">
					<div className="sell_stock_content">
						<p id="buy_component_title">Sell</p>
						{this.renderSellableStocks(this.state.sellable)}
					</div>
				</div>
			);
		}
	}
}

function validate(values) {
	// console.log('validate!!!');
	const errors = {};
	const stock_capital = sessionStorage.getItem('stock_capital');
	const portId = sessionStorage.getItem('portId');
	const selling_symbol = sessionStorage.getItem('selling_symbol');
	const pps_sell = sessionStorage.getItem('pps_sell');
	const selling_stock_id = sessionStorage.getItem('selling_stock_id');
	const selling_owned = sessionStorage.getItem('selling_owned');
	const pps_sell_almost = parseInt(pps_sell);
	const pps_sell_better = pps_sell_almost.toFixed(2);
	// console.log('stock_capital here @.@', stock_capital);
	// console.log('selling_symbol here', selling_symbol);
	// console.log('pps_sell here', pps_sell);
	// console.log('selling_stock_id here', selling_stock_id);
	// console.log('selling owned here', selling_owned);
	if (!values.quantity_of_shares) {
		errors.quantity_of_shares = 'Enter shares';
	}
	if (values.quantity_of_shares > selling_owned) {
		errors.quantity_of_shares = "Exceeds your shares of " + selling_symbol;
	}
	return errors;
}

export default reduxForm({
	validate,
	form: 'quantitySellForm'
})(SellStocks); 