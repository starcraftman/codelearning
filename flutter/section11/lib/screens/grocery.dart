import 'package:flutter/material.dart';
import 'dart:convert';

import 'package:section11/models/grocery_item.dart';
import 'package:section11/screens/new_item.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:http/http.dart' as http;

class GroceryScreen extends StatefulWidget {
  const GroceryScreen({super.key});

  @override
  State<GroceryScreen> createState() => _GroceryScreenState();
}

class _GroceryScreenState extends State<GroceryScreen> {
  List<GroceryItem> _groceryItems = [];
  late Future<List<GroceryItem>> _loadedItems;

  @override
  void initState() {
    super.initState();
    _loadedItems = _loadItems();
  }

  Future<List<GroceryItem>> _loadItems() async {
    final fireUrl = await rootBundle.loadString('assets/secrets.private');
    final url = Uri.https(fireUrl.trim(), 'shop.json');
    final resp = await http.get(url);
    if (resp.statusCode > 400) {
      throw Exception("Failed to fetch data. Try again later.");
    }

    if (resp.body == 'null') {
      return [];
    }

    final Map<String, dynamic> data = json.decode(resp.body);
    List<GroceryItem> loadedItems = [];
    for (final key in data.keys) {
      data[key]?['id'] = key;
      GroceryItem item = GroceryItem.fromJson(data[key]!);
      loadedItems.add(item);
    }
    return loadedItems;
  }

  void _removeItemFire(GroceryItem item) async {
    final index = _groceryItems.indexOf(item);
    setState(() {
      _groceryItems.remove(item);
    });

    final fireUrl = await rootBundle.loadString('assets/secrets.private');
    final url = Uri.https(fireUrl.trim(), 'shop/${item.id}.json');
    final resp = await http.delete(url);

    if (resp.statusCode > 400) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).clearSnackBars();
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text("Failed to delete item, backend down.")));
      }
      setState(() {
        _groceryItems.insert(index, item);
      });
    }
  }

  void _addItem() async {
    final GroceryItem? newItem = await Navigator.of(context).push(MaterialPageRoute(builder: (ctx) => const NewItem()));
    if (newItem == null) {
      return;
    }

    setState(() {
      _groceryItems.add(newItem);
    });
  }

  Widget groceryBody(List<GroceryItem> groceryItems) {
    return ListView.builder(
        itemCount: groceryItems.length,
        itemBuilder: (ctx, index) {
          final item = groceryItems[index];
          return Dismissible(
            key: ValueKey(item),
            onDismissed: (direction) {
              _removeItemFire(item);
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

  @override
  Widget build(BuildContext context) {
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
      body: FutureBuilder<List<GroceryItem>> (
        builder: (context, snapshot) {
          Widget content = const Center(
            child: Text("No items in list.",
              style: TextStyle(fontSize: 24),
            ),
          );

          if (snapshot.connectionState == ConnectionState.waiting) {
            content = const Center(child: CircularProgressIndicator());
          }
          if (snapshot.hasError) {
            content = Center(child: Text(snapshot.error.toString(), style: const TextStyle(fontSize: 28, color: Colors.red)));
          }
          if (snapshot.data != null && snapshot.data!.isNotEmpty) {
            content = groceryBody(snapshot.data!);
          }

          return content;
        },
        future: _loadedItems,
      )
    );
  }
}