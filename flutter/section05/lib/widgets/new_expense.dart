import "package:flutter/material.dart";

import "package:expense_tracker/models/expense.dart";

class NewExpense extends StatefulWidget {
  final void Function(Expense expense) onAddExpense;
  const NewExpense(this.onAddExpense, {super.key});

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

  void _submitExpense(BuildContext ctx) {
    helper(String title, String content) {
      return AlertDialog(title: Text(title), content: Text(content), actions: [
        TextButton(onPressed: () => Navigator.pop(ctx), child: const Text("Ok"))
      ]);
    }

    if (_titleController.text.trim().isEmpty) {
      showDialog(
          context: context,
          builder: (BuildContext ctx) {
            return helper("Invalid Title", "Please enter a title.");
          });
      return;
    }
    final amt = double.tryParse(_amountController.text);
    if (amt == null || amt <= 0) {
      showDialog(
          context: context,
          builder: (BuildContext ctx) {
            return helper(
                "Invalid Amount", "Please enter an amount greater than 0.");
          });
      return;
    }
    if (_selectedDate == null) {
      showDialog(
          context: context,
          builder: (BuildContext ctx) {
            return helper("Invalid Date", "Please select a valid date.");
          });
      return;
    }

    // Validated inputs.
    widget.onAddExpense(Expense(title: _titleController.text, amount: amt, date: _selectedDate!, category: _selectedCategory));
    Navigator.pop(ctx);
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
        padding: const EdgeInsets.fromLTRB(16, 48, 16, 16),
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
                onPressed: () => _submitExpense(context),
                child: const Text("Save")),
          ])
        ]));
  }
}
