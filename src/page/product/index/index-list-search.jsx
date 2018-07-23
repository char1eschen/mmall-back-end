import React from 'react';

class ListSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchType: 'productId', //productId or productName
      searchKeyword: ''
    }
  }
  //when select search type
  onValueChange(e){
    let name = e.target.name,
        value = e.target.value.trim();
    this.setState({
      [name]: value
    });
  }
  //click search button
  onSearch(){
    this.props.onSearch(this.state.searchType, this.state.searchKeyword);
  }
  //input keyword and press enter
  onSearchKeywordKeyUp(e){
    if(e.keyCode === 13){
      this.onSearch();      
    }
  }
  render(){
    return(
      <div className="row search-wrap">
        <div className="col-md-12">
          <div className="form-inline">
              <div className="form-group">
                  <select 
                    name="searchType"
                    className="form-control" 
                    onChange={(e) => this.onValueChange(e)}>
                    <option value="productId">Search by product Id</option>
                    <option value="productName">Search by product name</option>
                  </select>
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  name="searchKeyword"
                  className="form-control" 
                  placeholder="Key words" 
                  onKeyUp={(e) => this.onSearchKeywordKeyUp(e)}
                  onChange={(e) => this.onValueChange(e)} />
              </div>
              <button 
                className="btn btn-primary"
                onClick={(e) => {this.onSearch()}}>Search</button>
            </div>
        </div>
      </div>
    );
  }
}

export default ListSearch;
