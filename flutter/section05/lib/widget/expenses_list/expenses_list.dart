import 'package:flutter/cupertino.dart';

import "package:expense_tracker/model/expense.dart";
import "package:expense_tracker/widget/expenses_list/expense_item.dart";

class ExpensesList extends StatelessWidget {
  final void Function(Expense expense) onRemoveExpense;
  final List<Expense> expenses;

  const ExpensesList({super.key, required this.expenses, required this.onRemoveExpense});

  Widget itemBuilder(BuildContext ctx, int ind) {
    return Dismissible(
      onDismissed: (direction) {
        onRemoveExpense(expenses[ind]);
      },
        key: ValueKey(expenses[ind]), child: ExpenseItem(expenses[ind]));
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
        itemCount: expenses.length, itemBuilder: itemBuilder);
  }
}
