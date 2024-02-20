<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<body>
<p><b>Enter values:</b></p>
<p><b>ATTENTION!!!</b> <i>Every</i> value must be filled in <i>correctly</i>!</p>
<form method="post">
    <div class="select-container margin">
        <label for="x"><b>Enter X:</b></label>
        <input type="text" id="x" name="x" maxlength="12"
               placeholder="Must be between -5 and 3">
        <span class="error" aria-live="polite"></span>
    </div>
    <div class="select-container margin">
        <label for="y"><b>Enter Y:</b></label>
        <div id="y" class="radio-group">
            <label><input type="radio" name="y" value="-4">-4</label>
            <label><input type="radio" name="y" value="-3">-3</label>
            <label><input type="radio" name="y" value="-2">-2</label>
            <label><input type="radio" name="y" value="-1">-1</label>
            <label><input type="radio" name="y" value="0">0</label>
            <label><input type="radio" name="y" value="1">1</label>
            <label><input type="radio" name="y" value="2">2</label>
            <label><input type="radio" name="y" value="3">3</label>
            <label><input type="radio" name="y" value="4">4</label>
        </div>
    </div>
    <div class="select-container margin">
        <label for="r"><b>Enter R:</b></label>
        <input type="text" id="r" name="r" maxlength="12"
               placeholder="Must be between 2 and 5">
        <span class="error" aria-live="polite"></span>
    </div>
    <div id="submit-container" class="margin">
        <input type="submit" id="submit-button" value="Check if the point hits the area">
    </div>
</form>
</body>
</html>
