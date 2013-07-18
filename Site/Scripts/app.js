createApp = function () {
    var self = {
        initialize: function () {
            $.get("/initialize", function (data) {
                if (data.success)
					window.location = "/search";
            });
        }
    };

    return self;
};

var app = createApp();

