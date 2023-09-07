import 'package:flutter/material.dart';
import "package:google_fonts/google_fonts.dart";

const correctColor = Color.fromARGB(255, 150, 198, 241);
const wrongColor = Color.fromARGB(255, 249, 133, 241);
const userAnswerColor =Color.fromARGB(255, 202, 171, 252);
const correctAnswerColor =Color.fromARGB(255, 181, 254, 246);
const titleColor = Color.fromARGB(255, 230, 200, 253);

class NumberedItem extends StatelessWidget {
  final String index;
  final bool isCorrectAnswer;

  const NumberedItem(
      {super.key, required this.index, required this.isCorrectAnswer});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 30,
      height: 30,
      alignment: Alignment.center,
      decoration: BoxDecoration(
          color: isCorrectAnswer ? correctColor : wrongColor,
          borderRadius: BorderRadius.circular(100)),
      margin: const EdgeInsets.only(bottom: 50),
      child: Text(index,
          style: const TextStyle(
              fontWeight: FontWeight.bold,
              color: Color.fromARGB(255, 22, 2, 56)
          )
      ),
    );
  }
}

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
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
        NumberedItem(index: index, isCorrectAnswer: isCorrect()),
        const SizedBox(width: 20),
        Expanded(
            child:
                Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(question,
              textAlign: TextAlign.left,
              style: GoogleFonts.lato(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 5),
          Text(answer,
              textAlign: TextAlign.left,
              style: const TextStyle(color: correctAnswerColor)),
          Text(choice, style: const TextStyle(color: userAnswerColor))
        ]))
      ]),
    );
  }
}

class ResultsScreenAlt extends StatelessWidget {
  final List<ResultItem> results;
  final void Function() restartHandler;

  const ResultsScreenAlt(this.results,
      {super.key, required this.restartHandler});

  @override
  Widget build(BuildContext context) {
    var correctAnswers = results.where((item) => item.isCorrect()).length;
    var title = Text(
        "You answered $correctAnswers out of ${results.length} questions correctly!",
        textAlign: TextAlign.center,
        style: GoogleFonts.lato(
          fontWeight: FontWeight.bold,
          fontSize: 20,
          color: titleColor,
        ));

      var restartButton = TextButton.icon(
      style: TextButton.styleFrom(
        foregroundColor: Colors.white,
      ),
      icon: const Icon(Icons.refresh),
      onPressed: restartHandler,
      label: const Text("Restart Quiz!")
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
                  height: 400,
                  child:
                      SingleChildScrollView(child: Column(children: results))),
              const SizedBox(height: 30),
              restartButton,
            ]),
      ),
    );
  }
}
