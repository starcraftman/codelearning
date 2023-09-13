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
  bool _isLoading = true;
  String _error = '';

  @override
  void initState() {
    super.initState();
    _loadItems();
  }

  void _loadItems() async {
    final fireUrl = await rootBundle.loadString('assets/secrets.private');
    final url = Uri.https(fireUrl, 'shop.json');
    final resp = await http.get(url);

    print("Resp: ${resp.statusCode}");
    if (resp.statusCode > 400) {
      setState(() {
        _isLoading = false;
        _error = "Failed to fetch data. Try again later.";
      });
      return;
    }

    final Map<String, dynamic> data = json.decode(resp.body);
      List<GroceryItem> loadedItems = [];
      for (final key in data.keys) {
        data[key]?['id'] = key;
        GroceryItem item = GroceryItem.fromJson(data[key]!);
        loadedItems.add(item);
      }
    setState(() {
      _groceryItems = loadedItems;
    });
    _isLoading = false;
  }

  void _removeItemFire(GroceryItem item) async {
    final fireUrl = await rootBundle.loadString('assets/secrets.private');
    final url = Uri.https(fireUrl.trim(), 'shop.json');
    final resp = await http.delete(url,
        headers: {
          'Content-Type': 'application/json'
        },
        body: json.encode({'id': item.id})
    );

    final Map<String, dynamic> data = json.decode(resp.body);
    List<GroceryItem> loadedItems = [];
    for (final key in data.keys) {
      data[key]?['id'] = key;
      GroceryItem item = GroceryItem.fromJson(data[key]!);
      loadedItems.add(item);
    }
    setState(() {
      _groceryItems = loadedItems;
    });
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

  @override
  Widget build(BuildContext context) {
    Widget groceryBody() {
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

    Widget content = const Center(
      child: Text("No items in list.",
        style: TextStyle(fontSize: 24),
      ),
    );
    if (_isLoading) {
      content = const Center(child: CircularProgressIndicator());
    }
    if (_error.trim().isNotEmpty) {
      content = Center(child: Text(_error, style: const TextStyle(color: Colors.red)));
    }
    if (_groceryItems.isNotEmpty) {
      content = groceryBody();
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
      body: content
    );
  }
}