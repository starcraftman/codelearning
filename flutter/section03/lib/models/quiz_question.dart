class QuizQuestion {
  final String question;
  final List<String> choices;

  const QuizQuestion(this.question, this.choices);

  List<String> get shuffledChoices {
    final shuffledChoices = List.of(choices);
    shuffledChoices.shuffle();
    return shuffledChoices;
  }
}