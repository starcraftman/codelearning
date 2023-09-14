import 'package:uuid/uuid.dart';
import 'dart:io';
import 'package:section13/models/mapsConsts.dart';

const uuid = Uuid();

class Place {
  final String id;
  final String name;
  final File image;
  final PlaceLocation location;

  Place({required this.name, required this.image, required this.location})
      : id = uuid.v4();

  Place.fromMap(Map<String, dynamic> row)
      : id = row['id'] as String,
        name = row['name'] as String,
        image = File(row['imagePath'] as String),
        location = PlaceLocation.fromMap(row);

  @override
  String toString() {
    return "Place: $name ($id)";
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'imagePath': image.path,
      'lat': location.latitude,
      'lng': location.longitude,
      'address': location.address,
    };
  }
}

class PlaceLocation {
  final double latitude;
  final double longitude;
  final String address;

  const PlaceLocation({
    required this.latitude,
    required this.longitude,
    required this.address,
  });

  PlaceLocation.fromMap(Map<String, dynamic> row) :
    latitude = row['lat'] as double,
    longitude = row['lng'] as double,
    address = row['address'] as String;

  String locationImageUrl(String apiKey) {
    final lat = latitude;
    final lng = longitude;
    return '$kMapsStatic?center=$lat,$lng&zoom=16&size=600x300&maptype=roadmap&markers=color:red%7Clabel:A%7C$lat,$lng&key=$apiKey';
  }

  @override
  String toString() {
    return "PlaceLocation: $address ($latitude,$longitude)";
  }
}