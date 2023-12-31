import 'package:flutter/material.dart';
import 'dart:convert';

import 'package:section11/data/categories.dart';
import 'package:section11/models/category.dart';
import 'package:section11/models/grocery_item.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/services.dart' show rootBundle;

class NewItem extends StatefulWidget {
  const NewItem({super.key});

  @override
  State<NewItem> createState() {
    return _NewItemState();
  }
}

class _NewItemState extends State<NewItem> {
  final _formKey = GlobalKey<FormState>();
  String _enteredName = '';
  int _enteredQuantity = 1;
  Category _selectedCategory = categories[Categories.vegetables]!;
  bool isSending = false;

  void _saveItem() async {
    if (!_formKey.currentState!.validate()) {
      return ;
    }
    setState(() {
      isSending = true;
    });

    _formKey.currentState!.save();
    final groceryItem = GroceryItem(
      id: DateTime.now().toString(),
      name: _enteredName,
      quantity: _enteredQuantity,
      category: _selectedCategory
    );

    final fireUrl = await rootBundle.loadString('assets/secrets.private');
    final url = Uri.https(fireUrl.trim(), 'shop.json');
    final resp = await http.post(url,
        headers: {
          'Content-Type': 'application/json'
        },
        body: json.encode(groceryItem)
    );
    final id = json.decode(resp.body)['name'];
    if (context.mounted) {
      Navigator.pop(context, groceryItem.updateId(id));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Add a new item'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(12),
        child: Form(
            key: _formKey,
            child: Column(children: [
            TextFormField(
              maxLength: 50,
              decoration: const InputDecoration(
                label: Text("Name")
              ),
              validator: (value) {
                if (value == null || value.isEmpty || value.trim().length <= 1 || value.trim().length > 50) {
                  return "Names should be at least 2 characters.";
                }

                return null;
              },
              onSaved: (value) {
                _enteredName = value!;
              },
            ),
            Row(crossAxisAlignment: CrossAxisAlignment.end, children: [
              Expanded(
                child: TextFormField(
                  initialValue: '1',
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(
                      label: Text("Quantity")
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty || int.tryParse(value) == null || int.tryParse(value)! <= 0) {
                      return "Quantity must be a valid number.";
                    }

                    return null;
                  },
                  onSaved: (value) {
                    _enteredQuantity = int.parse(value!);
                  },
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: DropdownButtonFormField(
                  value: _selectedCategory,
                  items: [
                    for (final cat in categories.entries)
                      DropdownMenuItem(
                        value: cat.value,
                        child: Row(
                          children: [
                            Container(width: 16, height: 16, color: cat.value.color),
                            const SizedBox(width: 6),
                            Text(cat.value.name)
                          ],
                        )
                      )
                  ],
                  onChanged: (value) {
                    setState(() {
                      _selectedCategory = value!;
                    });
                  }
                ),
              )
            ],),
            const SizedBox(height:12),
            Row(mainAxisAlignment: MainAxisAlignment.end, children: [
              TextButton(onPressed: isSending ? null : () {
                _formKey.currentState!.reset();
              }, child: const Text("Reset")),
              ElevatedButton(
                  onPressed: isSending ? null : _saveItem,
                  child: isSending ? const SizedBox(height: 16, width: 16, child: CircularProgressIndicator()) : const Text("Add Item")
              )
            ],)
          ],)
        )
      )
    );
  }
}