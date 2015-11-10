'use strict';

(function () {

    var gridWidth = 500,
        gridHeight = 500,
        gridXSize = 5,
        gridYSize = 5,
        marginWidth = 10,
        tileColor = '#797979',
        startPathColor = '#00BDFF',
        endPathColor = startPathColor,
        pathColor = '#f06',

        path = [
            [0, 0],
            [1, 0],
            [1, 1],
            [2, 1],
            [3, 1],
            [3, 2],
            [2, 3],
            [3, 4],
            [4, 4]
        ],
        /*
         path = [
             [0, 0],
             [1, 0],
             [1, 1],
             [1, 2],
             [2, 2],
             [3, 2],
             [3, 3],
             [3, 4],
             [4, 4]
         ],
         */
        //carrotCoord = [2, 2];
        carrotCoord = [3, 1];

    var draw = SVG('grid-wrapper').size(gridWidth, gridHeight);

    var grid = new Grid({
        draw: draw,
        width: gridWidth,
        height: gridHeight,
        xSize: gridXSize,
        ySize: gridYSize,
        marginWidth: marginWidth,
        tileColor: tileColor,
        carrotCoord: carrotCoord
    });

    var bunny = new Bunny({
        gridWrapper: $('#grid-wrapper'),
        grid: grid,
        startX: 0,
        startY: 0
    });

    paintPath(grid, path);

    window.bunny = bunny;

    ////////////////////////////

    function paintPath (grid, path) {
        path.forEach(function (coord, i) {
            var tile = grid.getTile(coord[0], (coord[1]));
            var color = pathColor;

            if (i === 0) {
                color = startPathColor;
            } else if (i === path.length - 1) {
                color = endPathColor;
            }

            tile.svg.animate(1000, '>', 100 * i).attr({fill: color});
        });
    }

}());