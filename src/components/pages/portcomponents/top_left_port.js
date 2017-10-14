import React, { Component } from 'react';
import { connect } from 'react-redux';
import './top_left_port.css';

class TopLeftPort extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		console.log('componentWillMount');
	}

	render() {
		return (
			<div className="top_left_port">
				<div className="top_left_port_content">
					<div>Top Left Port</div>
				</div>
			</div>

		);
	}
}

export default TopLeftPort;