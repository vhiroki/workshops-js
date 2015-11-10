(function () {

    function Grid (options) {

        this.draw = options.draw;
        this.width = options.width;
        this.height = options.height;
        this.xSize = options.xSize;
        this.ySize = options.ySize;
        this.marginWidth = options.marginWidth;
        this.tileColor = options.tileColor;
        this.carrotCoord = options.carrotCoord;
        this.tiles = [];
        this.svg = renderGrid(this);
    }

    Grid.prototype.addTile = function (x, y, tile) {
        this.tiles[x] = this.tiles[x] || [];
        this.tiles[x][y] = tile;
    };

    Grid.prototype.getTile = function (x, y) {
        return this.tiles[x][y];
    };

    function renderGrid (grid) {
        var gridGroup = grid.draw.group();

        grid.svg = gridGroup;

        var tileWidth = (grid.width - grid.marginWidth * (grid.xSize - 1)) / grid.xSize;
        var tileHeight = (grid.height - grid.marginWidth * (grid.ySize - 1)) / grid.ySize;

        for (var i=0; i<grid.ySize; i++) {
            for (var j=0; j<grid.xSize; j++) {
                var tile = new Tile({
                    draw: grid.draw,
                    grid: grid,
                    width: tileWidth,
                    height: tileHeight,
                    xPos: j,
                    yPos: i,
                    color: grid.tileColor,
                    hasCarrot: (j === grid.carrotCoord[0] && i === grid.carrotCoord[1]) ? true : false
                });
                grid.addTile(j, i, tile);
                grid.svg.add(tile.svg);
            }
        }

        return gridGroup;
    }

    window.Grid = Grid;

}());