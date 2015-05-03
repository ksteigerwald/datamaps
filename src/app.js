var BaseView = (function() {
    var $doc = '',
        $output = '';

    var actions = {
        doc: '',
        $output: '',
        template: function() {
            return $(this.doc).html();
        },

        render: function(data) {
            var output = Mustache.render(this.template(), data);
            $(this.$output).html(output);
        }
    }
    return actions;
}());

var CountsVirusView = (function(view) {

    view.doc = '#tmp-counts';
    view.$output = '#virus-count';

    var mock = {
        list: [{
            name: 'spam',
            count: 0
        }]
    }

    var _parse = function(data, key) {
            return {
                name: key,
                count: data[key]
            };
        },

        _update = function() {
            var data = Server.log().viruses;
            var list = Object.keys(data).map(_parse.bind(this, data));
            view.render({
                list: list
            });
        },

        _subscribe = function() {
            $(window).bind('data:pushed', _update)
        };

    var actions = {
        setup: function() {
            _subscribe();
            view.render(mock);
        }
    }

    return actions;
}($.extend({}, BaseView)));


var CountsInfectionView = (function(view) {

    view.doc = '#tmp-counts';
    view.$output = '#infected-count';

    var mock = {
        list: [{
            name: 'spam',
            count: 0
        }]
    }

    var _parse = function(data, key) {
            return {
                name: key,
                count: data[key]
            };
        },

        _update = function() {
            var data = Server.log().servers;
            var list = Object.keys(data).map(_parse.bind(this, data));
            view.render({
                list: list
            });
        },

        _subscribe = function() {
            $(window).bind('data:pushed', _update)
        };

    var actions = {
        setup: function() {
            _subscribe();
            view.render(mock);
        }
    }

    return actions;

}($.extend({}, BaseView)));


var TableView = (function(view) {

    view.doc = '#tmp-table';
    view.$output = 'table > tbody';

    var mock = {
        data: [{
            ip: '127.0.0.1',
            owner: 0
        }]
    }
    var _parse = function(data, key) {
            return $.extend({}, {
                ip: key
            }, data[key]);
        },

        _update = function() {
            var data = Server.memory();
            var list = Object.keys(data).map(_parse.bind(this, data));
            view.render({
                data: list
            });
        },

        _subscribe = function() {
            $(window).bind('data:pushed', _update)
        };

    var actions = {
        setup: function() {
            _subscribe();
            view.render(mock);
        }
    }

    return actions;
}($.extend({}, BaseView)));

var MapView = (function() {
    var doc = '#tmp-popup';


    var actions = {
        template: function() {
            return $(doc).html();
        },

        setup: function() {
            this.render();
            $(window).bind('data:pushed', this.bub.bind(this))
        },

        render: function() {
            this.map = new Datamap({
                element: document.getElementById('usofa'),
                scope: 'usa',
                highlightOnHover: false,
                popupOnHover: false,
                fills: {
                    defaultFill: 'rgba(230, 227, 227, .75)'
                },
                geographyConfig: {},
                bubblesConfig: {
                    borderWidth: 2,
                    borderColor: 'rgba(230, 92, 17, .75)',
                    highlightFillColor: 'rgba(230, 92, 17, .75)'
                }
            });
        },

        list: function() {

            var keys = Object.keys(Server.memory()),
                items = Server.memory();

            return keys.map(function(v) {

                var item = items[v],
                    geo = item.geo.split(',');

                return {
                    name: v,
                    radius: 5,
                    viruses: item.viruses.join(','),
                    company: item.owner,
                    server: item.servers,
                    latitude: Number(geo[0]),
                    longitude: Number(geo[1])
                }
            });
        },

        bub: function() {
            var self = this;
            this.map.bubbles(this.list(), {
                popupTemplate: function(geo, data) {
                    return Mustache.render(self.template(), data);
                }
            });
        }

    }
    return actions;
}());
$(function() {

    Server.start(5000, function() {
        $(window).trigger('data:pushed');
    });

    MapView.setup();
    CountsVirusView.setup();
    CountsInfectionView.setup();
    TableView.setup();
    Server.init();
});
