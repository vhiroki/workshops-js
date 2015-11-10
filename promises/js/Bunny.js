(function () {

    function Bunny (options) {
        this.gridWrapper = options.gridWrapper;
        this.grid = options.grid;
        this.x = options.startX;
        this.y = options.startY;

        // initial position tile bbox
        var tileBbox = this.grid.getTile(this.x, this.y).svg.bbox();

        // create img element
        var bunnyImgWidth = 50;
        var bunnyImgHeight = 50;
        this.dom = $('<img>')
            //.attr('src', 'img/bunny.png')
            .attr('src', 'https://cdn.rawgit.com/vhiroki/workshops-js/master/promises/img/bunny.png')
            .css({
                position: 'absolute',
                top: (tileBbox.cy - bunnyImgHeight/2) + 'px',
                left: (tileBbox.cx - bunnyImgWidth/2) + 'px',
                width: '50px',
                height: '50px'
            });
        this.gridWrapper.append(this.dom);
    }

    ///////////////////////////////

    var boundaryCrossingError = 'Não é possível realizer esse movimento!';

    Bunny.prototype.moveUp = function (callback) {
        var deferred = Q.defer();

        var currentBbox = this.grid.getTile(this.x, this.y).svg.bbox();
        var currentTop = parseFloat(this.dom.css('top').slice(0, -2));

        this.y--;

        if (this.y < 0 || this.y >= this.grid.ySize) {
            if (callback) {
                callback(false, boundaryCrossingError);
            }
            return Q.reject(boundaryCrossingError);
        }

        var targetBbox = this.grid.getTile(this.x, this.y).svg.bbox();

        this.dom.animate({
            top: (currentTop + targetBbox.cy - currentBbox.cy)+'px'
        }, {
            duration: 750,
            easing: 'easeInOutQuart',
            queue: false,
            complete: function () {
                if (callback) {
                    callback(true);
                }
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    Bunny.prototype.moveRight = function (callback) {
        var deferred = Q.defer();

        var currentBbox = this.grid.getTile(this.x, this.y).svg.bbox();
        var currentLeft = parseFloat(this.dom.css('left').slice(0, -2));

        this.x++;

        if (this.x < 0 || this.x >= this.grid.xSize) {
            if (callback) {
                callback(false, boundaryCrossingError);
            }
            return Q.reject(boundaryCrossingError);
        }

        var tileBbox = this.grid.getTile(this.x, this.y).svg.bbox();

        this.dom.animate({
            left: (currentLeft + tileBbox.cx - currentBbox.cx)+'px'
        }, {
            duration: 750,
            easing: 'easeInOutQuart',
            queue: false,
            complete: function () {
                if (callback) {
                    callback(true);
                }
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    Bunny.prototype.moveDown = function (callback) {
        var deferred = Q.defer();

        var currentBbox = this.grid.getTile(this.x, this.y).svg.bbox();
        var currentTop = parseFloat(this.dom.css('top').slice(0, -2));

        this.y++;

        if (this.y < 0 || this.y >= this.grid.ySize) {
            if (callback) {
                callback(false, boundaryCrossingError);
            }
            return Q.reject(boundaryCrossingError);
        }

        var tileBbox = this.grid.getTile(this.x, this.y).svg.bbox();

        this.dom.animate({
            top: (currentTop + tileBbox.cy - currentBbox.cy)+'px'
        }, {
            duration: 750,
            easing: 'easeInOutQuart',
            queue: false,
            complete: function () {
                if (callback) {
                    callback(true);
                }
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    Bunny.prototype.moveLeft = function (callback) {
        var deferred = Q.defer();

        var currentBbox = this.grid.getTile(this.x, this.y).svg.bbox();
        var currentLeft = parseFloat(this.dom.css('left').slice(0, -2));

        this.x--;

        if (this.x < 0 || this.x >= this.grid.xSize) {
            if (callback) {
                callback(false, boundaryCrossingError);
            }
            return Q.reject(boundaryCrossingError);
        }

        var tileBbox = this.grid.getTile(this.x, this.y).svg.bbox();

        this.dom.animate({
            left: (currentLeft + tileBbox.cx - currentBbox.cx)+'px'
        }, {
            duration: 750,
            easing: 'easeInOutQuart',
            queue: false,
            complete: function () {
                if (callback) {
                    callback(true);
                }
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    Bunny.prototype.eatCarrot = function (callback) {
        var currentTile = this.grid.getTile(this.x, this.y);

        return currentTile.eatCarrot(callback);
    };

    Bunny.prototype.defecate = function (poop, callback) {
        var currentTile = this.grid.getTile(this.x, this.y);

        return currentTile.defecate(poop, callback);
    };

    //////////////////////////////

    window.Bunny = Bunny;

}());