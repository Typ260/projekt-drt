// Alle Events als Objekte in ein Array schreiben
// TODO: Anbindung an MariaDB und Objekte automatisiert erstellen

// Initialisierung des Arrays in dem die einzelnen Events gespeichert werden
var eventArray = [];

// Event Klasse
class Event {
	constructor(x, y, type, forced, encounterDialogue, encounterDialogue2, player, enemy) {
		this.x = x;
		this.y = y;
		this.type = type;
		this.forced = forced;
		this.encounterDialogue = encounterDialogue;
		this.encounterDialogue2 = encounterDialogue2;
		this.player = player;
		this.enemy = enemy;
	}
	
	listEventDetails() {
		console.log("Event X Coordinate: " + this.x);
		console.log("Event Y Coordinate: " + this.y);
		console.log("Event Type: " + this.type);
	}
}


// Test Events hinzufügen
randomDialogueEvent = new Event(190, 470, "Dialog", false, "Fischerdorf Dremor", "Dremor wird betreten", player);
randomFightEvent = new Event(180, 470, "Fight", true, "Ein Kampf Event", "", player2, testEnemy);
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
		draw_bubble1(eventObj.encounterDialogue, "Klicken zum fortfahren");
	}else{
		// Fortfahren als hätte der Spieler geklickt
		draw_bubble1(eventObj.encounterDialogue, "wird geladen...");
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
			draw_bubble1(eventObj.encounterDialogue2, "");
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
			document.getElementById("event-container").innerHTML = "Spieler HP = " + eventObj.player.hp + " - Gegner HP = " + eventObj.enemy.hp;
			document.getElementById("event-controls-fight").style.display ="block";
			document.getElementById("slot1").innerHTML = eventObj.player.slot1[0];
			document.getElementById("slot1").onclick = function () { eventObj.player.attackEnemy(testEnemy, 1); }
			document.getElementById("slot2").innerHTML = eventObj.player.slot2[0];
			document.getElementById("slot2").onclick = function () { eventObj.player.attackEnemy(testEnemy, 2); }
			document.getElementById("slot3").innerHTML = eventObj.player.slot3[0];
			document.getElementById("slot3").onclick = function () { eventObj.player.attackEnemy(testEnemy, 3); }
		// Unbekannter Event Typ
		} else {
			document.getElementById("event-container").innerHTML = "Fehlerhaftes Event";
		}
	}
}
