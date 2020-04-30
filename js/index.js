// Canvas initialisieren
const canvas = document.querySelector('canvas');
// Canvas Context Objekt in kürzere Variable packen
const c = canvas.getContext('2d');
// Gesamtes Canvas anhand der ID erfassen - für EventListener
const cByID = document.getElementById("game");
// Hintergrundbild laden
var map = new Image;
map.src = "./img/map.png";

// Eigenschaften für das Canvas festlegen
// Höhe und Breite
canvas.width = 600;
canvas.height = 600;
// Schriftart
c.font = "10px Arial";

// Spieler Eigenschaften festlegen
var playerSizeWidth = 10;
var playerSizeHeight = 10;
var playerStepSize = 10;
var playerColor = "black";

// Startpunkt und Save für "Spieler" festlegen
var currentX = 200;
var currentY = 500;
var oldX;
var oldY;


// Variable für Event Images initialisieren
var bubbleX;
var bubbleY;

// TEST IMAGE DRAW EVENT
var event1_img = new Image;
event1_img.src = "./img/blase1.png";


// Nach laden der Karte diese auf das Canvas rendern und Spieler initial platzieren
window.onload = function () {
	c.drawImage(map, 0, 0);
	c.fillStyle = playerColor;
	c.fillRect(currentX, currentY, playerSizeWidth, playerSizeHeight);
}


// Bewegung ausführen
function refreshMap (newX, newY) {
	// Ausgangsposition vor Bewegung abspeichern für den Fall
	// das sie Rückgängig gemacht werden muss
	oldX = currentX;
	oldY = currentY;
	// Map Image neu laden
	c.drawImage(map, 0, 0);
	// Spieler auf neues Feld platzieren
	c.fillRect(newX, newY, playerSizeWidth, playerSizeHeight);
	// Neue Koordinaten sind nach Bewegung die aktuellen Koordinaten
	currentX = newX;
	currentY = newY;
	// Überprüfen ob das aktuelle Feld passierbar ist - siehe Kommentar zur Funktion
	testForBlockade(block);
	// Überprüfen ob auf dem aktuellen Feld ein Event statt findet
	checkForEvent();
}

// Auf Blockade prüfen
function testForBlockade(blockArray) {
	// blockArray enthält Funktionen zur Errechnung unpassierbarer Felder
	// in einem Mehrdimensionalen Array, siehe Datei blockades.js
	blockArray.forEach(checkArray);
	function checkArray (coordinatePair) {
		// Falls sowohl die X als auch Y Koordinate mit der
		// aktuellen Position übereinstimmt wird die Funktion
		// refreshMapB mit den vorherigen Koordinaten aufgerufen
		if (currentX == coordinatePair[0] && currentY == coordinatePair[1]) {
			refreshMapB (oldX, oldY);
		}
	}
};

// Bewegung "stoppen" für den Fall das sich auf ein nicht passierbares Feld bewegt wurde.
// Macht effektiv die soeben erfolgte Bewegung rückgängig
function refreshMapB (oldX, oldY) {
	c.drawImage(map, 0, 0);
	c.fillRect(oldX, oldY, playerSizeWidth, playerSizeHeight);
	// Koordinaten der vorherigen Position sind wieder gleich der aktuellen Position
	currentX = oldX;
	currentY = oldY;
}

// Überprüfen ob ein Event stattfindet
function checkForEvent() {
	// eventArray auf Übereinstimmung mit aktueller Position prüfen
	eventArray.forEach(checkArray);
	function checkArray (eventInfo) {
		// Ein Event findet statt
		if (currentX == eventInfo[0] && currentY == eventInfo[1]) {
			// Übergebe die Informationen des Events an handleEvent
			handleEvent(eventInfo[0], eventInfo[1], eventInfo[2], eventInfo[3], eventInfo[4], eventInfo[5]);
		}
	}
}

// Wertet übergebene Events aus
// TODO: Eventtypen bestimmen, Zufälliges auftreten herbeiführen
// eTL = eventTextLine
function handleEvent (x, y, eTL1, eTL2, eTL3, eTL4) {
	// Überprüfen ob ein Event übergeben wurde oder nur
	// der EventListener abgeschaltet werden soll
	if ( x != undefined ) {
		// Überprüfe auf Mausklicks innerhalb des Spielfensters
		cByID.addEventListener('click', handleClick);
		// Sprechblase mit Text anzeigen
		draw_bubble1(eTL1, eTL2);
	}else{
		// Fehlerausgabe falls ein Event fehlerhaft ist
		console.log("Fehlerhaftes Event!");
	}
	// Funktion um auf Mausklick zu reagieren
	function handleClick () {
		// Aktuelle Position abgleichen mit stattfindendem Event
		if ( x == currentX && y == currentY ) {
			// Map neu laden um vorherige Blase zu löschen
			refreshMap(currentX, currentY);
			// Neue Sprechblase anzeigen
			// TODO: Event Array um Inhalt für diese Blase zu erweitern
			draw_bubble1(eTL3, eTL4);
			// TODO Map ausblenden und mit Event fortfahren
			// cByID.style.display = "none";
		}else{
			// Falls der Spieler den Eventbereich verlässt
			// wird der EventListener gestoppt
			cByID.removeEventListener('click', handleClick);
		}
	}
}

// Spieler Steuerung
// Benutzereingabe überprüfen und Funktionen entsprechend aufrufen

// Eventlistener für Tastatur
document.addEventListener('keydown', controlPlayerWithKeyboard);
// Nach Rechts bewegen
function moveRight() {
	var newX = currentX + playerStepSize;
	refreshMap(newX, currentY);
}
// Mit Button - Rechts
document.getElementById("MoveRight").onclick = function () {
	moveRight();
}
// Nach Links bewegen
function moveLeft() {
	var newX = currentX - playerStepSize;
	refreshMap(newX, currentY);
}
// Mit Button - Links
document.getElementById("MoveLeft").onclick = function () {
	moveLeft();
}
// Nach Oben bewegen
function moveUp() {
	var newY = currentY - playerStepSize;
	refreshMap(currentX, newY);
}
// Mit Button - Oben
document.getElementById("MoveUp").onclick = function () {
	moveUp();
}
// Nach Unten bewegen
function moveDown() {
	var newY = currentY + playerStepSize;
	refreshMap(currentX, newY);
}
// Mit Button - Unten
document.getElementById("MoveDown").onclick = function () {
	moveDown();
}
// Mit Tastatur
function controlPlayerWithKeyboard(keyEvent) {
  if(keyEvent.keyCode == 39) {
	  moveRight();
  }else if(keyEvent.keyCode == 37) {
	  moveLeft();
  }else if(keyEvent.keyCode == 38) {
	  moveUp();
  }else if(keyEvent.keyCode == 40) {
	  moveDown();
  }else{
	  
  }
}

// Funktionsknopf für Entwicklung, gibt z.b. aktuelle Koordinaten in der Konsole aus
document.getElementById("consoleOutput").onclick = function () {
	console.log("X: " + currentX);
	console.log("Y: " + currentY);
}
