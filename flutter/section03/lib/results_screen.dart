import 'package:flutter/material.dart';
import "package:section03/questions_summary.dart";

// Reimplement ResultItem solution

class ResultsScreen extends StatelessWidget {
  final List<Map<String, Object>> results;
  final void Function() restartHandler;

  const ResultsScreen(this.results, {super.key, required this.restartHandler});

  @override
  Widget build(BuildContext context) {
    // First attempt by me
    // var correct = results.map((x) {
    //   return x["user_answer"] == x["correct_answer"] ? 1 : 0;
    // }).reduce((a, b) => a + b);
    var correctAnswers = results.where((item) {
      return item["user_answer"] == item["correct_answer"];
    }).length;

    return SizedBox(
      width: double.infinity,
      child: Container(
        margin: const EdgeInsets.all(40),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text("You answered $correctAnswers out of ${results.length} questions correctly!",
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 24, color: Colors.white, )),
            const SizedBox(height: 30),
            QuestionsSummary(results),
            const SizedBox(height: 30),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.restart_alt, color: Colors.white),
                TextButton(onPressed: restartHandler, child: const Text("Restart Quiz!", style: TextStyle(color: Colors.white)),)
              ],
            )
          ]
        ),
      ),
    );
  }
}