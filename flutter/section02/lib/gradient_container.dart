import 'package:flutter/material.dart';
import 'dart:math';

import 'package:section02/styled_text.dart';
import 'package:section02/dice_roller.dart';

const startAlignment = Alignment.topLeft;
const endAlignment = Alignment.bottomRight;

var rng = Random();
class GradientContainer extends StatelessWidget {
  final Color color1;
  final Color color2;
  var roll = 1;

  GradientContainer(this.color1, this.color2, {super.key});
  GradientContainer.purple({super.key})
      : color1 = Colors.deepPurple,
        color2 = Colors.indigo;

  void rollDice() {
    roll = rng.nextInt(6) + 1;
    print("hello ${roll}");
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
            colors: [color1, color2], begin: startAlignment, end: endAlignment),
      ),
      child: Center(
          child: DiceRoller()),
    );
  }
}
