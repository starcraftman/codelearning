# section13

## Getting Started

Steps to run project:

1) Requires a google maps API key.
2) Put key in file in assets/mapsAPI.private
3) Edit your key into the file at so that the entry is available for dependent package: `android/app/src/main/AndroidManifest.xml`
Example Should look like:
    <meta-data android:name="com.google.android.geo.API_KEY"
        android:value="API HERE"/>
4) Run a build
