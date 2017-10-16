import React, { Component } from 'react';
import { connect } from 'react-redux';

import './bottom_left_port.css';

class BottomLeftPort extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		console.log('componentWillMount');
	}

	render() {
		return (
			<div className="bottom_left_port">
				<div className="bottom_left_port_content">
					<div>Bottom Left Port</div>
				</div>
			</div>
		);
	}
}

export default BottomLeftPort;