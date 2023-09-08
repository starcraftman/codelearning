import 'package:expense_tracker/model/expense.dart';
import 'package:flutter/material.dart';

class ExpenseItem extends StatelessWidget {
  final Expense expense;

  const ExpenseItem(this.expense, {super.key});

  Widget iconSelector(ExpenseCategory cat) {
    IconData iconData;
    switch (cat) {
      case ExpenseCategory.food:
        iconData = Icons.local_pizza;
        break;
      case ExpenseCategory.travel:
        iconData = Icons.airplane_ticket;
        break;
      case ExpenseCategory.leisure:
        iconData = Icons.sports_basketball;
        break;
      default:
        iconData = Icons.work;
        break;
    }

    return Icon(iconData);
  }


  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        child: Column(
          children: [
            Text(expense.title),
            const SizedBox(height: 4),
            Row(
              children: [
                Text('\$${expense.amount.toStringAsFixed(2)}'),
                const Spacer(),
                Row(
                    children: [
                      iconSelector(expense.category),
                      const SizedBox(width: 8),
                      Text(expense.date.toString())
                    ]
                )
              ],
            )
          ]
        ),
      )
    );
  }
}