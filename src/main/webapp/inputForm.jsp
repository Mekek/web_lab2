<%@ page contentType="text/html;charset=UTF-8" %>
<html>
    <body>
        <link rel="stylesheet" href="styles/style.css">
        <p><b>Enter values:</b></p>
        <form method="post">
            <!-- Выбор X через чекбоксы (можно выбрать только один) -->
            <div class="select-container margin">
                <label for="x"><b>Select X:</b></label>
                <div id="x" class="checkbox-group">
                    <label><input type="checkbox" name="x" value="-3" onclick="limitCheckboxSelection(this)">-3</label>
                    <label><input type="checkbox" name="x" value="-2" onclick="limitCheckboxSelection(this)">-2</label>
                    <label><input type="checkbox" name="x" value="-1" onclick="limitCheckboxSelection(this)">-1</label>
                    <label><input type="checkbox" name="x" value="0" onclick="limitCheckboxSelection(this)">0</label>
                    <label><input type="checkbox" name="x" value="1" onclick="limitCheckboxSelection(this)">1</label>
                    <label><input type="checkbox" name="x" value="2" onclick="limitCheckboxSelection(this)">2</label>
                    <label><input type="checkbox" name="x" value="3" onclick="limitCheckboxSelection(this)">3</label>
                    <label><input type="checkbox" name="x" value="4" onclick="limitCheckboxSelection(this)">4</label>
                    <label><input type="checkbox" name="x" value="5" onclick="limitCheckboxSelection(this)">5</label>
                </div>
            </div>
        
            <!-- Ввод Y через текстовое поле -->
            <div class="select-container margin">
                <label for="y"><b>Enter Y:</b></label>
                <input type="text" id="y" name="y" maxlength="12" placeholder="Must be between -3 and 3">
                <span class="error" aria-live="polite"></span>
            </div>
        
            <!-- Выбор R через кнопки (можно выбрать только один) -->
            <div class="select-container margin">
                <label for="r"><b>Select R:</b></label>
                <div id="r" class="button-group">
                    <button type="button" onclick="selectR(1)">1</button>
                    <button type="button" onclick="selectR(1.5)">1.5</button>
                    <button type="button" onclick="selectR(2)">2</button>
                    <button type="button" onclick="selectR(2.5)">2.5</button>
                    <button type="button" onclick="selectR(3)">3</button>
                    <input type="hidden" id="hiddenR" name="r">
                </div>
            </div>
        
            <!-- Кнопка отправки формы -->
            <div id="submit-container" class="margin">
                <input type="submit" id="submit-button" value="Check if the point hits the area">
            </div>
        </form>
        
        <script>
            function selectR(value) {
                document.getElementById('hiddenR').value = value;
                alert('R selected: ' + value); // Уведомление о выбранном значении
            }
    
            function limitCheckboxSelection(checkbox) {
                // Убираем выбор с других чекбоксов, если один выбран
                const checkboxes = document.querySelectorAll('input[name="x"]');
                checkboxes.forEach(cb => {
                    if (cb !== checkbox) {
                        cb.checked = false;
                    }
                });
            }
        </script>
    </body>
</html>
