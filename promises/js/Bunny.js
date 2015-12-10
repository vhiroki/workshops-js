(function () {

    var boundaryCrossingError = 'Não é possível realizer esse movimento!';

    function createBunny (options) {
        var gridWrapper = options.gridWrapper;
        var grid = options.grid;
        var x = options.startX;
        var y = options.startY;

        // initial position tile bbox
        var tileBbox = grid.getTile(x, y).svg.bbox();

        // create img element
        var bunnyImgWidth = 50;
        var bunnyImgHeight = 50;
        var dom = $('<img>')
            //.attr('src', 'img/bunny.png')
            .attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEK0lEQVR4Xu2bgXHVMAxA1QlgA2CCwgTQCaATlE4ATABMAEwAG9BOAJ0AmACYgHYCuJeLONffsS3byXfS+u5fe/2JLT1Lsiy7B3LD28EN119uAazEAh6KyKWI/Got7xos4JmIfB4VPxOR0xFGExa9AXgjIq9HBfn9g4i8FJF3jrbfReSoFYTeAHwVkceOsp9GCN+86QbCoxYm0BsAtQBXt7ci8lxE7nkK83eer2q9ASDY+bONguci8jSg6YPawNgbAHT03YC/sQLcDQDgWeJBcesRAOb+0aARAABR1HoEoDN+J1MjcgNcoaj1CuC9iLwwaFQcEHsFcF9EfhoAECNYFs2ZYq8A0J21/tAAoSgg9gzAGgyVFeBImckisYxo6xkAy96flAKR73GH49GSJh/rGQBCM5OhBMjChc0TKXWw9Q6g1A18ZQmQuMZOmwuAbmiI5ny04ZMI8jszYte6gTtucJVoBQBBMVX27k8m0lafvsIgevO5mLBS62owZe3BVaIWAIqTsLBnD+XqFl9Vn8fv2fxoBA/tDUL9Xo3wAebXEPT5nYSpBgD+SaGiheIhhQhcKMOWN2cMLAjro8USqWvxoBQAmxUA9NTcbHDKApCX5REIg4WVAKA+h6/32qa2zq68WBfLoxlAjzNfOhEkSWcWC4iZVakQ+3xv2EbnAiCoUKrKCUb7VMo69mkuAHzmxNr7Cp6/yAHA0vJlBcqUiHiZA6DFhqREuCXeuUoBsFZmlhC65RjnKQDW2lxL4Zbo6ygFgMjPYcUW23DuGAPQaivaIzw9dI1mgluM/tQhSOgI7EOLWUDooLLH2cyRia0y8YzPtUJpDMAWkh9mHD12FM+xgNxCRM4MLP3Mj3HHmjwoiVkAJzNuPW9pJWrGc4sj0X4UAEVMv1D5t0aCPb/7ajT7pBgAcO/lUCTQCLlmAJNlcJ8IAHxT14OEtQLINn9dBkOKAsFySSFpags+YLowgQWwLuZeRlhQj6KhKKeb6pUA2MJ6Dy2SHVat5ImwixYAUzeziqZgjy+ZTN9PhNZuBdET4NikaB7Azo+saY2xoFh5fzO0NlfA5wl4xVfkQrvBVufxc4cC1nqUNwW8kFChvQB1ALJB3AHKDOLf051bwVT/RReicgHwHDEBl9BbFQxoubGVUqDF98PRVm1HqZqg9g8QVora+zr0h/m6V+JrdKgKgKEYkBKmRZWY1QbBsSo9z3d/ksxYXO7/SW9KeIsLxPpqlTOkZg8X1A8BLwalOCbkuoALBHdoFRNyszfGJB7FIGTXAPxUuMRyEAh3qD0wtVxydv95KiSzaRvsp8IlEHgHf8V/+WCu1pXCOmuMQeQPWYK1r0HnEhdIwdK7gXpdDqFDga0mmSFhU/AEVVyy6P+H5gAQAwQM3EfvCKZgzv790gBmV8g6wC0AK7GtPf8P7BW+MNFYafEAAAAASUVORK5CYII=')
            .css({
                position: 'absolute',
                top: (tileBbox.cy - bunnyImgHeight/2) + 'px',
                left: (tileBbox.cx - bunnyImgWidth/2) + 'px',
                width: '50px',
                height: '50px'
            });
        gridWrapper.append(dom);

        return {
            moveUp: moveUp,
            moveRight: moveRight,
            moveDown: moveDown,
            moveLeft: moveLeft,
            eatCarrot: eatCarrot,
            defecate: defecate
        };
        
        /////////////////////////////

        function moveUp (callback) {
            var deferred = Q.defer();

            var currentBbox = grid.getTile(x, y).svg.bbox();
            var currentTop = parseFloat(dom.css('top').slice(0, -2));

            y--;

            if (y < 0 || y >= grid.ySize) {
                if (callback) {
                    callback(false, boundaryCrossingError);
                }
                return Q.reject(boundaryCrossingError);
            }

            var targetBbox = grid.getTile(x, y).svg.bbox();

            dom.animate({
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
        }

        function moveRight (callback) {
            var deferred = Q.defer();

            var currentBbox = grid.getTile(x, y).svg.bbox();
            var currentLeft = parseFloat(dom.css('left').slice(0, -2));

            x++;

            if (x < 0 || x >= grid.xSize) {
                if (callback) {
                    callback(false, boundaryCrossingError);
                }
                return Q.reject(boundaryCrossingError);
            }

            var tileBbox = grid.getTile(x, y).svg.bbox();

            dom.animate({
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
        }

        function moveDown (callback) {
            var deferred = Q.defer();

            var currentBbox = grid.getTile(x, y).svg.bbox();
            var currentTop = parseFloat(dom.css('top').slice(0, -2));

            y++;

            if (y < 0 || y >= grid.ySize) {
                if (callback) {
                    callback(false, boundaryCrossingError);
                }
                return Q.reject(boundaryCrossingError);
            }

            var tileBbox = grid.getTile(x, y).svg.bbox();

            dom.animate({
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
        }

        function moveLeft (callback) {
            var deferred = Q.defer();

            var currentBbox = grid.getTile(x, y).svg.bbox();
            var currentLeft = parseFloat(dom.css('left').slice(0, -2));

            x--;

            if (x < 0 || x >= grid.xSize) {
                if (callback) {
                    callback(false, boundaryCrossingError);
                }
                return Q.reject(boundaryCrossingError);
            }

            var tileBbox = grid.getTile(x, y).svg.bbox();

            dom.animate({
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
        }

        function eatCarrot (callback) {
            var currentTile = grid.getTile(x, y);

            return currentTile.eatCarrot(callback);
        }

        function defecate (poop, callback) {
            var currentTile = grid.getTile(x, y);

            return currentTile.defecate(poop, callback);
        }
    }
    
    window.createBunny = createBunny;

}());