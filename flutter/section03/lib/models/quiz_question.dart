class QuizQuestion {
  final String question;
  final List<String> choices;

  const QuizQuestion(this.question, this.choices);

  List<String> getShuffledChoices() {
    final shuffledChoices = List.of(choices);
    shuffledChoices.shuffle();
    return shuffledChoices;
  }
}