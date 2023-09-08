import "package:expense_tracker/models/expense.dart";
import "package:expense_tracker/widgets/expenses_list/expense_item.dart";
import "package:flutter/material.dart";

class ExpensesList extends StatelessWidget {
  final void Function(Expense expense) onRemoveExpense;
  final List<Expense> expenses;

  const ExpensesList({super.key, required this.expenses, required this.onRemoveExpense});
  Widget itemBuilder(BuildContext ctx, int ind) {
    return Dismissible(
      onDismissed: (direction) {
        onRemoveExpense(expenses[ind]);
      },
      background: Container(
        color: Theme.of(ctx).errorColor.withOpacity(0.75),
        margin: EdgeInsets.symmetric(
            horizontal: Theme.of(ctx).cardTheme.margin!.horizontal
        )
      ),
      key: ValueKey(expenses[ind]),
      child: ExpenseItem(expenses[ind]));
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
        itemCount: expenses.length, itemBuilder: itemBuilder);
  }
}
