// Modul für das Anzeigen von Elementen auf dem Canvas

// Klasse für Animationen auf dem cEventsAni Canvas (liegt über dem normalen Event Canvas)
class animation {
	constructor(aniSource, x, y) {
		// Array mit Image Objekten
		this.aniSource = aniSource;
		// X und Y Koordinate
		this.posx = x;
		this.posy = y;
		// Initialisierung für Methoden
		this.currentFrame = 0;
		this.aniID = null;
	}
	
	// Animation starten
	animate(x) {
		// Startet die draw Methode im Interval - TODO: Interval flexibel gestalten
		if (x == true) {
			this.aniID = setInterval(this.draw, 200, this.aniSource, this.posx, this.posy);
		// Stoppt die Animation und entfernt letzten Frame
		} else if (x == false) {
			clearInterval(this.aniID);
			this.aniID = null;
			cEventsAni.clearRect(this.posx, this.posy, this.aniSource[this.currentFrame].width, this.aniSource[this.currentFrame].height);
		}
	}
	
	// Einzelnes Bild darstellen
	draw(arrayOfPictures, x, y) {
		// Array mit Bildern übergeben - FIXME: Warum erkennt diese Methode "this.aniSource" nicht?
		var aOP = arrayOfPictures;
		// Nächsten logischen Frame anhand der maximalen Anzahl der Bilder
		// und des zuletzt gezeigten Frames wählen
		if (this.currentFrame < (aOP.length - 1)) {
			this.currentFrame += 1;
		// Animation neustarten wenn das letzte Bild erreicht wurde
		}else{
			this.currentFrame = 0;
		}
		// Letzten Frame löschen bevor der neue Frame gezeigt wird
		cEventsAni.clearRect(x, y, aOP[this.currentFrame].width, aOP[this.currentFrame].height);
		// Aktuellen Frame zeigen
		cEventsAni.drawImage(aOP[this.currentFrame], x, y);
	}
}
	
// DEMO ARRAY FÜR ANIMATION KLASSE
var warriorMaleIdle = new Array();
	warriorMaleIdle[0] = new Image; warriorMaleIdle[0].src = "./img/warrior_male/idle_0.png";
	warriorMaleIdle[1] = new Image; warriorMaleIdle[1].src = "./img/warrior_male/idle_1.png";
	warriorMaleIdle[2] = new Image; warriorMaleIdle[2].src = "./img/warrior_male/idle_2.png";
	warriorMaleIdle[3] = new Image; warriorMaleIdle[3].src = "./img/warrior_male/idle_3.png";
	warriorMaleIdle[4] = new Image; warriorMaleIdle[4].src = "./img/warrior_male/idle_4.png";
	warriorMaleIdle[5] = new Image; warriorMaleIdle[5].src = "./img/warrior_male/idle_5.png";
	warriorMaleIdle[6] = new Image; warriorMaleIdle[6].src = "./img/warrior_male/idle_6.png";
	warriorMaleIdle[7] = new Image; warriorMaleIdle[7].src = "./img/warrior_male/idle_7.png";
	warriorMaleIdle[8] = new Image; warriorMaleIdle[8].src = "./img/warrior_male/idle_8.png";
	warriorMaleIdle[9] = new Image; warriorMaleIdle[9].src = "./img/warrior_male/idle_9.png";

// DEMO OBJEKT FÜR ANIMATION KLASSE
animationTest = new animation(warriorMaleIdle, 40, 85);


/*
Resourcen und Funktionen für Elemente der
normalen Karten Canvas (canvas/c)
*/

// Sprechblase 1
var bubble1 = new Image;
bubble1.src = "./img/blase1.png";

// Sprechblase 2
var bubble2 = new Image;
bubble2.src = "./img/blase2.png";

// Normale Sprechblase auf der Map über dem Spieler
function draw_bubble1(line1, line2) {
	// Position der Blase an die Position des Spielers anpassen
	bubbleX = currentX - 97;
	bubbleY = currentY - 70;
	// Blase auf Position zeichnen
	c.drawImage(bubble1, bubbleX, bubbleY);
	// Blase mit Text füllen 
	c.fillText(line1,bubbleX + 20 ,bubbleY + 20);
	c.fillText(line2,bubbleX + 20 ,bubbleY + 37);
}

// Status "Blase" für Fight-Events
function draw_bubble2(line1, line2) {
	cEvents.drawImage(bubble2, 150, 240);
	cEvents.fillText(line1, 162, 264);
	cEvents.fillText(line2, 162, 288);
}

// TODO: Status "Blase" für Dialog Events
