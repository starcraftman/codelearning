import 'package:expense_tracker/widget/expenses_list/expenses_list.dart';
import "package:flutter/material.dart";
import "package:expense_tracker/model/expense.dart";

class Expenses extends StatefulWidget {
  const Expenses({super.key});

  @override
  State<Expenses> createState() {
    return _ExpensesState();
  }
}

class _ExpensesState extends State<Expenses> {
  final List<Expense> _registeredExpenses = [
    Expense(title: "Flutter Course", amount: 19.99, date: DateTime.now(), category: ExpenseCategory.work),
    Expense(title: "Cinema", amount: 15.69, date: DateTime.now(), category: ExpenseCategory.leisure)
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          const Text("The Chart"),
          Expanded(child: ExpensesList(expenses: _registeredExpenses))
        ]
      ),
    );
  }

}