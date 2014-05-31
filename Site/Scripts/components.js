/** @jsx React.DOM */

var SearchPage = React.createClass({
    render: function() {
        return (
            <div>
                <h2>Search Page</h2>
            </div>
        );
    }
});

var LibraryPage = React.createClass({
    render: function() {
        return (
            <div>
                <h2>Library Page</h2>
            </div>
        );
    }
});

var AboutPage = React.createClass({
    render: function() {
        return (
            <div>
                <h2>About Page</h2>
            </div>
        );
    }
});

var SettingsPage = React.createClass({
    render: function() {
        return (
            <div>
                <h2>Settings Page</h2>
            </div>
        );
    }
});

var NotFoundPage = React.createClass({
    render: function() {
        return (
            <div>
                <h2>Not Found Page</h2>
            </div>
        );
    }
});

var PageContainer = React.createClass({
    render: function() {
        switch (this.props.activeMenu.name) {
            case "Search":
                return <SearchPage />;
            case "Library":
                return <LibraryPage />;
            case "About":
                return <AboutPage />;
            case "Settings":
                return <SettingsPage />;
            default:
                return <NotFoundPage />;
        }
    }
});

var MenuItem = React.createClass({
    handleClick: function() {
        this.props.onSelect(this.props.name);
    },
    render: function() {
        var menuColor = this.props.active ? 'red' : 'black';
        return (
            <li>
                <input type='button' style={{color: menuColor}} value={this.props.name} onClick={this.handleClick} />
            </li>
        );
    }
});

var MainMenu = React.createClass({
    handleSelect: function(menuName) {
        this.props.onMenuChange({ name: menuName});
    },
    render: function() {
        var rows = [];
        this.props.menus.forEach(function(menu) {
            rows.push(<MenuItem name={menu.name} active={menu.name === this.props.activeMenu.name} onSelect={this.handleSelect} />);
        }.bind(this));
        return <ul>{rows}</ul>;
    }
});

var WelcomeScreen = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Welcome with love!!! And live reload :)</h1>
                <h2>Splash uses Torrents to download files and content. Torrents may not be legal in your country, region, state, province or jurisdiction.</h2>
                <input type="text" placeholder="Your downloads folder.." />
                <input type="submit" value="Understood" />
            </div>
        );
    }
});

var App = React.createClass({
    handleMenuChange: function(menu) {
        var currentState = this.state;
        currentState.activeMenu = menu;
        this.setState(currentState);
    },
    getInitialState: function() {
        return {
            activeMenu: { name: 'Search' },
            setupComplete: false
        };
    },
    render: function() {
        if (this.state.setupComplete) {
            return (
                <div>
                    <MainMenu menus={this.props.menus} activeMenu={this.state.activeMenu} onMenuChange={this.handleMenuChange} />
                    <PageContainer activeMenu={this.state.activeMenu} />
                </div>
            );
        }
        else {
            return <WelcomeScreen />;
        }
    }
});
