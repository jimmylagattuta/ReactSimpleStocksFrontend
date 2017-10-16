import React, { Component } from 'react';
import { connect } from 'react-redux';
import './top_right_port.css'

class TopRightPort extends Component {
	constructor(props) {
		super(props);

	}

	componentWillMount() {
		console.log('componentWillMount');
	}

	render() {
		return (
			<div className="top_right_port">
				<div className="top_right_port_content">
					<div> Top Right Port </div>
				</div>
			</div>
		);
	}
}

export default TopRightPort;