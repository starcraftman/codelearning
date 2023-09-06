import 'package:flutter/material.dart';
import 'dart:math';

final rng = Random();
class DiceRoller extends StatefulWidget {
  const DiceRoller({super.key});
  const DiceRoller.purple({super.key});

  @override
  State<DiceRoller> createState() {
    return _DiceRollerState();
  }
}

class _DiceRollerState extends State<DiceRoller> {
  var roll = 1;

  void rollDice() {
    setState(() {
      roll = rng.nextInt(6) + 1;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(mainAxisSize: MainAxisSize.min, children: [
      Image.asset("assets/images/dice-$roll.png", width: 200),
      const SizedBox(height: 20),
      TextButton(
          onPressed: rollDice,
          style: TextButton.styleFrom(
              foregroundColor: Colors.white,
              textStyle: const TextStyle(fontSize: 28)),
          child: const Text("Roll"))
    ]);
  }
}
