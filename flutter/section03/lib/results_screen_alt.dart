import 'package:flutter/material.dart';

// Alternate implementation of results for practice.
class ResultItem extends StatelessWidget {
  final String question;
  final String answer;
  final String choice;
  final String index;

  const ResultItem(
      {super.key,
      required this.question,
      required this.answer,
      required this.choice,
      required this.index});

  bool isCorrect() {
    return choice == answer;
  }

  @override
  Widget build(BuildContext context) {
    final circleColor = isCorrect() ? Colors.blue : Colors.red;
    return Row(crossAxisAlignment: CrossAxisAlignment.center, children: [
      Container(
        decoration: BoxDecoration(shape: BoxShape.circle, color: circleColor),
        alignment: Alignment.center,
        width: 40,
        margin: const EdgeInsets.only(bottom: 50),
        child: Text(index),
      ),
      Expanded(
          child:
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(question,
            textAlign: TextAlign.left,
            style: const TextStyle(color: Colors.white, fontSize: 16)),
        const SizedBox(height: 5),
        Text(answer,
            textAlign: TextAlign.left,
            style: const TextStyle(color: Colors.red)),
        Text(choice, style: const TextStyle(color: Colors.blue))
      ]))
    ]);
  }
}

class ResultsScreenAlt extends StatelessWidget {
  final List<ResultItem> results;
  final void Function() restartHandler;

  const ResultsScreenAlt(this.results,
      {super.key, required this.restartHandler});

  @override
  Widget build(BuildContext context) {
    var correctAnswers = results.where((item) {
      return item.isCorrect();
    }).length;

    var title = Text(
        "You answered $correctAnswers out of ${results.length} questions correctly!",
        textAlign: TextAlign.center,
        style: const TextStyle(
          fontSize: 24,
          color: Colors.white,
        )
    );

    var restartButton = Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Icon(Icons.restart_alt, color: Colors.white),
        TextButton(
          onPressed: restartHandler,
          child: const Text("Restart Quiz!",
              style: TextStyle(color: Colors.white)),
        )
      ],
    );

    return SizedBox(
      width: double.infinity,
      child: Container(
        margin: const EdgeInsets.all(40),
        child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              title,
              const SizedBox(height: 30),
              SizedBox(
                  height: 300,
                  child: SingleChildScrollView(
                      child: Column(children: results)
                  )
              ),
              const SizedBox(height: 30),
              restartButton,
            ]),
      ),
    );
  }
}
