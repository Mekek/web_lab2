<%@ page contentType="text/html;charset=UTF-8" %>
<html lang="ru">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html" charset="UTF-8" />
    <meta name="author" content="Кадилов Михаил Владимирович P3231" />
    <meta name="description" content="Лабораторная работа №2, Веб-программирование" />

    <link rel="stylesheet" href="styles/style.css">
    <link rel="icon" href="https://se.ifmo.ru/o/favicon/">
    <title>Web Lab #2</title>
    <style>
        #footer {
            overflow: auto;
            text-align: left;
            font-family: sans-serif;
            padding: 5px;
            height: fit-content;
            background-color: rgba(255, 235, 205, 0.2);
        }
    </style>
</head>

<body class="container">
    <div id="header" class="main-container margin">
        <p>Web-programming. Laboratory work #2</p>
        <p>Kadilov Mikhail Vladimirovich P3231</p>
        <p>Variant #9132433</p>
    </div>

    <main class="margin">
        <div class="main-container margin" id="input-form">
            <jsp:include page="inputForm.jsp" />
        </div>

        <div class="main-container margin" id="graph-container">
            <jsp:include page="graph.jsp" />
        </div>

        <div id="result-table-container" class="main-container margin">
            <table class="resultTable" id="result">
                <thead>
                <tr>
                    <th class="thX">X</th>
                    <th class="thY">Y</th>
                    <th class="thR">R</th>
                    <th class="thResult">Result</th>
                </tr>
                </thead>
                <tbody id="output">
                <jsp:include page="table.jsp"/>
                </tbody>
            </table>
        </div>
    </main>
    <div id="footer" class="main-container margin">
        <jsp:include page="footer.jsp" />
    </div>

    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
    <script type="module" src="main.js"></script>
    <script src="graphics.js"></script>
</body>
</html>
