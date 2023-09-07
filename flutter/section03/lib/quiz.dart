import 'package:flutter/material.dart';
import "package:section03/questions_screen.dart";
import "package:section03/results_screen.dart";
import "package:section03/start_screen.dart";
import "package:section03/data/questions.dart";
import "package:section03/results_screen_alt.dart";

class Quiz extends StatefulWidget {
  const Quiz({super.key});

  @override
  State<StatefulWidget> createState() {
    return _QuizState();
  }
}

class _QuizState extends State<Quiz> {
  String activeScreen = "start-screen";
  final List<String> _selectedAnswers = [];

  void addAnswer(String choice) {
    _selectedAnswers.add(choice);

    if (_selectedAnswers.length == questions.length) {
      setState(() {
        activeScreen = "results-screen-alt";
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
      _selectedAnswers.clear();
    });
  }

  // Summary of questions, answers and choice of user.s
  List<Map<String, Object>> get summaryData {
    final indices = List<int>.generate(questions.length, (index) => index);
    return indices.map((ind) {
      return {
        "question_index": ind,
        "question": questions[ind].question,
        "correct_answer": questions[ind].choices[0],
        "user_answer": _selectedAnswers[ind],
        "is_correct": _selectedAnswers[ind] == questions[ind].choices[0]
      };
    }).toList();
  }

  List<ResultItem> getResultsData() {
    final indices = List<int>.generate(questions.length, (index) => index);
    return indices.map((ind) {
      return ResultItem(question: questions[ind].question, answer: questions[ind].choices[0], choice: _selectedAnswers[ind], index: (ind + 1).toString());
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    Widget screenWidget = StartScreen(setQuestionsScreen);
    if (activeScreen == "questions-screen") {
      screenWidget = QuestionsScreen(addAnswer);
    }
    if (activeScreen == "results-screen") {
      screenWidget = ResultsScreen(summaryData, restartHandler: setStartScreen);
    }
    if (activeScreen == "results-screen-alt") {
      screenWidget = ResultsScreenAlt(getResultsData(), restartHandler: setStartScreen);
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
