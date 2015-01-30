'use strict';

var resistor = angular.module('resistor.controllers', []);

resistor.controller('HomeCtrl', function ($scope, $http, $state) {
  $scope.context = null;
  $scope.resistor_value = "";
  $scope.resistor = null;
  $scope.attempts = [];

  $scope.initialize = function() {
    var canvas = document.getElementById('resistor');
    $scope.context = canvas.getContext('2d');

    $scope.generateNewResistor();

  };

  $scope.generateNewResistor = function() {
    $scope.resistor = randomResistor();
    paintResistorBody();
    paintResistorStripes($scope.resistor);

    $scope.resistor_value = $scope.resistor.value + " +-" + $scope.resistor.resistance_value + "%";
    console.log( $scope.resistor_value );
  };

  $scope.submitAnswer = function(userValue) {
    var guessedValue = parseFloat(userValue);
    var newAttempt = {
      actual: $scope.resistor.value,
      guessed: guessedValue
    };

    if ($scope.resistor.value === guessedValue) {
      newAttempt.outcome = true;
      newAttempt.outcome_display = "Correct";
    }
    else {
      newAttempt.outcome = false;
      newAttempt.outcome_display = "Incorrect";
    }

    $scope.attempts.push( newAttempt );
    $scope.generateNewResistor();
  };

  var randomResistor = function() {
    var genResistor = {
      bandOne: Math.floor(Math.random() * 10),
      bandTwo: Math.floor(Math.random() * 10),
      multiplier: Math.floor(Math.random() * 9),
      resistance: Math.floor(Math.random() * 8)
    };

    var genValue = resistorValue(genResistor);
    genResistor.value = genValue.value;
    genResistor.resistance_value = genValue.resistance;

    return genResistor;
  };

  var resistorValue = function(resistor) {
    var multiplierTable = [1, 10, 100, 1000, 10000, 100000, 1000000, 0.01, 0.1];
    var resistanceTable = [10, 5, 1, 2, 3, 0.5, 0.25, 0.1];
    var baseNum = ("" + resistor.bandOne + resistor.bandTwo);

    return {
      value: parseInt(baseNum) * multiplierTable[ resistor.multiplier ],
      resistance: resistanceTable[ resistor.resistance ]
    };
  };

  var paintResistorStripes = function(resistor) {
    var bandColors = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "gray", "white"];
    var multiplierColors = ["black", "brown", "red", "orange", "yellow", "green", "blue", "silver", "gold"];
    var resistanceColors = ["silver", "gold", "brown", "red", "orange", "green", "blue", "violet"];

    $scope.context.fillStyle = bandColors[resistor.bandOne];
    $scope.context.fillRect(135, 40, 20, 70);

    $scope.context.fillStyle = bandColors[resistor.bandTwo];
    $scope.context.fillRect(175, 40, 20, 70);

    $scope.context.fillStyle = multiplierColors[resistor.multiplier];
    $scope.context.fillRect(225, 40, 20, 70);

    $scope.context.fillStyle = resistanceColors[resistor.resistance];
    $scope.context.fillRect(280, 40, 20, 70);
  };

  var paintResistorBody = function() {
    $scope.context.lineWidth = "2";
    $scope.context.beginPath();
    $scope.context.arc(100, 75, 50, 1.75 * Math.PI, 0.25 * Math.PI, true);
    $scope.context.lineTo(300, 110);
    $scope.context.arc(335, 75, 50, 0.75 * Math.PI, 1.25 * Math.PI, true);
    $scope.context.lineTo(135, 40);
    $scope.context.closePath();
    $scope.context.stroke();
    $scope.context.fillStyle = "#F5DA81";
    $scope.context.fill();
  };

  $scope.initialize();
});
