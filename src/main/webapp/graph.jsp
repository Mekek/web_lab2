<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="core" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="results" scope="session" class="results.ResultsList"/>
<html>
<body>
<canvas id="graph" width="450" height="450"></canvas>
<script type="module" src="main.js"></script>
<script>
    let clickedPoints = [];

    function loadPoints() {
        clickedPoints = [
            <core:forEach var="result" items="${results.results}">
            {
                x: ${result.x},
                y: ${result.y},
                isHit: ${result.isHit ? 'true' : 'false'}
            },
            </core:forEach>
        ];
        return clickedPoints;
    }
</script>
</body>

</html>
