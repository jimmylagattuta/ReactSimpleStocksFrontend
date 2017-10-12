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
    const userId = sessionStorage.getItem('userId');
		const { fetchStocks, portCheck } = this.props;
		this.props.fetchStocks();
    if(userId !== 0 && userId !== null) {
      this.setState({ rerenderId: userId });
    } else if(userId === null || userId === 0){
      this.setState({ rerenderId: 0 })
    }
	}
  	render() {
  		const { fetchStocks, portCheck } = this.props;

    	return (
    	  	<div className="Homepage">
    	  	  <SignInSignUp>
    	  	  </SignInSignUp>
      		  <SearchBar fetchStocks={this.props.fetchStocks} />
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