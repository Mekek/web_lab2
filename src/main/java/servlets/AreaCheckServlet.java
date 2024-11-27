package servlets;

import results.ResultsList;
import com.google.gson.Gson;
import utils.AreaChecker;
import utils.CoordinatesValidator;
import utils.ErrorUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.net.URLDecoder;

@WebServlet("/check")
public class AreaCheckServlet extends HttpServlet {
    public static final int SC_INTERNAL_SERVER_ERROR = 500;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            // Извлечение параметров из строки запроса
            double x = Double.parseDouble(getParam(request, "x"));
            double y = Double.parseDouble(getParam(request, "y"));
            double r = Double.parseDouble(getParam(request, "r"));
            String type = getParam(request, "type");

            // Получение или создание списка результатов из сессии
            ResultsList resultsList = (ResultsList) request.getSession().getAttribute("results");
            if (resultsList == null) {
                resultsList = new ResultsList();
                request.getSession().setAttribute("results", resultsList);
            }

            // Если тип запроса "clear", очищаем результаты и выходим
            if ("clear".equals(type)) {
                resultsList.clearResults();
                return;
            }

            // Проверка входных данных
            CoordinatesValidator validator = new CoordinatesValidator(x, y, r, type);
            if (!validator.checkData()) {
                ErrorUtil.sendError(response, 422, "Unprocessable Entity: Error during validation");
                return;
            }

            // Создание результата проверки и добавление его в список (если необходимо)
            ResultsList.Result result = new ResultsList.Result(
                String.valueOf(x),
                String.valueOf(y),
                String.valueOf(r),
                AreaChecker.isInArea(x, y, r)
            );

            if (!"check".equals(type)) {
                resultsList.addResult(result);
            }

            // Отправка JSON-ответа
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(new Gson().toJson(result));
        } catch (NumberFormatException e) {
            ErrorUtil.sendError(response, 422, "Unprocessable Entity: Invalid number format");
        } catch (Exception e) {
            e.printStackTrace();
            ErrorUtil.sendError(response, 500, "Internal Server Error");
        }
    }

    // Метод для извлечения параметра из строки запроса
    public static String getParam(HttpServletRequest request, String parameter) {
        String value = request.getParameter(parameter);
        if (value == null || value.isEmpty()) {
            throw new IllegalArgumentException("Parameter not found or empty: " + parameter);
        }
        return value.replace(",", ".");
    }    
}
