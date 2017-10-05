import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchStock } from '../actions';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		
		this.state = { term: ""};

		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}
	componentWillMount() {
		const { searchStock } = this.props;
		// this.props.fetchStocks();
		// this.props.searchStock();
		console.log('this.props below');
		console.log(this.props);
	}
	onInputChange(event) {
		console.log(event.target.value);
		this.setState({ term: event.target.value });
	}
	onFormSubmit(event) {
		event.preventDefault();
		searchStock(this.state.term);
		this.setState({ term: '' });
	}

	render() {
		return (
			<form onSubmit={this.onFormSubmit} className="input-group">
				<input 
					placeholder="Enter Stock Symbol"
					className="form-control"
					value={this.state.term}
					onChange={this.onInputChange}
				/>
				<span className="input-group-btn">
					<button type="submit" className="btn btn-secondary">Submit</button>
				</span>
			</form>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ searchStock }, dispatch);
}


export default connect(null, mapDispatchToProps)(SearchBar);