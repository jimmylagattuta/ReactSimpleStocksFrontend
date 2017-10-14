import React, { Component } from 'react';
import { connect } from 'react-redux';
import './bottom_right_port.css';

class BottomRightPort extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		console.log('componentWillMount');
	}

	render() {
		return (
			<div className="bottom_right_port">
				<div className="bottom_right_port_content">
					<div>Bottom Right Port</div>
				</div>
			</div>

		);
	}
}

export default BottomRightPort;