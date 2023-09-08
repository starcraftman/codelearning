import "package:flutter/material.dart";
import "package:flutter/cupertino.dart";

import "package:expense_tracker/models/expense.dart";
import "dart:io";

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

  void _showDialog(String title, String content) {
    if (Platform.isIOS) {
      showCupertinoDialog(
          context: context,
          builder: (BuildContext ctx) {
            return CupertinoAlertDialog(
                title: Text(title),
                content: Text(content),
                actions: [
                  TextButton(
                      onPressed: () => Navigator.pop(ctx),
                      child: const Text("Ok"))
                ]);
          });
    } else {
      showDialog(
          context: context,
          builder: (BuildContext ctx) {
            return AlertDialog(
                title: Text(title),
                content: Text(content),
                actions: [
                  TextButton(
                      onPressed: () => Navigator.pop(ctx),
                      child: const Text("Ok"))
                ]);
          });
    }
  }

  void _submitExpense(BuildContext ctx) {
    if (_titleController.text.trim().isEmpty) {
      return _showDialog("Invalid Title", "Please enter a valid title.");
    }
    final amt = double.tryParse(_amountController.text);
    if (amt == null || amt <= 0) {
      return _showDialog(
          "Invalid Amount", "Please enter a valid dollar amount.");
    }
    if (_selectedDate == null) {
      return _showDialog("Invalid Date", "Please select a valid date.");
    }

    // Validated inputs.
    widget.onAddExpense(Expense(
        title: _titleController.text,
        amount: amt,
        date: _selectedDate!,
        category: _selectedCategory));
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

  Widget layoutBuildModal(BuildContext ctx, BoxConstraints constraints) {
    final keyboardSpace = MediaQuery.of(context).viewInsets.bottom;
    final width = constraints.maxWidth;

    // In a real app this staircase would really need some separate widgets
    return SizedBox(
      height: double.infinity,
      child: SingleChildScrollView(
        child: Padding(
            padding: EdgeInsets.fromLTRB(16, 16, 16, keyboardSpace + 16),
            child: Column(children: [
              if (width >= 600)
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _titleController,
                        maxLength: 50,
                        decoration: const InputDecoration(label: Text("Title")),
                      ),
                    ),
                    const SizedBox(width: 24),
                    Expanded(
                      child: TextField(
                        controller: _amountController,
                        keyboardType: TextInputType.number,
                        decoration: const InputDecoration(
                            prefixText: "\$", label: Text("Amount")),
                      ),
                    ),
                  ],
                )
              else
                TextField(
                  controller: _titleController,
                  maxLength: 50,
                  decoration: const InputDecoration(label: Text("Title")),
                ),
              if (width > 600)
                Row(children: [
                  DropdownButton(
                      value: _selectedCategory,
                      items: ExpenseCategory.values
                          .map((cat) => DropdownMenuItem(
                              value: cat, child: Text(cat.name.toUpperCase())))
                          .toList(),
                      onChanged: _selectCategory),
                  const SizedBox(width: 24),
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
                ])
              else
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
              if (width > 600)
                Row(mainAxisAlignment: MainAxisAlignment.center, children: [
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
              else
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
            ])),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(builder: layoutBuildModal);
  }
}
