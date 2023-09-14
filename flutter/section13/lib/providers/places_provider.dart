import 'dart:io';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:path_provider/path_provider.dart' as syspaths;
import 'package:path/path.dart' as path;
import 'package:sqflite/sqflite.dart' as sqfl;
import 'package:sqflite/sqlite_api.dart';

import 'package:section13/models/place.dart';


Future<Database> _getDatabase() async {
  final dbPath = await sqfl.getDatabasesPath();
  return await sqfl.openDatabase(path.join(dbPath, 'places.db'),
      onCreate: (db, version) {
        return db.execute('CREATE TABLE user_places(id TEXT PRIMARY KEY, name TEXT, imagePath TEXT, lat REAL, lng REAL, address TEXT, imageUrl TEXT);');
      },
      version: 1
  );
}

class PlacesNotifier extends StateNotifier<List<Place>> {
  PlacesNotifier() : super([]);

  void addPlace({required String name, required File image, required PlaceLocation location}) async {
    final appDir = await syspaths.getApplicationDocumentsDirectory();
    final filename = path.basename(image.path);
    final copiedImage = await image.copy("${appDir.path}/$filename");
    final newPlace = Place(name: name, image: copiedImage, location: location);

    final db = await _getDatabase();
    db.insert('user_places', newPlace.toMap());

    state = [newPlace, ...state];
  }
  void removePlace(Place place) {
    state = state.where((existing) {
      return existing.id != place.id;
    }).toList();
  }

  Future<void> loadPlaces() async {
    final db = await _getDatabase();
    final data = await db.query('user_places');
    state = data.map((row) => Place.fromMap(row)).toList();
  }
}

final placesProvider = StateNotifierProvider<PlacesNotifier, List<Place> >((ref) => PlacesNotifier());