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
                    var poop = self.draw.image('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEFUlEQVR4Xu2b/bUOMRCHf7cCVIAKUAEqQAWoABWgAlTArQAVoAJUgArQgfOcs/uebN58TLLZu9l95Zx77h83mWSeTCYzk71nWqZdk/Rc0rmkz8tM0UbqWRsxEymXJf2QxO+7pwiAHb89IHkm6fUCkJuJbG0BNyV9dVbHEXjUbLULCGoN4MVw9sel/pF0XRK/u2ytAXyQdM/T9KUkwHTZWgNwz/8mrKA1AP8IjBDeSHraowlYAODEuNIs3py+byOK3pL0rTcIOQDvJD2UZD3HgPodUZLjQVzQVUsBcM35o6T7xpWP0ELdu7OCFACurkuDFpgui7e0O5I+RTp2FxfEAISU4D7/aSEgKXQdMpTxyOmmxQDgsV95qyzZPZIh8oFQy/mdC4UTW0zsOis5wzFfsAkAseusxJPHfMEmAPhJjWuWjyWxu5bmOlL6l9wmFvmz+6R2A4d1NTBDiSPzQ+MSeLOVswiwxgG+LKsiLoDvkrAsS8OJAv9Xwc1jkXvUJwWAqI7dHmMBd7A1LhgB/JWEUta0mLD7yTAha+DIcQtZr2EzjJxDit0GTJAbSx9A8YOcksUTdb4PaIEcwvJmLadEygos9T7GW3fdVSoVTQKUuWvkFh2BsXPMCiwAanfKPQIhGc0g5CyAyWMZ3lIAOPuW1LskJoluhAUAg/3rDKcGmFCjJIYJWz2+K4MxMbmhuR4MeUetpZkcGcL9YxDKC1g8+QPKX1QriUmCa7JagAuA3UdZ16unKkFLwyjJT6qcoG8BvtmlwuallUe+tVo1ywIIRDBt0mRyfbfxEFJz3lvB+TLn2FmPAAqGCpqxgKWVchY5xANXLB1DfawAYvJT9b/aNdWMq9ajeuCwytBDSI0Cc8dU61E9sDMAJfXKCey9AKjWo3rggDFUPJ1rzqXjS+oM1XFAbFE93AKz3h1LLYA4nWSFyI8CR09tLJwAxJwqlwAgEKJIUZKsrAEI5YlWTR9nWQH0YOqlME2ZogUApk642/vO+4CwBBKlZCnOAqCXaK/UAuiffc7LAUi999csaI0x5AlRp5gDkCpOrqFMzZzJ0l0OQKosXrOYNcYkP9bMAViz0tMKVvIVKwfg5I9A6mGk1Q4tKSf7JJezABZ3stdgz3G/1Wqy+UHMAqgB8qXX1qK/GBjiAK7Do7pmCMDelB+hBCH4ANz/9rCa2Zb6cSTIDw6RoQ9gD4FPbkMmDyk+AL7t663QkVOo9O+T90QXQOrjxtJJeu9/qCK7APYQ9VnBHxKk/wAcZHvI/a0WcNh43wkSKNywStlov8k7gg9gD+lvbl8m6XEoEtyzFRy9IoUA4Auoqe/tKKA8N92kPhhLhoBAGuz/E2TOvHr9O1+R8LZxVBzN1QMghl8gQdqaRbDjHGc2MvpK9A/ZxsBBNw105QAAAABJRU5ErkJggg==');
                    //var poop = self.draw.use('poop', 'https://cdn.rawgit.com/vhiroki/workshops-js/master/promises/img/poop.svg');
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
        var carrot = tile.draw.image('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEkklEQVR4XtWbj5EOQRDF30WACJABESACRIAIEAEi4CJwIkAEiAARIAJEQP2+2vlqbr7Z3e75s3+mSt1VXe/s9Jue16971pn2Ox5LeivpQtKTUjfOSh/cwHM/JV0f1vFc0puSNe0VgBuSfkQO/5F0UxI/p8bdweZbMNorAA8kvU88HYsCwHokiSPD74zbkg4g7BUAzj1OxeOLJHY4DEDChp/puCfp854BINSvZBzjGKS7nZr9iiJhlxGQC38P/72S9HLPHPBB0n2Px4ktUUIGOYy9ccBVSb8rnP+YcsLeACB0X1QA8FASEXQcWwHgTrQm2Hxs5Njfiscl8lv7CJCPOcfk5lsZD2B5dopU9S75e2kUXCK/tQDgDBPCz6zbNhAWWv+Qt4cR6gDHNAeleCS/NQBgp1FvQY15Fo8tWh+1VwMCIBJZRNVBNi/FATj/SRIRUDNwACILmr8kEng/z3OUzpcAoJXzATg0PFK2FgTmu1gCAHY+1ug1EdAchN4AQHavW3icmaM2Er7DKz0B4LxTs9ee+yn8PCD8HQgwpNfuJFiar70Bk4KQvhfGx+lLCrB3Gkw7Nl6nvPZkB4gxDBQjwPBzskvU6wiQ73ONCK9jHvtzp8A6zN0DABgf5l9jHDs91pf3AKBH2rP6Q9jT7zOP1gCUKjPzgg2GJyXv1DMtASDdfa3Q+gbfTCawPhthGi0BWCrtzTkG61+bM2qdBpcQPVafXOTeKgJ6Sl6P48HWnA1aAUAE0GzI9epLHKh9ZnEAWPAWMkAADg6YuyfsIoSQpHGDs3YnS583R7bZ0LgSmh+kwprBztHAhFfC9bdnvpPefy8dwLnPhRm9u6eeFWdsQy4ntQKEh1tc3wqURkBIezhLERIDwd+QpCW7F2MRiIz5eE96G5zDmJqfKDzp/o5tSCkAsejhZaAe19u1F5isNy1xcQwgpjgm2/tvfQTGan0WTP8+oN+CEJmPmj4egAsQaYRlb37mjmJJBEzV+hwFFsdOtGiKACbVXY5rYn4g9CnDj5++zDleKoWttT4LZ/ewr7nMZJ1TYR34AdDdzrs084CYt9bnGHB2axuj2Wst6y634oA1lR4ES53ffFg5YAu1vlnfe1CyArCFWt+d4ixAWABYu9bngwk2IL4et/hmsrEAUPNVhmkRI0bkdRxPdUDNnCfPzgHQorjxLpicTlrjn6mk9b4gtp8DwJv2atbCsxRBFD/dHbcIIavoqXWa5znnOF4kZmoWMBUB3OyWfs5iXRPnHH3RheAsixgDoHeTk3MOwRV9429xzGqTA2Au7bF4T4MiXQv5fBGCs4CQA2BO9EBQyFLsPP0/WlVElrlZYXGg1iYFwFrChqtoiHIOiK5CpjUAnnv9uEKDyAAiblIsImRaAuBNe7lLyAAE6m0z59xaDpeIni4VWu2uep4PHFBa66eNS8+7N2ELADW1PuecemEx6doaNQCYS3u5d6IFSGldK7XWzubmAwCv5N2UkKkFCQD+GSeB9YmWTQkZ49pHzQBg7gJj00KmBQBjTY9dCJkWADBHfO+G45Db8T8X1r5ky8//B9co6T+hJnyOAAAAAElFTkSuQmCC');
        carrot.size(50, 50);
        carrot.center(tileBbox.x2 - 10, tileBbox.y + 10);

        return carrot;
    }

    window.Tile = Tile;

}());