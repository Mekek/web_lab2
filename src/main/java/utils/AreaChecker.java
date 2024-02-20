package utils;

public class AreaChecker {
    public static boolean isInArea(double x, double y, double r) {
        // Верхний левый угол - прямоугольник
        if (x <= 0 && y >= 0) {
            return (x >= -r) && (y <= r/2);
        }
        // Нижний левый угол - треугольник
        if (x <= 0 && y >= 0) {
            return (x+y) >= (-r);
        }
        // Нижний правый угол - 1/4 круга
        if (x >= 0 && y <= 0) {
            return (x * x + y * y) <= (r * r);
        }
        // Верхний правый угол - ничего нет
        return false;
    }
}
