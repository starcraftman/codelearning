import "package:flutter/material.dart";

import 'package:expense_tracker/widgets/expenses_list/expenses_list.dart';
import "package:expense_tracker/widgets/new_expense.dart";
import "package:expense_tracker/models/expense.dart";
import "package:expense_tracker/widgets/chart/chart.dart";

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

  void _addExpense(Expense expense) {
    setState(() {
      _registeredExpenses.add(expense);
    });
  }

  void _removeExpense(Expense expense) {
    final expenseIndex = _registeredExpenses.indexOf(expense);
    setState(() {
      _registeredExpenses.remove(expense);
    });
    final scaffoldMessenger = ScaffoldMessenger.of(context);
    scaffoldMessenger.clearSnackBars();
    scaffoldMessenger.showSnackBar(SnackBar(
        action: SnackBarAction(
          label: "Undo",
          onPressed: () {
            setState(() {
              _registeredExpenses.insert(expenseIndex, expense);
            });
          },
        ),
        duration: const Duration(seconds: 3),
        content: const Text("Expense deleted.")
    ));
  }

  void _openAddExpenseOverlay() {
    showModalBottomSheet(
        isScrollControlled: true, context: context, builder: (ctx) {
      return NewExpense(_addExpense);
    });
  }

  @override
  Widget build(BuildContext context) {
    Widget mainContent = const Center(
        child: Text("No expenses found.")
    );
    if (_registeredExpenses.isNotEmpty) {
      mainContent = ExpensesList(
          expenses: _registeredExpenses, onRemoveExpense: _removeExpense);
    }

    final mediaSize = MediaQuery.of(context).size;
    Widget scaffoldBody = Column(children: [
      Chart(expenses: _registeredExpenses),
      Expanded(child: mainContent)
    ]);
    if (mediaSize.width > 600) {
      scaffoldBody = Row(children: [
        Expanded(child: Chart(expenses: _registeredExpenses)),
        Expanded(child: mainContent)
      ]);
    }

    return Scaffold(
      appBar: AppBar(title: const Text("Flutter ExpenseTracker"), actions: [
        IconButton(
            onPressed: _openAddExpenseOverlay, icon: const Icon(Icons.add))
      ]),
      body: scaffoldBody,
    );
  }
}
