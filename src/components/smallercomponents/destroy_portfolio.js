import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './destroy_portfolio.css';
import axios from 'axios';

class DestroyPortfolio extends Component {
	constructor(props) {
		super(props);

		this.state = { visible: false,
					   visible_two: false }

		this.openDestroy = this.openDestroy.bind(this);
		this.openDestroyTwo = this.openDestroyTwo.bind(this);
		// this.destroyClick = this.destroyClick.bind(this);
		this.falseAll = this.falseAll.bind(this);
	}

	componentWillMount() {
		const { destroyPortfolio } = this.props;
		const userId = sessionStorage.getItem('userId');
		if(userId > 0) {	
			axios.post('http://localhost:3000/api/v1/port/port_check', { "id": userId })
	   			.then(response => {
	   			const placeholder = response['active'];
	   			if(placeholder !== true) {
	   				this.falseAll();
	   			}
	   		});
		}
	}

	openDestroy() {
		if(this.state.visible === false) {
			this.setState({ visible: true });
		} else if(this.state.visible === true) {
			this.setState({ visible: false });
		}
	}
	openDestroyTwo() {
		if(this.state.visible_two === false) {
			this.setState({ visible_two: true });
		} else if(this.state.visible_two === true) {
			this.setState({ visible_two: false });
		}
	}
	destroyClick() {
		const userId = sessionStorage.getItem('userId');
		axios.post('http://localhost:3000/api/v1/port/destroy', { 'id': userId })
			.then(payload => {
				window.location = "http://localhost:3001";
			})
			.catch(err => {alert(err)});

	}

	falseAll() {
		console.log('falseAll');
			this.setState({
				location: {
					visible: false 
				}
			}, () => console.log(this.state.visible));
			this.setState({
				location: {
					visible_two: false
				}
			}, () => console.log(this.state.visible_two));

	}

	render() {
		const { destroyPortfolio } = this.props;
		if(this.state.visible === false && this.state.visible_two === false) {
			return (
				<div className="destroy">
					<h3 onClick={this.openDestroy}>Destroy!</h3>
				</div>
			);
		} else if(this.state.visible === true && this.state.visible_two === false) {
			return (
				<div className="destroy">
					<h4>Are you sure you want to destroy your Portfolio? This cannot be undone.</h4>
					<p onClick={this.openDestroyTwo}>Yes</p>
					<p onClick={this.openDestroy}>No</p>
				</div>

			);
		} else if(this.state.visible === true && this.state.visible_two === true) {
			return (
				<div className="destroy">
					<h3 onClick={this.destroyClick.bind(this)}>***DESTROY PORTFOLIO***</h3>
				</div>
			);
		}
	}
}


export default DestroyPortfolio;