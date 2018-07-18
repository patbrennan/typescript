"use strict";
var Kata = /** @class */ (function () {
    function Kata() {
    }
    Kata.bmi = function (weight, height) {
        var yourBmi = weight / (Math.pow(height, 2));
        switch (true) {
            case (yourBmi <= 18.5):
                return "Underweight";
            case (yourBmi <= 25.0):
                return "Normal";
            case (yourBmi <= 30.0):
                return "Overweight";
            default:
                return "Obese";
        }
    };
    return Kata;
}());
console.log(Kata.bmi(153, 67));
