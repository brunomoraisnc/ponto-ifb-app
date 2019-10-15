# Event Attendance Control Project

## Introduction
Event attendance control mobile app development.

## Objectives
- To facilitate the monitoring of students in events of the Federal Institute of Brasília;
- To automate a task executed by teachers.

## Technologies
[**IONIC Framework**](https://ionicframework.com/)

Native components:

[Geolocation](https://ionicframework.com/docs/v3/native/geolocation/)

[HTTP](https://ionicframework.com/docs/v3/native/http/)

## Setup

Download the repository files:

```
git clone https://github.com/brunomoraisnc/ponto-ifb-app.git
```

Go to the ```trabalhoppi``` folder and [install NPM + NODEJS](https://nodejs.org/en/).

Then the Ionic CLI via NPM:

```
npm install -g ionic
```

The dependencies:

```
npm install
```

(If needed: ```npm config set unsafe-perm true```)

Serve it:

```
ionic serve
```

## Android Deployment

Follow the instructions in [Ionic Docs](https://ionicframework.com/docs/building/android)
 to generate the Android project. [And deploy it after Java 8, Android SDK, and Gradle installation.](https://ionicframework.com/docs/v3/intro/deploying/)


Build:

```
ionic cordova build android
```

Run:

```
ionic cordova run android --device
```

## More information about the project
The project was developed with the support of [Professor Fábio Henrique](https://sites.google.com/view/oliveirafhm/home) during the Internet Programming 2 discipline of the Federal Institute of Brasília's Internet Systems course. 

Another module of the project comprises [a REST API development](https://github.com/brunomoraisnc/api-rest-ppi) hosted on the HEROKU cloud application platform.
