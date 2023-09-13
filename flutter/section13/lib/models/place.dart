import 'package:uuid/uuid.dart';
import 'dart:io';

const uuid = Uuid();
class Place {
  final String id;
  final String name;
  final File image;

  Place({required this.name, required this.image}) : id = uuid.v4();

  @override
  String toString() {
    return "Place: $name ($id)";
  }
}