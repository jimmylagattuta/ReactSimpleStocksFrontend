import React from 'react';
import { Component } from 'react';
import { fetchStocks } from '../actions';
import { connect } from 'react-redux';


import SearchBar from './search_bar';
import SignInSignUp from './signinsignup';

class Homepage extends Component {
	componentWillMount() {
		console.log('sup yall');
		const { fetchStocks } = this.props;
		this.props.fetchStocks();
	}
  	render() {
  		const { fetchStocks } = this.props;

    	return (
    	  	<div className="Homepage">
    	  	  <SignInSignUp>
    	  	  </SignInSignUp>
      		  <SearchBar>
      		  </SearchBar>
    		</div>
    	);
  	}
}

	const mapStateToProps = (state) => {
		const { fetchStocks } = state;
		return { fetchStocks };
	}

export default connect(mapStateToProps, { fetchStocks })(Homepage);