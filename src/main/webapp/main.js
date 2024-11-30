import inputValidator from "./inputValidator.js";

let message = "";
let clickedPoints = [];
let r = null;
let send_type;

window.addEventListener("load", () => {
    draw(5);
    clickedPoints = loadPoints();
    for (const point of clickedPoints) {
        drawPoint(point.x, point.y, r, false);
    }
});

function isPointInsideArea(x, y, R, send_type) {
    let validator = new inputValidator();
    validator.validate(x, y, R, send_type);
    message = validator.getMessage();
    return validator.getResponseCode() === 1;
}

function isRadiusAcceptable(R) {
    let validator = new inputValidator();
    validator.validateR(R);
    message = validator.getMessage();
    return validator.getResponseCode() === 1;
}

async function drawAllPoints() {
    for (const point of clickedPoints) {
        if (isNaN(r)) {
            drawPoint(point.x, point.y, r, false);
        } else {
            const isInside = await isPointInsideDesiredArea(point.x, point.y, r);
            drawPoint(point.x, point.y, r, isInside);
        }
    }
}

function updateTableAndGraph(data) {
    let parsedX = parseFloat(data.x);
    let parsedY = parseFloat(data.y);
    let parsedR = parseFloat(data.r);

    drawPoint(parsedX, parsedY, parsedR, data.isHit);

    clickedPoints.push({ x: parsedX, y: parsedY, r: parsedR, isHit: data.isHit });

    const table = document.getElementById('result');
    const newRow = table.insertRow(1);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);

    cell1.innerHTML = data.x;
    cell2.innerHTML = data.y;
    cell3.innerHTML = data.r;
    cell4.innerHTML = data.isHit ? 'Hit' : 'Miss';
}

const mainForm = document.querySelector('input[id="submit-button"]');
mainForm.addEventListener('click', function (e) {
    e.preventDefault();

    const xElements = document.querySelectorAll('input[name="x"]:checked'); // Находим все отмеченные чекбоксы
    const yElement = document.querySelector('#y');
    const rElement = document.getElementById('hiddenR');

    if (!rElement.value || isNaN(rElement.value)) {
        showToast("You need to enter coordinate R");
        return;
    }

    if (xElements.length > 0 && yElement && rElement) {
        const yVal = parseFloat(yElement.value.substring(0, 12));
        const rVal = parseFloat(rElement.value);

        xElements.forEach(xElement => {
            const xVal = parseFloat(xElement.value);

            console.log(`X: ${xVal}, Y: ${yVal}, R: ${rVal}`);
            send_type = "form";

            if (isPointInsideArea(xVal, yVal, rVal, send_type)) {
                let urlParams = new URLSearchParams({ "x": xVal, "y": yVal, "r": rVal, "type": send_type });
                console.log("Request URL:", "./controller?" + urlParams.toString());
                fetch("./controller?" + urlParams.toString())
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`${response.status} ${response.text()}`);
                        }
                        return response.json();
                    })
                    .then(function (serverAnswer) {
                        updateTableAndGraph(serverAnswer);
                    })
                    .catch(error => {
                        showToast(`ERROR during request processing: ${error.message}`);
                    });
            } else {
                showToast(message);
            }
        });
    } else {
        showToast("You need to enter all values in the form");
    }
});
const canvas = document.getElementById("graph");

canvas.addEventListener("click", function (event) {
    if (r === null || isNaN(r)) {
        showToast("You need to enter coordinate R");
        return;
    }

    let x = event.clientX - canvas.getBoundingClientRect().left;
    let y = event.clientY - canvas.getBoundingClientRect().top;
    let startPointInAxes = canvasCoordinatesToAxes(x, y, canvas);
    let graphX = startPointInAxes.x;
    let graphY = startPointInAxes.y;
    let R = parseFloat(r);

    send_type = "click";
    if (isPointInsideArea(graphX, graphY, R, send_type)) {
        let urlParams = new URLSearchParams({ "x": graphX, "y": graphY, "r": R, "type": send_type });
        fetch("./controller?" + urlParams.toString())
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.text()}`);
                }
                return response.json();
            })
            .then(function (serverAnswer) {
                updateTableAndGraph(serverAnswer);
            })
            .catch(error => {
                showToast(`ERROR during request processing: ${error.message}`);
            });
    } else {
        showToast(message);
    }
});

async function isPointInsideDesiredArea(x, y, r) {
    try {
        send_type = "check";
        let urlParams =
            new URLSearchParams({"x": x, "y": y, "r": r, "type": send_type});
        const response = await fetch("./controller?" + urlParams.toString())

        if (!response.ok) {
            throw new Error(`${response.status} ${await response.text()}`);
        }

        const serverAnswer = await response.json();
        return serverAnswer.isHit;
    } catch (error) {
        showToast(`ERROR during request processing: ${error.message}`);
        return null;
    }
}

function showToast(message) {
    Toastify({
        text: message,
        className: "info",
        style: {
            background: "red",
            border: "1px solid white",
            color: "white"
        },
        offset: {
            x: -300,
            y: 140
        },
        position: "right"
    }).showToast();
}

const buttonGroup = document.querySelector('.button-group');
buttonGroup.addEventListener('click', function(event) {
    const target = event.target;

    // Проверяем, что клик был по кнопке
    if (target.tagName === 'BUTTON') {
        r = parseFloat(target.textContent || target.value); // Получаем значение из кнопки

        // Убираем выделение с других кнопок
        const buttons = document.querySelectorAll('.button-group button');
        buttons.forEach(button => button.classList.remove('selected'));

        // Добавляем класс selected на выбранную кнопку
        target.classList.add('selected');

        if (isNaN(r)) {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            draw(5); // Отрисовка с R=5
            drawAllPoints();
        } else if (isRadiusAcceptable(r)) {
            drawShapesByR(r);
            drawAllPoints();
        } else {
            showToast(message);
        }
    }
});
