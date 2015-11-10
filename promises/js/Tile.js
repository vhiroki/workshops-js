(function () {

    function Tile (options) {

        this.draw = options.draw;
        this.grid = options.grid;
        this.width = options.width;
        this.height = options.height;
        this.xPos = options.xPos;
        this.yPos = options.yPos;
        this.color = options.color;
        this.svg = renderTile(this);
        this.carrot = options.hasCarrot ? renderCarrot(this) : null;
    }

    var noCarrotMessage = 'Não há cenouras para comer aqui!';

    Tile.prototype.eatCarrot = function (callback) {
        var deferred = Q.defer();

        var self = this;

        if (this.carrot) {
            this.carrot
                .animate(2000, '>')
                .attr({'fill-opacity': 0})
                .after(function () {

                    var poop = self.draw.use('poop', 'https://cdn.rawgit.com/vhiroki/workshops-js/master/promises/img/poop.svg');
                    poop.size(30, 30);
                    poop.hide();

                    if (callback) {
                        callback(poop);
                    }

                    deferred.resolve(poop);
                });
        } else {
            if (callback) {
                callback(false, noCarrotMessage);
            }
            return Q.reject(noCarrotMessage);
        }
        return deferred.promise;
    };

    Tile.prototype.defecate = function (poop, callback) {
        var deferred = Q.defer();

        var tileBbox = this.svg.bbox();
        var poopCenterPos = [tileBbox.x + 10, tileBbox.y2 - 10];
        poop.show();
        poop.scale(0.01, 0.01, poopCenterPos[0], poopCenterPos[1]);
        poop.center(poopCenterPos[0], poopCenterPos[1]);

        poop
            .animate(1000, SVG.easing.elastic)
            .scale(1, 1, poopCenterPos[0], poopCenterPos[1])
            .after(function () {
                if (callback) {
                    callback();
                }
                deferred.resolve();
            });

        return deferred.promise;
    };

    function renderTile (tile) {
        var rect = tile.draw
            .rect(tile.width, tile.height)
            .attr({
                fill: tile.color,
                x: tile.xPos * ( tile.width + tile.grid.marginWidth ),
                y: tile.yPos * ( tile.height + tile.grid.marginWidth )
            });

        return rect;
    }

    function renderCarrot (tile) {
        var tileBbox = tile.svg.bbox();
        var carrot = tile.draw.use('carrot', 'https://cdn.rawgit.com/vhiroki/workshops-js/master/promises/img/carrot.svg');
        carrot.size(50, 50);
        carrot.center(tileBbox.x2 - 10, tileBbox.y + 10);

        return carrot;
    }

    window.Tile = Tile;

}());