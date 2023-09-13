import 'package:flutter/material.dart';

import 'package:section11/models/grocery_item.dart';
import 'package:section11/screens/new_item.dart';

class GroceryScreen extends StatefulWidget {
  const GroceryScreen({super.key});

  @override
  State<GroceryScreen> createState() => _GroceryScreenState();
}

class _GroceryScreenState extends State<GroceryScreen> {
  final List<GroceryItem> _groceryItems = [];

  void _addItem() async {
    final GroceryItem? item = await Navigator.of(context).push(MaterialPageRoute(builder: (ctx) => const NewItem()));
    if (item != null) {
      setState(() {
        _groceryItems.add(item);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    Widget listBody() {
      return ListView.builder(
        itemCount: _groceryItems.length,
        itemBuilder: (ctx, index) {
          final item = _groceryItems[index];
          return Dismissible(
            key: ValueKey(item),
            onDismissed: (direction) {
              setState(() {
                _groceryItems.remove(item);
              });
            },
            child: ListTile(
              title: Text(item.name),
              leading: Container(
                width: 24,
                height: 24,
                color: item.category.color,
              ),
              trailing: Text(item.quantity.toString()),
            ),
          );
        }
      );
    }

    Widget noItemsBody() {
      return const Center(
        child: Text("No items in list.",
          style: TextStyle(fontSize: 24),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text("Your Groceries"),
        actions: [
          IconButton(
            onPressed: _addItem,
            icon: const Icon(Icons.plus_one)
          )
        ],
      ),
      body: _groceryItems.isNotEmpty ? listBody() : noItemsBody()
    );
  }
}