import "dart:math";

import 'package:flutter/material.dart';
import "package:section03/answer_button.dart";
import "package:section03/data/questions.dart";

class QuestionsScreen extends StatefulWidget {
  const QuestionsScreen({super.key});

  @override
  State<StatefulWidget> createState() {
    return _QuestionsScreenState();
  }
}

class _QuestionsScreenState extends State<QuestionsScreen> {
  int questionIndex = 0;

  void answerQuestion(String choice, String answer) {
    if (answer == choice) {
      print("Correct");
    } else {
      print("Wrong");
    }
    if (questions.length != questionIndex + 1) {
      setState(() {
        questionIndex += 1;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final currentQuestion = questions[questionIndex];

    // Mapped then expand 2d list
    var answersWithSizes = currentQuestion.getShuffledChoices().map((choice) {
      return [
        AnswerButton(choice: choice, onPressHandler: () {
          answerQuestion(choice, currentQuestion.choices[0]);
        }),
        const SizedBox(height: 12)
      ];
    });
    List<Widget> colChildren = [for (var list in answersWithSizes) ...list];

    // For each implementation
    // currentQuestion.choices.forEach((choice) {
    //   colChildren.addAll([
    //     AnswerButton(choice: choice, onPressHandler: () {}),
    //     const SizedBox(height: 12)
    //   ]);
    // });
    // For loop implementation
    // for (final choice in currentQuestion.choices) {
    //   colChildren.addAll([
    //     AnswerButton(choice: choice, onPressHandler: () {}),
    //     const SizedBox(height: 12)
    //   ]);
    // }

    return SizedBox(
      width: double.infinity,
      child: Container(
        margin: const EdgeInsets.all(40),
        child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
            Text(currentQuestion.question,
                style: const TextStyle(fontSize: 18, color: Colors.white),
              textAlign: TextAlign.center,

            ),
            const SizedBox(height: 30),
          ...colChildren
        ]),
      ),
    );
  }
}
