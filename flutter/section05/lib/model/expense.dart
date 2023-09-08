import 'package:flutter/material.dart';

import "package:uuid/uuid.dart";
import "package:intl/intl.dart";

const uuid = Uuid();

enum ExpenseCategory {
  food, travel, leisure, work
}

Map<Enum, IconData> expenseCategoryIcons = {
  ExpenseCategory.food: Icons.lunch_dining,
  ExpenseCategory.travel: Icons.flight_takeoff,
  ExpenseCategory.leisure: Icons.movie,
  ExpenseCategory.work: Icons.work,
};

final formatter = DateFormat.yMd();
class Expense {
  final String id;
  final String title;
  final ExpenseCategory category;
  final double amount;
  final DateTime date;

  @override
  String toString() {
    return "Expense(id='$id', title='$title', amount=$amount, category=$category, date=$date)";
  }

  IconData get iconData {
    return expenseCategoryIcons[category]!;
  }

  String get formattedDate {
    return formatter.format(date);
  }

  Expense({required this.title, required this.amount, required this.date, required this.category})
      : id = uuid.v4();
}
