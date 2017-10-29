import React, { Component } from 'react';
import { connect } from 'react-redux';
import { portCheck, fetchStocks, addStocks, cartedStocks, getStocks, stockToSell } from '../actions';
import TopLeftPort from './pages/portcomponents/top_left_port';
import TopCenterPort from './pages/portcomponents/top_center_port';
import TopRightPort from './pages/portcomponents/top_right_port';
import BottomLeftPort from './pages/portcomponents/bottom_left_port';
import BottomCenterPort from './pages/portcomponents/bottom_center_port';
import BottomRightPort from './pages/portcomponents/bottom_right_port';
import axios from 'axios';


class Port extends Component {
	constructor(props) {
		super(props);
		this.state = { portfolio: [] }

	}

	componentWillMount() {
   		const userId = sessionStorage.getItem('userId');
   		const portId = sessionStorage.getItem('portId');
		const { portCheck, fetchStocks, addStocks, cartedStocks, getStocks, stockToSell } = this.props;
		this.props.portCheck(userId);
	}

	render() {
		const { portCheck, fetchStocks, addStocks, cartedStocks, getStocks, stockToSell } = this.props;
		return (
			<div className="Port">
				<TopRightPort />
				<TopCenterPort fetchStocks={this.props.fetchStocks} addStocks={this.props.addStocks} getStocks={this.props.getStocks} stockToSell={this.props.stockToSell}/>
				<TopLeftPort portCheck={this.props.portCheck} />
				<BottomLeftPort />
				<BottomCenterPort cartedStocks={this.props.cartedStocks} />
				<BottomRightPort />
				<div id="to_home_page">						
					<form action="http://localhost:3001">
    					<input type="submit" value="Home Page" />
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { portCheck, fetchStocks, addStocks, cartedStocks, getStocks, stockToSell } = state;
	return { portCheck, fetchStocks, addStocks, cartedStocks, getStocks, stockToSell };
}

export default connect(mapStateToProps, { portCheck, fetchStocks, addStocks, cartedStocks, getStocks, stockToSell })(Port);