import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:section13/models/place.dart';
import 'package:section13/providers/places_provider.dart';

class AddPlacesScreen extends ConsumerStatefulWidget {
  const AddPlacesScreen({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() {
    return _AddPlaceScreenState();
  }
}

class _AddPlaceScreenState extends ConsumerState<AddPlacesScreen> {
  final _formKey = GlobalKey<FormState>();
  String _enteredPlace = "";

  void _submitPlace() {
    if (!_formKey.currentState!.validate()) {
      return;
    }
    final placesNotifier = ref.watch(placesProvider.notifier);
    placesNotifier.addPlace(Place(id: DateTime.now().toString(), name: _enteredPlace));
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    final formBody = Padding(
      padding: const EdgeInsets.all(12.0),
      child: Form(
        key: _formKey,
        child: Column(
          children: [
            TextFormField(
              validator: (value) {
                if (value == null || value.trim().isEmpty || value.trim().length < 3) {
                  return "Place names should be at least 3 characters.";
                }

                return null;
              },
              onSaved: (newValue) {
                _enteredPlace = newValue!;
              },
              style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                  color: Theme.of(context).colorScheme.secondary
              ),
              decoration:const InputDecoration(
                label: Text("Title"),
              ),
            ),
            const SizedBox(height: 20,),
            ElevatedButton(
              onPressed: () {
                _submitPlace();
              },
              child: const Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.add, size: 24,),
                  SizedBox(width: 10,),
                  Text("Add Place")
                ],
              )
            )
          ],
        )
      ),
    );

    return Scaffold(
      appBar: AppBar(
        title: const Text("Add new Place"),
      ),
      body: formBody,
    );
  }
}