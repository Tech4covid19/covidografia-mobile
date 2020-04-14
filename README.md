# Covidografia Mobile

# Install
Install ionic globally the run npm install
```sh
$ npm install -g @ionic/cli
$ npm install
```

# Run
Run on the web
```sh
$ ionic serve
```

Run on an emulator or physical Android device with Livereload 
```sh
$ npm run devandroid
```

Run on an emulator or physical iOS device with Livereload 
```sh
$ npm run devios
```

# Prod Build

For the web
```sh
$ ionic build --prod
```

For Android run the following commando and hit play on Android Studio
```sh
$ npm run android
```

For iOS run the following commando and hit play on XCode
```sh
$ npm run ios
```
# Resources
Install this package globally
```sh
npm install -g cordova-res --unsafe-perm
```
Then inside project's root run:
```sh
cordova-res --skip-config --copy 
```
Follow the specs at: <br>
https://github.com/ionic-team/cordova-res#capacitor

