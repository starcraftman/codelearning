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
      selectedAnswers.clear();
      setState(() {
        activeScreen = "start-screen";
      });
    }
  }

  void switchScreen() {
    setState(() {
      activeScreen = "questions-screen";
    });
  }


  @override
  Widget build(BuildContext context) {
    Widget screenWidget = StartScreen(switchScreen);
    if (activeScreen == "questions-screen") {
      screenWidget = QuestionsScreen(addAnswer);
    }
    if (activeScreen == "results-screen") {
      screenWidget = ResultsScreen(selectedAnswers);
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
