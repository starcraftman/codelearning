import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:section13/models/place.dart';

class PlacesNotifier extends StateNotifier<List<Place>> {
  PlacesNotifier() : super([
    Place(id: "1", name: "Montreal")
  ]);

  void addPlace(Place place) {
    state = [...state, place];
  }
}

final placesProvider = StateNotifierProvider<PlacesNotifier, List<Place> >((ref) => PlacesNotifier());