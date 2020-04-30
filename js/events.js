// Alle Events als Daten in ein Array schreiben
// Muster [x-koordinate, y-koordinate, 1. Zeile Text, 2. Zeile Text
// TODO: Anbindung an MariaDB und nurnoch Daten von dort in die Arrays einlesen

// Initialisierung des Arrays in dem die einzelnen Events gespeichert werden
var eventArray = [];

// Beispiel Array
var someEvent = [190, 470, "Willkommen in Dremor",  "Klicken zu fortfahren", "", "Dremor wird betreten..."];
// Array in Hauptarray pushen
eventArray.push(someEvent);
