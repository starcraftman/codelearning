import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

import '../models/place.dart';

const defaultLocation = PlaceLocation(latitude: 37.422, longitude: -122.084, address: "Address", imageUrl: "");
class MapScreen extends StatefulWidget {
  final PlaceLocation location;
  const MapScreen({super.key, this.location = defaultLocation});

  @override
  State<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {
  bool isSelecting() {
    return !(widget.location.address == "Address" && widget.location.imageUrl == "");
  }
  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: Text(isSelecting() ? 'Pick your Location' : 'Your Location'),
        actions: [
          if (isSelecting())
            IconButton(
              onPressed: () {},
              icon: const Icon(Icons.save)
          )
        ]
      ),
      body: GoogleMap(
        initialCameraPosition: CameraPosition(
          target: LatLng(widget.location.latitude, widget.location.longitude),
          zoom: 16
        ),
        markers: {
          Marker(
            markerId: MarkerId(widget.location.address),
            position: LatLng(widget.location.latitude, widget.location.longitude),
          )
        },
      ),
    );
  }
}