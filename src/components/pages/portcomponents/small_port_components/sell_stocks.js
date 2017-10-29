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
		const { getStocks, stockToSell } = this.props;
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
			console.log('stockToSell ', response);
		});
	}

	onClickAdd(item) {
		console.log('onClickAdd ', item);
		this.setState({ boolean: true });
			axios.post('http://localhost:3000/api/v1/port_stocks/save_to_sell', { "data": item })
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

	render() {
		const { getStocks, stockToSell } = this.props.getStocks;
		const { handleSubmit } = this.props;
		if(this.state.boolean) {
			return (
					<div className="sell_stocks">

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
						<h1>Sell Stocks! :)</h1>
						{this.renderSellableStocks(this.state.sellable)}
					</div>
				</div>
			);
		}
	}
}

function validate(values) {
	const errors = {};
	const stock_capital = sessionStorage.getItem('stock_capital');
	console.log('stock_capital here @.@', stock_capital);
	if (!values.quantity_of_shares) {
		errors.cash_capital = 'Enter Number of Shares';
	}
	return errors;
}

export default SellStocks;