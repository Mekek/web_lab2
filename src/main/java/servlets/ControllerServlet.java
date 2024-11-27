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

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            // Получаем параметры из строки запроса
            String x = request.getParameter("x");
            String y = request.getParameter("y");
            String r = request.getParameter("r");

            // Проверяем наличие всех параметров
            if (x != null && y != null && r != null) {
                request.getRequestDispatcher("./check").forward(request, response);
            } else {
                request.getRequestDispatcher("./index.jsp").forward(request, response);
            }

        } catch (ServletException | IOException e) {
            ErrorUtil.sendError(response, 500, "Internal Server Error");
        }
    }
}
