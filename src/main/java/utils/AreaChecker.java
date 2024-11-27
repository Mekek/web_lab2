package utils;

public class AreaChecker {
    public static boolean isInArea(double x, double y, double r) {
        // Верхний левый угол - треугольник
        if (x <= 0 && y >= 0) {
            return (y - x/2) <= (r/2);
        }
        // Нижний левый угол - 1/4 круга
        if (x <= 0 && y <= 0) {
            return (x * x + y * y) <= (r * r);
        }
        // Нижний правый угол - прямоугольник
        if (x >= 0 && y <= 0) {
            return (x <= r) && (y >= -r/2);
        }
        // Верхний правый угол - ничего нет
        return false;
    }
}
