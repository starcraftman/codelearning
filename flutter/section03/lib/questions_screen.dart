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
  String question = "How many legs on my cat?";
  List<String> choices = ["2 legs", "3 legs", "4 legs", "5 legs"];
  String answer = "4 legs";
  int index = 0;

  void setQuestion({required question, required choices, required answer}) {
    this.question = question;
    this.choices = choices;
    this.answer = answer;
  }

  void verify(int choice) {
    if (choices[choice] == answer) {
      print("Correct answer");
    } else {
      print("Wrong!!!");
    }
  }

  @override
  Widget build(BuildContext context) {
    final currentQuestion = questions[0];

    final shuffledChoices = [...currentQuestion.choices];
    // Mapped then expand 2d list
    var answersWithSizes = shuffledChoices.map((choice) {
      return [
        AnswerButton(choice: choice, onPressHandler: () {}),
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
              Text(
                currentQuestion.question,
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
