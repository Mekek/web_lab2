const canvas = document.getElementById("graph");
const ctx = canvas.getContext("2d");

// Определяем обозначения осей
const xAxisLabel = "X";
const yAxisLabel = "Y";

let xAxisScale;
let yAxisScale;

function draw(r) {
    if (canvas.getContext) {
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";

        // Определяем размеры рисунка
        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;

        xAxisScale = canvasWidth / (2*r);
        yAxisScale = canvasHeight / (2*r);

        // Определяем начальную точку
        let originX = canvasWidth / 2;
        let originY = canvasHeight / 2;

        // Рисуем ось x
        ctx.beginPath();
        ctx.moveTo(0, originY);
        ctx.lineTo(canvasWidth, originY);
        ctx.stroke();

        // Рисуем ось y
        ctx.beginPath();
        ctx.moveTo(originX, 0);
        ctx.lineTo(originX, canvasHeight);
        ctx.stroke();

        // Обозначаем значения на осях
        ctx.fontFamily = "Open Sans, sans-serif";
        let fontArgs = ctx.font.split(' ');
        let newSize = '14px';
        ctx.font = newSize + ' ' + fontArgs[fontArgs.length - 1]; 
        ctx.fillText(xAxisLabel, canvas.width - 15, canvas.height / 2 - 5);
        ctx.fillText(yAxisLabel, canvas.width / 2 + 5, 15);

        // Обозначаем метки на осях
        for (let i = -canvas.width / 2; i < canvas.width / 2; i += xAxisScale) {
            let scalePos = axesToCanvasCoordinates(i, 0, canvas);
            ctx.beginPath();
            ctx.moveTo(scalePos.x, scalePos.y - 5);
            ctx.lineTo(scalePos.x, scalePos.y + 5);
            ctx.stroke();
            ctx.fillText(rescaleXAxesCoordinate(i), scalePos.x - 10, scalePos.y + 20);
        }

        for (let j = -canvas.height / 2; j < canvas.height / 2; j += yAxisScale) {
            let scalePos = axesToCanvasCoordinates(0, j, canvas);
            ctx.beginPath();
            ctx.moveTo(scalePos.x - 5, scalePos.y);
            ctx.lineTo(scalePos.x + 5, scalePos.y);
            ctx.stroke();
            if (j != 0) {
                ctx.fillText(rescaleYAxesCoordinate(j), scalePos.x - 20, scalePos.y + 5);
            }
        }
    }
}

function axesToCanvasCoordinates(xAxes, yAxes, canvas) {
    let originX = canvas.width / 2;
    let originY = canvas.height / 2;

    let canvasX = originX + xAxes;
    let canvasY = originY - yAxes; 

    return { x: canvasX, y: canvasY };
}
function canvasCoordinatesToAxes(canvasX, canvasY, canvas) {
    let originX = canvas.width / 2;
    let originY = canvas.height / 2;

    let x = (canvasX - originX) / xAxisScale;
    let y = (originY - canvasY) / yAxisScale;
    return { x: x, y: y};
}

function rescaleXAxesCoordinate(coordinate) {
    return coordinate / xAxisScale;
}

function rescaleYAxesCoordinate(coordinate) {
    return coordinate / yAxisScale;
}

function scaleXAxesCoordinate(coordinate) {
    return coordinate * xAxisScale;
}

function scaleYAxesCoordinate(coordinate) {
    return coordinate * yAxisScale;
}

function drawShapesByR(r) {
    if (canvas.getContext) {
        // очищаем поле для рисунка
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw(r);

        let startPointInAxes = {x: 0, y: 0};
        let startPointInCanvas = axesToCanvasCoordinates(startPointInAxes.x, startPointInAxes.y, canvas);

        // рисуем прямоугольник во 2 четверти

        let endPointInAxes = {x: -(r/2), y: r};
        let endScaledPointInAxes = {
            x: scaleXAxesCoordinate(endPointInAxes.x),
            y: scaleYAxesCoordinate(endPointInAxes.y)
        };

        ctx.fillStyle = "rgb(150,0,200,0.5)";
        ctx.beginPath();
        ctx.fillRect(startPointInCanvas.x, startPointInCanvas.y, endScaledPointInAxes.x, -endScaledPointInAxes.y);

        // рисуем треугольник в 1 четверти
        let secondTrianglePointInAxes = {x: r, y: 0};
        let thirdTrianglePointInAxes = {x: 0, y: r};
        drawTriangle(ctx, startPointInAxes, secondTrianglePointInAxes, thirdTrianglePointInAxes);

        // рисуем часть 1/4 круга в 3 четверти
        let calculatedRadius = scaleXAxesCoordinate(r / 2);

        ctx.beginPath();
        ctx.arc(startPointInCanvas.x, startPointInCanvas.y, calculatedRadius, Math.PI / 2, 0, true);
        ctx.lineTo(startPointInCanvas.x, startPointInCanvas.y);
        ctx.fill();
    }
}

function drawTriangle (ctx, startPointInAxes, secondTrianglePointInAxes, thirdTrianglePointInAxes) {
    if (canvas.getContext) {
        let startPointInCanvas = axesToCanvasCoordinates(startPointInAxes.x, startPointInAxes.y, canvas);
        let secondScaledTrianglePointInAxes = {
            x: scaleXAxesCoordinate(secondTrianglePointInAxes.x),
            y: scaleYAxesCoordinate(secondTrianglePointInAxes.y)
        }
        let thirdScaledTrianglePointInAxes = {
            x: scaleXAxesCoordinate(thirdTrianglePointInAxes.x),
            y: scaleYAxesCoordinate(thirdTrianglePointInAxes.y)
        };
        let secondTrianglePointInCanvas = axesToCanvasCoordinates
        (secondScaledTrianglePointInAxes.x, secondScaledTrianglePointInAxes.y, canvas);
        let thirdScaledTrianglePointInCanvas = axesToCanvasCoordinates
        (thirdScaledTrianglePointInAxes.x, thirdScaledTrianglePointInAxes.y, canvas);

        ctx.beginPath();
        ctx.moveTo(startPointInCanvas.x, startPointInCanvas.y);
        ctx.lineTo(secondTrianglePointInCanvas.x, secondTrianglePointInCanvas.y);
        ctx.lineTo(thirdScaledTrianglePointInCanvas.x, thirdScaledTrianglePointInCanvas.y);
        ctx.fill();
    }
}

// рисуем точку с полученными координатами
function drawPoint(x, y, r, isHit) {
    if (canvas.getContext) {

        const pointSize = 4;

        let scaledPoint = {x: scaleXAxesCoordinate(x), y: scaleYAxesCoordinate(y)};
        let pointOnCanvas = axesToCanvasCoordinates(scaledPoint.x, scaledPoint.y, canvas);

        ctx.fillStyle = isHit ? "green" : "red" ;

        ctx.beginPath();
        ctx.fillRect(pointOnCanvas.x - pointSize / 2, pointOnCanvas.y - pointSize / 2, pointSize, pointSize);
    }
}
