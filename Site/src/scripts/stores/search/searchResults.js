
var SearchResults = function(category) {
    this.category = category;
    this.page = 0;
    this.pageSize = 0;
    this.items = [];
    this.status = "";
};

module.exports = SearchResults;