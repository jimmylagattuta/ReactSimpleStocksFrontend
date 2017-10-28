import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import './bottom_center_port.css';

class BottomCenterPort extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cart_boolean: false,
			symbols: [],
			budget: 0,
			price_per_share: 0,
			info_state: [],
			term: "",
			ready: false
		}

		this.totalRender = this.totalRender.bind(this);
	}

	componentWillMount() {
		// console.log("Quantity");
		const string_budget = sessionStorage.getItem('budget');
		const budget = parseInt(string_budget);
		// console.log('BUDGET HERE CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC', budget);
		const portId = sessionStorage.getItem('portId');
		const { cartedStocks } = this.props;
   		const { handleSubmit } = this.props;
   		const info_to_render = [];

		this.props.cartedStocks(portId).then((response) => {
			if(response.payload.data[0]) {
				// console.log('response id ~~>', response.payload.data[0].id);
				const stocks_for_state = response.payload.data;
				const stocks_for_state_first_parse = response.payload.data[0];
				const stocks_for_state_second_parse = stocks_for_state_first_parse['symbol'];
				// console.log('stocks_for_state_second_parse here', stocks_for_state_second_parse);
				this.setState({ cart_boolean: true });
				this.setState({ symbols: stocks_for_state_second_parse });
				this.setState({ budget: budget });
				sessionStorage.setItem('pps', response.payload.data[0]['ask']);
  		    	sessionStorage.setItem('portStockId', response.payload.data[0]['portStockId'])
			}
			 else {
			 	this.setState({ cart_boolean: false });
			};
			const pps = sessionStorage.getItem('pps');
			this.setState({ price_per_share: pps });
			// console.log('state cart boolean', this.state.cart_boolean);
			// console.log('state symbols', this.state.symbols);
			// console.log('state budget', this.state.budget);
			// console.log('pps set here', this.pps);

		});

	}








	onInputChange(event) {
		// console.log(event.target.value);
		this.setState({ term: event.target.value });
	}

	renderQuantityField(field) {
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

	onSubmitBuy(values) {
		// console.log('value below quantity', values);
   		const portId = sessionStorage.getItem('portId');
   		const string_budget = sessionStorage.getItem('budget');
		const budget = parseInt(string_budget);
		const pps_string = sessionStorage.getItem('pps');
		const pps = parseInt(pps_string);

		// console.log('prt id and budget', portId, budget)
		const package_to_send = {
			values: values,
			portId: portId,
			budget: budget,
			pps: pps
		}
		// console.log('package_to_send', package_to_send);
		axios.post('http://localhost:3000/api/v1/port/buy_stocks', package_to_send)
			.then(payload => {
				// console.log('payload', payload);	
			})
			.catch(err => {alert(err)});
		this.totalRender(package_to_send);
	}

	finalAPICall(values) {
		// console.log('value below quantity', values);
   		const portId = sessionStorage.getItem('portId');
   		const string_budget = sessionStorage.getItem('budget');
		const budget = parseInt(string_budget);
		const pps_string = sessionStorage.getItem('pps');
		const pps = parseInt(pps_string);
		const portStockId = sessionStorage.getItem('portStockId');

		// console.log('prt id and budget', portId, budget)
		const package_to_send = {
			values: values,
			portId: portId,
			budget: budget,
			pps: pps,
			portStockId: portStockId
		}
		// console.log('package_to_send', package_to_send);
		axios.post('http://localhost:3000/api/v1/port/buy_stocks_finalize', package_to_send)
			.then(payload => {
				console.log('payload', payload);	
			})
			.catch(err => {alert(err)});
		this.totalRender(package_to_send);
		this.setState({ ready: false });
		window.location = "http://localhost:3001";


	}

	totalRender(info) {
		// console.log('totalRender info', info);
   		const portId = sessionStorage.getItem('portId');
		const quan = parseInt(info.values.quantity);
		const pps_string = sessionStorage.getItem('pps');
		const pps = parseInt(pps_string);
		const before_commission_total = pps * quan;
 		const commission = before_commission_total * 0.05
		const total = before_commission_total + commission
		// console.log('b4 TOTAL HERE :)))))', before_commission_total);
		const new_commission = commission.toFixed(2);
		// console.log('new_commision here', new_commission);
		const new_total = total.toFixed(2);
		// console.log('FINAL TOTAL HERE!!!!', new_total);
		const information = {
			quantity: quan,
			commission: new_commission,
			total: new_total,
			portId: portId
		}
		this.info_to_render = information;
		// console.log('info to render here', this.info_to_render);
		this.setState({ ready: true });
	}


	render() {
	    const { handleSubmit } = this.props;
		// console.log('this.info_to_render in render', this.info_to_render);
	    if (!this.state.symbols) {
			<div className="bottom_center_port">
				<div className="bottom_center_port_content">
					<h2> Loading... </h2>
				</div>
			</div>
	    } else {
	    	// console.log('this.state symbols', this.state.symbols);	    	
	    }

		if(this.state.cart_boolean && !this.state.ready) {
			return (
				<div>
					<div className="bottom_center_port">
						<div className="bottom_center_port_content">
							<h2 id="symbol_to_buy_shares">{this.state.symbols}
							<p id="pps_to_buy_shares">price per share ${this.state.price_per_share}</p>
							</h2>
							<form onSubmit={handleSubmit(this.onSubmitBuy.bind(this))}>
								<Field
									label="Shares "
									name="quantity"
									component={this.renderQuantityField}
									value={this.state.term}
									onChange={this.onInputChange.bind(this)}
								/>
								{renderCriteria(this.info_to_render)}
								<div id="buy_stocks_button">
									<button className="btn btn-success" type="submit">Calculate</button>
								</div>
							</form>
							<div id="render_criteria">
							</div>						
						</div>
					</div>
				</div>
			);
		} else if(this.info_to_render && this.state.ready) {
			return (
				<div>
					<div className="bottom_center_port">
						<div className="bottom_center_port_content">
							<h2 id="symbol_to_buy_shares">{this.state.symbols}
							<p id="pps_to_buy_shares">price per share ${this.state.price_per_share}</p>
							</h2>
							<div id="finalize_form">
								<form onSubmit={handleSubmit(this.onSubmitBuy.bind(this))}>
									<Field
										label="Shares "
										name="quantity"
										component={this.renderQuantityField}
										value={this.state.term}
										onChange={this.onInputChange.bind(this)}
									/>
									<div id="buy_stocks_button">
										<button className="btn btn-success" type="submit">Calculate</button>
									</div>
									{renderCriteria(this.info_to_render)}
									<div id="buy_stocks_button_finalize">
										<p><span onClick={() => { this.finalAPICall(this.info_to_render)}}> Finalize </span> </p>
									</div>
								</form>
								<div id="render_criteria">
								</div>
							</div>						
						</div>
					</div>
				</div>
			);
		}
		else {
			return(
				<div className="bottom_center_port">
					<div className="bottom_center_port_content">
						<h1>Buy Selected Shares</h1>
					</div>
				</div>
			);
		}
	}
}


const renderCriteria = (info) => {
	if(info) {
		// console.log('info renderCriteria', info);
		const pps_string = sessionStorage.getItem('pps');
		const almost_pps = parseInt(pps_string);
		const new_pps = almost_pps.toFixed(2);
		const key = info.portId;
		const new_key = parseInt(key);
		const commission = info.commission;
		const almost_commission = parseInt(commission);
		const new_commission = almost_commission.toFixed(2);
		const total = info.total;
		const almost_total = parseInt(total);
		const new_total = almost_total.toFixed(2);
		return (
			<div key={new_key}>
				<div id="total_render">
					<p id="shares_left"><span>Price Per Share </span>${new_pps}, <span>Shares </span>{info.quantity}</p> 
					<p id="shares_right"><span>Commission of Purchase(0.05%)</span>${new_commission}, <span>Total</span>${new_total}</p>
				</div>
			</div>
		);
	}
}

function validate(values) {
   	const string_budget = sessionStorage.getItem('budget');
   	const budget = parseInt(string_budget);
	const pps_string = sessionStorage.getItem('pps');
	const pps = parseInt(pps_string);
	const portId = sessionStorage.getItem('portId');
   	// console.log('budget', budget);
   	// console.log('pps', pps);
   	// console.log('values quantity', values.quantity);
   	// console.log('values', values);
   	// console.log('CALCULATION', pps * values.quantity)
   	const info = {
   		pps: pps,
   		quantity: values.quantity,
   		budget: budget,
   		portId: portId
   	}
	const errors = {};
	if (!values.quantity) {
		errors.quantity = 'How Many Shares would you like to buy?';
	}
	if ((pps * values.quantity) > (budget)) {
		errors.quantity = 'Shares expense is larger than your budget!';
	}


	return errors;
}

export default reduxForm({
	validate,
	form: 'buyStocksForm'
})(
	connect(null)(BottomCenterPort)
);

