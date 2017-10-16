import React, { Component } from 'react';
import { connect } from 'react-redux';
import './top_center_port.css';

class TopCenterPort extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		console.log('componentWillMount');

	}

	render() {
		return (
			<div className="top_center_port">
				<div className="top_center_port_content">
					<div>Top Center Port</div>
				</div>
			</div>
		);
	}
}

export default TopCenterPort;