import 'package:flutter/material.dart';
import "package:section03/questions_screen.dart";
import "package:section03/results_screen.dart";
import "package:section03/start_screen.dart";
import "package:section03/data/questions.dart";

class Quiz extends StatefulWidget {
  const Quiz({super.key});

  @override
  State<StatefulWidget> createState() {
    return _QuizState();
  }
}

class _QuizState extends State<Quiz> {
  String activeScreen = "start-screen";
  final List<String> selectedAnswers = [];

  void addAnswer(String choice) {
    selectedAnswers.add(choice);

    if (selectedAnswers.length == questions.length) {
      setState(() {
        activeScreen = "results-screen";
      });
    }
  }
  void setQuestionsScreen() {
    setState(() {
      activeScreen = "questions-screen";
    });
  }
  void setStartScreen() {
    setState(() {
      activeScreen = "start-screen";
      selectedAnswers.clear();
    });
  }

  // Summary of questions, answers and choice of user.s
  List<Map<String, Object>> getSummaryData() {
    final indices = List<int>.generate(questions.length, (index) => index);
    return indices.map((ind) {
      return {
        "question_index": ind,
        "question": questions[ind].question,
        "correct_answer": questions[ind].choices[0],
        "user_answer": selectedAnswers[ind],
        "is_correct": selectedAnswers[ind] == questions[ind].choices[0]
      };
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    Widget screenWidget = StartScreen(setQuestionsScreen);
    if (activeScreen == "questions-screen") {
      screenWidget = QuestionsScreen(addAnswer);
    }
    if (activeScreen == "results-screen") {
      screenWidget = ResultsScreen(getSummaryData(), restartHandler: setStartScreen);
    }

    return MaterialApp(
      title: 'Quiz App',
      home: Scaffold(
          body: Container(
        decoration: const BoxDecoration(
            gradient: LinearGradient(
                colors: [Colors.purple, Colors.deepPurple],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight)),
        child: screenWidget,
      )),
    );
  }
}
