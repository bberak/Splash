
var SearchResultModel = function(name, size, seeds, url) {
    this.name = name;
    this.size = size;
    this.seeds = seeds;
    this.url = url;
    this.clicked = false;

    this.click = function() {
        this.clicked = true;
    };
};

module.exports = SearchResultModel;