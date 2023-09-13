import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:section13/models/place.dart';

class PlacesNotifier extends StateNotifier<List<Place>> {
  PlacesNotifier() : super([]);

  void addPlace(Place place) {
    state = [place, ...state];
  }
  void removePlace(Place place) {
    state = state.where((existing) {
      return existing.id != place.id;
    }).toList();
  }
}

final placesProvider = StateNotifierProvider<PlacesNotifier, List<Place> >((ref) => PlacesNotifier());