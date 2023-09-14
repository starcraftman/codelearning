import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

import '../models/place.dart';

const defaultLocation = PlaceLocation(latitude: 37.422, longitude: -122.084, address: "Address", imageUrl: "");
class MapScreen extends StatefulWidget {
  final PlaceLocation location;
  final bool isSelecting;
  const MapScreen({super.key, this.location = defaultLocation, this.isSelecting = true});

  @override
  State<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {
  LatLng? _pickedLocation;

  @override
  Widget build(BuildContext context) {
    print("${widget.isSelecting} ${widget.location}");

    final locationLatLng = LatLng(widget.location.latitude, widget.location.longitude);
    Set<Marker> mapMarkers = {};
    if (_pickedLocation != null || !widget.isSelecting) {
      mapMarkers =  {
        Marker(
          markerId: MarkerId(widget.location.address),
          position: _pickedLocation ?? locationLatLng,
        )
      };
    }
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.isSelecting ? 'Pick your Location' : 'Your Location'),
        actions: [
          if (widget.isSelecting)
            IconButton(
              onPressed: () {
                Navigator.of(context).pop(_pickedLocation);
              },
              icon: const Icon(Icons.save)
          )
        ]
      ),
      body: GoogleMap(
        onTap: !widget.isSelecting ? null : (LatLng position) {
          setState(() {
            _pickedLocation = position;
          });
        },
        initialCameraPosition: CameraPosition(
          target: locationLatLng,
          zoom: 16
        ),
        markers: mapMarkers,
      ),
    );
  }
}