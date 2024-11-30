package utils;

import java.util.Arrays;
import java.util.List;

public class CoordinatesValidator {
    private final double x, y, r;
    private final String type;

    public CoordinatesValidator(double x, double y, double r, String type) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.type = type;
    }

    public boolean checkData() {
        return checkX() && checkY() && checkR();
    }

    private boolean checkX() {
        if (type.equals("form")) {
            List<Integer> validXValues = Arrays.asList(-3, -2, -1, 0, 1, 2, 3, 4, 5);
            return validXValues.contains((int) x) && x == (int) x;
        } else return x >= -3 && x <= 5;
    }

    private boolean checkY() {
        return x >= -3 && x <= 5;
    }

    private boolean checkR() {
        if (type.equals("form")) {
            List<Integer> validRValues = Arrays.asList(10, 15, 20, 25, 30);
            return validRValues.contains((int) (r * 10)) && r * 10 == (int) (r * 10);
        } else return r >= 1 && r <= 3;
    }
}
