import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

class StartScreen extends StatelessWidget {
  final void Function() startQuiz;
  const StartScreen(this.startQuiz, {super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(mainAxisSize: MainAxisSize.min, children: [
        Image.asset("assets/images/quiz-logo.png", width: 300, color: const Color.fromARGB(100, 255, 255, 255)),
        const SizedBox(height: 80),
        const Text("Learn Flutter the fun way!",
            style: TextStyle(fontSize: 28, color: Colors.white)),
        const SizedBox(height: 40),
        OutlinedButton.icon(
            onPressed: startQuiz,
            style: TextButton.styleFrom(
                foregroundColor: Colors.white,
                textStyle: const TextStyle(fontSize: 20)),
            icon: const Icon(Icons.arrow_right_alt),
            label: const Text("Start Quiz"))
      ]),
    );
  }
}
