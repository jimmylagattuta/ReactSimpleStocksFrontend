import React from 'react';
import { Component } from 'react';
import { fetchStocks, portCheck } from '../actions';
import { connect } from 'react-redux';


import SearchBar from './search_bar';
import SignInSignUp from './signinsignup';
import NewsColumn from './newscolumn';
import Portfolio from './portfolio';

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = { rerenderId: 0 }
  }
	componentWillMount() {
		console.log('sup yall');
    const userId = sessionStorage.getItem('userId');
		const { fetchStocks, portCheck } = this.props;
		this.props.fetchStocks();
    console.log('homepage userId');
    console.log(userId);

    if(userId !== 0 && userId !== null) {
      this.setState({ rerenderId: userId });
      console.log('rerenderId below, userId is not equal t zero');
      console.log(this.state.rerenderId);
    } else if(userId === null || userId === 0){
      this.setState({ rerenderId: 0 })
      console.log('rerenderId is zero');
      console.log(this.state.rerenderId);
    }
	}
  	render() {
  		const { fetchStocks, portCheck } = this.props;

    	return (
    	  	<div className="Homepage">
    	  	  <SignInSignUp>
    	  	  </SignInSignUp>
      		  <SearchBar>
      		  </SearchBar>
            <Portfolio portCheck={this.props.portCheck} />
            <NewsColumn>
            </NewsColumn>
    		</div>
    	);
  	}
}

	const mapStateToProps = (state) => {
		const { fetchStocks, portCheck } = state;
		return { fetchStocks, portCheck };
	}

export default connect(mapStateToProps, { fetchStocks, portCheck })(Homepage);