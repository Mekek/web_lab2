<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<body>
<script>
    function clear_table() {
        send_type = "clear";
        let urlParams =
            new URLSearchParams({"x": 0, "y": 0, "r": 0, "type": send_type});
        fetch("./controller?" + urlParams.toString())
        location.reload();
    }
</script>
<p><b>Link to the repository with laboratory work: </b></p>
<a href="https://github.com/Mekek/web_lab2"><img src="images/github.png" class="icon"></a>
<input onclick="clear_table()" type="button" id="clear-button" value="CLEAR THE RESULTS HISTORY">
</body>
</html>