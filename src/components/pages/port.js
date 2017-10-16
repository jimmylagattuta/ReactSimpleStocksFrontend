import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopLeftPort from './portcomponents/top_left_port';
import TopCenterPort from './portcomponents/top_center_port';
import TopRightPort from './portcomponents/top_right_port';
import BottomLeftPort from './portcomponents/bottom_left_port';
import BottomCenterPort from './portcomponents/bottom_center_port';
import BottomRightPort from './portcomponents/bottom_right_port';

class Port extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		console.log('componentWillMount');
	}

	render() {
		return (
			<div className="Port">
				<TopRightPort />
				<TopCenterPort />
				<TopLeftPort />
				<BottomLeftPort />
				<BottomCenterPort />
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

export default Port;