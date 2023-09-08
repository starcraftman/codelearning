import "package:uuid/uuid.dart";

const uuid = Uuid();

enum ExpenseCategory {
  food, travel, leisure, work
}

class Expense {
  final String id;
  final String title;
  final ExpenseCategory category;
  final double amount;
  final DateTime date;

  Expense({required this.title, required this.amount, required this.date, required this.category})
      : id = uuid.v4();
}
