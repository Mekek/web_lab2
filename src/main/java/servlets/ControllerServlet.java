package servlets;

import utils.ErrorUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.net.URLDecoder;

@WebServlet("/controller")
public class ControllerServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            if (getParam(request, "x") != null && getParam(request, "y") != null && getParam(request, "r") != null) {
                request.getRequestDispatcher("./check").forward(request, response);
            } else {
                request.getRequestDispatcher("./index.jsp").forward(request, response);
            }

        } catch (ServletException | IOException e) {
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
