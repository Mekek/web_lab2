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

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            double x = Double.parseDouble(getParam(request, "x"));
            double y = Double.parseDouble(getParam(request, "y"));
            double r = Double.parseDouble(getParam(request, "r"));
            String type = getParam(request, "type");

            ResultsList resultsList = (ResultsList) request.getSession().getAttribute("results");
            if (resultsList == null) {
                resultsList = new ResultsList();
                request.getSession().setAttribute("results", resultsList);
            }

            if (type.equals("clear")) {
                resultsList.clearResults();
                return;
            }

            CoordinatesValidator validator = new CoordinatesValidator(x, y, r, type);
            if (!validator.checkData()) {
                ErrorUtil.sendError(response, 422, "Unprocessable Entity: Error during validation");
                return;
            }

            ResultsList.Result result = new ResultsList.Result(String.valueOf(x),
                    String.valueOf(y), String.valueOf(r), AreaChecker.isInArea(x, y, r));
            if (!(type.equals("check"))) {
                resultsList.addResult(result);
            }

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

    public static String getParam(HttpServletRequest request, String parameter) throws IOException {
        BufferedReader reader = request.getReader();
        StringBuilder requestBody = new StringBuilder();
        String line;

        while ((line = reader.readLine()) != null) {
            requestBody.append(line);
        }

        String[] params = requestBody.toString().split("&");

        // ѕоиск нужного параметра в массиве параметров
        for (String param : params) {
            String[] keyValue = param.split("=");
            if (keyValue.length == 2 && keyValue[0].equals(parameter)) {
                String value = URLDecoder.decode(keyValue[1], "UTF-8").replace(",", ".");
                return value;
            }
        }

        throw new IllegalArgumentException("Parameter not found: " + parameter);
    }
}
