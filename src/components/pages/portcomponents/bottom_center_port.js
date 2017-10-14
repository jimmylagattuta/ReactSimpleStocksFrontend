import React, { Component } from 'react';
import { connect } from 'react-redux';
import './bottom_center_port.css';

class BottomCenterPort extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		console.log('componentWillMount');
	}

	render() {
		return(
			<div className="bottom_center_port">
				<div className="bottom_center_port_content">
					<div>Bottom Center Port</div>
				</div>
			</div>
		);
	}
}

export default BottomCenterPort;