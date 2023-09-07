import 'package:flutter/material.dart';
import "package:google_fonts/google_fonts.dart";

import "package:section03/answer_button.dart";
import "package:section03/data/questions.dart";

class QuestionsScreen extends StatefulWidget {
  final void Function(String choice) addAnswerHandler;
  const QuestionsScreen(this.addAnswerHandler, {super.key});

  @override
  State<StatefulWidget> createState() {
    return _QuestionsScreenState();
  }
}

class _QuestionsScreenState extends State<QuestionsScreen> {
  int questionIndex = 0;

  void answerQuestion(String choice) {
    widget.addAnswerHandler(choice);
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
    var answersWithSizes = currentQuestion.shuffledChoices.map((choice) {
      return [
        AnswerButton(choice: choice, onPressHandler: () {
          answerQuestion(choice);
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
                style: GoogleFonts.lato(fontSize: 24, color: const Color.fromARGB(255, 201, 200, 251), fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,

            ),
            const SizedBox(height: 30),
          ...colChildren
        ]),
      ),
    );
  }
}
