import "package:flutter/material.dart";

class AnswerButton extends StatelessWidget {
  final String choice;
  final void Function() onPressHandler;
  const AnswerButton({super.key, required this.choice, required this.onPressHandler});

  @override
  Widget build(BuildContext context) {

    return ElevatedButton(
        onPressed: onPressHandler,
        style: ElevatedButton.styleFrom(
          backgroundColor: const Color.fromARGB(255, 33, 1, 95),
          foregroundColor: Colors.white,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(40)),
          padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 40),
          textStyle: const TextStyle(fontSize: 18),
        ),
        child: Text(choice, textAlign: TextAlign.center,));
  }
}
