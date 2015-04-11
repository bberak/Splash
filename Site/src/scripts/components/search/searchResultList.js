/** @jsx React.DOM */

var React = require("react");
var _ = require("lodash");
var SearchResultItem = require("./searchResultItem.js");
var Infinite = require("react-infinite");
var SearchStatus = require("constants.js").searchStatus;

var SearchResultList = React.createClass({

	getDefaultProps: function() {
		return {
			category: "Unknown",
            status: SearchStatus.NONE,
			items: []
		};
	},

    scrollToBottom: function() {
        if (this.props.onPageList)
            this.props.onPageList(this.props.query, this.props.category, this.props.page + 1);
    },

    getHeader: function() {
        if (!this.props.query)
            return <div />;

        return <h3>{this.props.category}</h3>;
    },

    getList: function() {
        if (!this.props.query)
            return <div />;

        if (this.props.status === SearchStatus.SEARCHING)
            return <div>Searching</div>;

        if (this.props.status === SearchStatus.ERROR)
            return <div>Error</div>;

        if (this.props.query && this.props.query.length > 0 && this.props.items.length == 0)
            return <div>No results</div>;

        var searchResultItems = _.map(this.props.items, function(i) {
            return <SearchResultItem name={i.name} key={i.url} />;
        });

        var list = (<Infinite elementHeight={18} 
                    containerHeight={250} 
                    infiniteLoadBeginBottomOffset={100} 
                    isInfiniteLoading={this.props.status === SearchStatus.PAGING }>    
                    {searchResultItems}
                </Infinite>);

        if (!this.props.endOfList) {
            list.props.onInfiniteLoad = this.scrollToBottom;
            list.props.loadingSpinnerDelegate = <div>Loading...</div>; 
        }
        
        return list;
    },

    render: function() {   
        return (
        	<div>
        		{this.getHeader()}
                {this.getList()}
            </div>
        );
    }
});

module.exports = SearchResultList;