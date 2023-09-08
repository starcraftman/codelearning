import 'package:expense_tracker/models/expense.dart';
import 'package:flutter/material.dart';

class ExpenseItem extends StatelessWidget {
  final Expense expense;

  const ExpenseItem(this.expense, {super.key});

  // Information below the title.
  Widget bottomRow() {
    return Row(
      children: [
        Text('\$${expense.amount.toStringAsFixed(2)}'),
        const Spacer(),
        Row(
            children: [
              Icon(expense.iconData),
              const SizedBox(width: 8),
              Text(expense.formattedDate)
            ]
        )
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(expense.title, style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: 4),
            bottomRow()
          ]
        ),
      )
    );
  }
}