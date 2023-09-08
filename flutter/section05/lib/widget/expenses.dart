import 'package:expense_tracker/widget/expenses_list/expenses_list.dart';
import "package:expense_tracker/widget/new_expense.dart";
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
    Expense(
        title: "Flutter Course",
        amount: 19.99,
        date: DateTime.now(),
        category: ExpenseCategory.work),
    Expense(
        title: "Cinema",
        amount: 15.69,
        date: DateTime.now(),
        category: ExpenseCategory.leisure)
  ];

  void _openAddExpenseOverlay() {
    showModalBottomSheet(context: context, builder: (ctx) {
      return const NewExpense();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Flutter ExpenseTracker"), actions: [
        IconButton(onPressed: _openAddExpenseOverlay, icon: const Icon(Icons.add))
      ]),
      body: Column(children: [
        const Text("The Chart"),
        Expanded(child: ExpensesList(expenses: _registeredExpenses))
      ]),
    );
  }
}
