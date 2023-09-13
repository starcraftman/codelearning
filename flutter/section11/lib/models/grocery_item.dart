import 'package:section11/data/categories.dart';
import 'package:section11/models/category.dart';


class GroceryItem {
  final String id;
  final String name;
  final int quantity;
  final Category category;

  const GroceryItem({
    required this.id,
    required this.name,
    required this.quantity,
    required this.category
  });

  @override
  String toString() {
    return "GroceryItem: $name x $quantity ($category)";
  }

  static fromJson(Map<String, dynamic> data) {
    return GroceryItem(
      id: data['id'],
      name: data['name'],
      quantity: data['quantity'],
      category: categories.values.firstWhere((ent) => ent.name == data['category']!)
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'quantity': quantity,
      'category': category.name,
    };
  }

  updateId(String newId) {
    return GroceryItem(
        id: newId,
        name: name,
        quantity: quantity,
        category: category
    );  }

}
