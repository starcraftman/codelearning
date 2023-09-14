import 'package:uuid/uuid.dart';
import 'dart:io';

const uuid = Uuid();
class Place {
  final String id;
  final String name;
  final File image;
  final PlaceLocation location;

  Place({required this.name, required this.image, required this.location}) : id = uuid.v4();

  @override
  String toString() {
    return "Place: $name ($id)";
  }
}

class PlaceLocation {
  final double latitude;
  final double longitude;
  final String address;
  final String imageUrl;

  const PlaceLocation({
    required this.latitude,
    required this.longitude,
    required this.address,
    required this.imageUrl
  });

  @override
  String toString() {
    return "PlaceLocation: $address ($latitude,$longitude)";
  }
}