import React from 'react';
import { Component } from 'react';
import { fetchStocks, portCheck, cartedStocks, addStocks, getStocks, stockToSell, finalSell } from '../actions';
import { connect } from 'react-redux';


import SearchBar from './search_bar';
import SignInSignUp from './signinsignup';
import NewsColumn from './newscolumn';
import Portfolio from './portfolio';
import TopCenterPort from './pages/portcomponents/top_center_port';
import BottomCenterPort from './pages/portcomponents/bottom_center_port';

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = { rerenderId: 0 }
  }
	componentWillMount() {
    const userId = sessionStorage.getItem('userId');
		const { fetchStocks, portCheck, cartedStocks, addStocks, getStocks, stockToSell, finalSell } = this.props;
		this.props.fetchStocks();
    if(userId !== 0 && userId !== null) {
      this.setState({ rerenderId: userId });
    } else if(userId === null || userId === 0){
      this.setState({ rerenderId: 0 })
    }
	}
  	render() {
  		const { fetchStocks, portCheck, cartedStocks, addStocks, getStocks, stockToSell, finalSell } = this.props;

    	return (
    	  	<div className="Homepage">
    	  	  <SignInSignUp>
    	  	  </SignInSignUp>
      		  <SearchBar fetchStocks={this.props.fetchStocks} />
            <Portfolio portCheck={this.props.portCheck} />
            <NewsColumn>
            </NewsColumn>
            <TopCenterPort fetchStocks={this.props.fetchStocks} addStocks={this.props.addStocks} getStocks={this.props.getStocks} stockToSell={this.props.stockToSell} finalSell={this.props.finalSell}/>
            <BottomCenterPort cartedStocks={this.props.cartedStocks} />
    		</div>
    	);
  	}
}

	const mapStateToProps = (state) => {
		const { fetchStocks, portCheck, cartedStocks, addStocks, getStocks, stockToSell, finalSell } = state;
		return { fetchStocks, portCheck, cartedStocks, addStocks, getStocks, stockToSell, finalSell };
	}

export default connect(mapStateToProps, { fetchStocks, portCheck, cartedStocks, addStocks, getStocks, stockToSell, finalSell })(Homepage);