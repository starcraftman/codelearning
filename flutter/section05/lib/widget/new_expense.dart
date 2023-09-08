import "package:flutter/material.dart";

import "package:expense_tracker/model/expense.dart";

class NewExpense extends StatefulWidget {
  const NewExpense({super.key});

  @override
  State<StatefulWidget> createState() {
    return _NewExpenseState();
  }
}

class _NewExpenseState extends State<NewExpense> {
  final _titleController = TextEditingController(text: "");
  final _amountController = TextEditingController(text: "");
  DateTime? _selectedDate;
  ExpenseCategory _selectedCategory = ExpenseCategory.leisure;

  @override
  void dispose() {
    _titleController.dispose();
    _amountController.dispose();
    super.dispose();
  }

  void _submitExpense() {
    print(
        "Expense with title ${_titleController.text} and amount ${_amountController.text}");
  }

  void _cancelExpense(BuildContext ctx) {
    Navigator.pop(ctx);
  }

  void _presentDatePicker() async {
    final now = DateTime.now();
    final initialDate = DateTime(now.year - 1, now.month, now.day);
    final pickedDate = await showDatePicker(
        context: context,
        initialDate: now,
        firstDate: initialDate,
        lastDate: now);
    setState(() {
      _selectedDate = pickedDate;
    });
  }

  void _selectCategory(value) {
    if (value != null) {
      setState(() {
        _selectedCategory = value;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.all(16),
        child: Column(children: [
          TextField(
            controller: _titleController,
            maxLength: 50,
            decoration: const InputDecoration(label: Text("Title")),
          ),
          Row(children: [
            Expanded(
              child: TextField(
                controller: _amountController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                    prefixText: "\$", label: Text("Amount")),
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
                child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Text(_selectedDate == null
                    ? "Selected Date"
                    : formatter.format(_selectedDate!)),
                IconButton(
                    onPressed: _presentDatePicker,
                    icon: const Icon(Icons.calendar_month))
              ],
            ))
          ]),
          const SizedBox(height: 16),
          Row(mainAxisAlignment: MainAxisAlignment.center, children: [
            DropdownButton(
                value: _selectedCategory,
                items: ExpenseCategory.values
                    .map((cat) => DropdownMenuItem(
                        value: cat, child: Text(cat.name.toUpperCase())))
                    .toList(),
                onChanged: _selectCategory),
            const Spacer(),
            ElevatedButton(
                onPressed: () => _cancelExpense(context),
                child: const Text("Cancel")),
            const SizedBox(
              width: 40,
            ),
            ElevatedButton(
                onPressed: _submitExpense, child: const Text("Save")),
          ])
        ]));
  }
}
