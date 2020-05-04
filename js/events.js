// Alle Events als Objekte in ein Array schreiben
// TODO: Anbindung an MariaDB und Objekte automatisiert erstellen

// Initialisierung des Arrays in dem die einzelnen Events gespeichert werden
var eventArray = [];

// Event Klasse
class Event {
	constructor(x, y, type, forced, encounterDialogue) {
		this.x = x;
		this.y = y;
		this.type = type;
		this.forced = forced;
		this.encounterDialogue = encounterDialogue;
	}
	
	listEventDetails() {
		console.log("Event X Coordinate: " + this.x);
		console.log("Event Y Coordinate: " + this.y);
		console.log("Event Type: " + this.type);
	}
}


// Test Events hinzufügen
randomDialogueEvent = new Event(190, 470, "Dialog", false, "Ein Dialog Event");
randomFightEvent = new Event(180, 470, "Fight", true, "Ein Kampf Event");
eventArray.push(randomDialogueEvent);
eventArray.push(randomFightEvent);




// Wertet übergebene Events aus
// TODO: Eventtypen bestimmen, Zufälliges auftreten herbeiführen
function handleEvent (eventObj) {
	// Überprüfen ob das Event erzwungen wird
	if ( eventObj.forced == false ) {
		// Überprüfe auf Mausklicks innerhalb des Spielfensters
		canvas.addEventListener('click', handleClick);
		// Sprechblase mit Text anzeigen
		draw_bubble1(eventObj.encounterDialogue, eventObj.type);
	}else{
		// Fortfahren als hätte der Spieler geklickt
		draw_bubble1(eventObj.encounterDialogue, eventObj.type);
		// Kontrollpanel ausblenden
		document.getElementById("controls").style.display = "none";
		// Tastatureingabe ausschalten
		document.removeEventListener('keydown', controlPlayerWithKeyboard);
		// Event Zeitverzögert ausführen
		setTimeout(() => {  executeEvent(); }, 2000);
	}
	// Funktion um auf Mausklick zu reagieren
	function handleClick () {
		// Aktuelle Position abgleichen mit stattfindendem Event
		if ( eventObj.x == currentX && eventObj.y == currentY ) {
			// Map neu laden um vorherige Blase zu löschen
			refreshMapB(currentX, currentY);
			// Neue Sprechblase anzeigen
			// TODO: Event Array um Inhalt für diese Blase zu erweitern
			draw_bubble1("Blablabla", "TODO!!!");
			// Kontrollpanel ausblenden
			document.getElementById("controls").style.display = "none";
			// Tastatureingabe ausschalten
			document.removeEventListener('keydown', controlPlayerWithKeyboard);
			// Event Zeitverzögert ausführen
			setTimeout(() => {  executeEvent(); }, 2000);
		}else{
			// Falls der Spieler den Eventbereich verlässt
			// wird der EventListener gestoppt
			canvas.removeEventListener('click', handleClick);
		}
	}
	// Event ausführen
	function executeEvent() {
		// Map ausblenden
		canvas.style.display = "none";
		// Event Canvas einblenden
		canvasEvents.style.display = "block";
		// Hintergrund laden - TODO: Hintergrund passend auswählen
		cEvents.drawImage(EventGrass, 0, 0);
		// Event auf Typ prüfen
		// Dialog Event
		if (eventObj.type == "Dialog") {
			document.getElementById("event-container").innerHTML = "Dialog Event";
		// Fight Event
		} else if (eventObj.type == "Fight") {
			document.getElementById("event-container").innerHTML = "Fight Event";
		// Unbekannter Event Typ
		} else {
			document.getElementById("event-container").innerHTML = "Fehlerhaftes Event";
		}
	}
}



