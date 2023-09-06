import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

class QuizHome extends StatelessWidget {
  const QuizHome({super.key});

  void runQuiz() {
    if (kDebugMode) {
      print("Start the quiz");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(mainAxisSize: MainAxisSize.min, children: [

        Image.asset("assets/images/quiz-logo.png"),
        const SizedBox(height: 80),
        const Text("Learn Flutter the fun way!",
            style: TextStyle(fontSize: 28, color: Colors.white)),
        const SizedBox(height: 40),
        OutlinedButton(
            onPressed: runQuiz,
            style: TextButton.styleFrom(
                foregroundColor: Colors.white,
                textStyle: const TextStyle(fontSize: 20)),
            child: const Text("Start Quiz"))
      ]),
    );
  }
}
