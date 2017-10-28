import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './top_center_port.css';

class TopCenterPort extends Component {
	constructor(props) {
		super(props);

		this.state = { stateStocks: [],
					   cart: [],
					   boolean: false,
					   stocks_to_buy: [],
					   ready_to_buy: false,
						sellStocks: false

					}
	
		this.addCart = this.addCart.bind(this);
		this.sendStocksToRender = this.sendStocksToRender.bind(this);
		this.renderTheStocks = this.renderTheStocks.bind(this);
		this.sendToBuyShare = this.sendToBuyShare.bind(this);
	}

	componentWillMount() {
		const { fetchStocks, addStocks } = this.props;
		this.stockCart = [];
		if(this.state.stateStocks.length === 0 && this.state.cart.length === 0) {
			this.props.fetchStocks().then((response) => {
				console.log('~~>', response.payload.data);
				this.stocks = response.payload.data;
				// this.setState({ stateStocks: stocks });
				if(this.state.boolean === false) {
					this.sendStocksToRender(this.stocks);
				}
			});
		}

	}
			

	renderTheStocks(stocks) {
		return _.map(stocks['stocks'], stock => {
			const { handleSubmit } = this.props;
			return(
				<div key={stock['id']}>
					<div id="stock_rendering">
						<p id="render_onclicks">{stock['symbol']}, Asking Price: {stock['asking_price']} <span onClick={() => { this.addCart(stock)}}> + Add To Cart </span> </p>
					</div>
					<div id="cart_to_send">
					</div>
				</div>
			);
		});
	}

	sendStocksToRender(stocks) {
		this.setState({ stateStocks: stocks });
		this.setState({ boolean: true });
	}

	addCart(stock) {
		// console.log('addCart function running');
		// console.log('stock aside', stock);
		const symbol = stock.symbol;
		// console.log('symbol below', symbol);
		// const cart_of_stocks = [];
		// console.log('this.cart_of_stocks', cart_of_stocks);
		// cart_of_stocks.push(stock.symbol);
		// console.log('this.cart_of_stocks', cart_of_stocks);
		// console.log('this.stock_cart', this.stockCart);
		if(!this.stockCart.includes(symbol + " ")) {
			if(this.stockCart.length === 0) {
				this.stockCart.push(symbol + " ");
			}
		}
		// console.log('this.stock_cart', this.stockCart);
		this.setState({ ready_to_buy: true });
	}

	sendToBuyShare(stocks) {
		// console.log('sendToBuyShare');
   		const portId = sessionStorage.getItem('portId');
		// console.log('stocks sendToBuyShare', stocks);
		const stocks_and_port_id = {
			stocks_by_symbol: stocks,
			portId: portId
		}
		// console.log('stocks_and_port_id below');
		// console.log(stocks_and_port_id);
		this.props.addStocks(stocks_and_port_id).then((response) => {
			// console.log('addStocks sent, vary nyce', response.payload.data);
		});
		window.location = "http://localhost:3001";
	}


	onClickSell() {
		console.log('onClickSell');
		if(this.state.sellStocks) {
			this.setState({ sellStocks: false });
		} else {
			this.setState({ sellStocks: true });
		}
	}

	render() {
		const portId = sessionStorage.getItem('portId');

		// if(this.stockCart.length <= 0) {
		// 	return (
		// 		<div className="top_center_port">
		// 			<div className="top_center_port_content">
		// 				<h4 id="loading">Loading...</h4>
		// 			</div>
		// 		</div>
		// 	);
		// }
		const { fetchStocks } = this.props;
		if(!this.state.sellStocks) {

			if((this.stockCart.length > 0) && (portId !== null)) {
				return (
					<div className="top_center_port">
						<div className="top_center_port_content">
							<div id="buy_component_title">Select Stocks to Buy</div>
							{this.renderTheStocks(this.state.stateStocks)}
								<div id="stockCart">{this.stockCart} ~> <span id="sendCart" onClick={() => {this.sendToBuyShare(this.stockCart)}}>Buy Shares</span></div>
						</div>
					</div>
				);
			} else if((portId !== null)) {
				return(
					<div className="top_center_port">
						<div className="top_center_port_content">
							<p id="sell_stocks" onClick={this.onClickSell.bind(this)}> Sell </p>
							<div id="buy_component_title">Select Stocks to Buy</div>
							{this.renderTheStocks(this.state.stateStocks)}

						</div>
					</div>
				);
			} else if(portId === null) {
				return(
					<div className="top_center_port">
						<div className="top_center_port_content">
							<h2>Start Your Port to Buy Stocks!</h2>
							<p id="sell_stocks" onClick={this.onClickSell.bind(this)}> Sell </p>
						</div>
					</div>
				);
			}
		} else if(this.state.sellStocks) {
			return(
				<div className="top_center_port">
					<div className="top_center_port_content">
						<p id="sell_stocks" onClick={this.onClickSell.bind(this)}> Buy </p>
						<h1>Sell Stocks!</h1>
					</div>
				</div>
			);
		}
	}
}


export default TopCenterPort;


// <span onSelect={handleSubmit(this.addCart(stock))}>  + Add To Cart </span>