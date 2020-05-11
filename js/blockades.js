// Blockaden auf der Map in Array eintragen
// Wird von Funktion testForBlockade genutzt
// Referenz Bild -> ./img/map_label.png

// Array initialisieren
var block = [];

// Vertikale und Horizontale Funktionen

// Unterer Kartenrand
for (var i = 0; i <= 600; i+= 10) { var x = [i, 600]; block.push(x); }
// Oberer Kartenrand
for (var i = 0; i <= 600; i+= 10) { var x = [i, -10]; block.push(x); }
// Rechter Kartenrand
for (var i = 0; i <= 600; i+= 10) { var x = [600, i]; block.push(x); }
// Linker Kartenrand
for (var i = 0; i <= 600; i+= 10) { var x = [-10, i]; block.push(x); }
// Fluss A
for (var i = 520; i <= 590; i+= 10) { var x = [220, i]; block.push(x); }	
// Fluss B
for (var i = 100; i <= 210; i+= 10) { var x = [i, 520]; block.push(x); }
// Fluss C
for (var i = 470; i <= 510; i+= 10) { var x = [100, i]; block.push(x); }
// Fluss D
for (var i = 400; i <= 450; i+= 10) { var x = [100, i]; block.push(x); }
// Fluss E
for (var i = 110; i <= 130; i+= 10) { var x = [i, 400]; block.push(x); }
// Fluss F
for (var i = 380; i <= 390; i+= 10) { var x = [130, i]; block.push(x); }
// Fluss G
for (var i = 0; i <= 60; i+= 10) { var x = [i, 370]; block.push(x); }
// Fluss H
for (var i = 80; i <= 220; i+= 10) { var x = [i, 370]; block.push(x); }
// Fluss I
for (var i = 340; i <= 360; i+= 10) { var x = [220, i]; block.push(x); }
// Fluss J
for (var i = 230; i <= 340; i+= 10) { var x = [i, 340]; block.push(x); }
// Fluss K
for (var i = 320; i <= 330; i+= 10) { var x = [340, i]; block.push(x); }
// Fluss L
for (var i = 280; i <= 300; i+= 10) { var x = [340, i]; block.push(x); }
// Fluss M
for (var i = 350; i <= 400; i+= 10) { var x = [i, 280]; block.push(x); }
// Fluss N
for (var i = 200; i <= 270; i+= 10) { var x = [400, i]; block.push(x); }
// Fluss O
for (var i = 100; i <= 180; i+= 10) { var x = [400, i]; block.push(x); }
// Fluss P
for (var i = 370; i <= 390; i+= 10) { var x = [i, 100]; block.push(x); }
// Fluss Q
for (var i = 70; i <= 90; i+= 10) { var x = [370, i]; block.push(x); }
// Fluss R
for (var i = 380; i <= 490; i+= 10) { var x = [i, 70]; block.push(x); }	
// Fluss S
for (var i = 0; i <= 60; i+= 10) { var x = [490, i]; block.push(x); }	

// Diagonale Funktionen

// Berg Alpha
var tempx = 110;
var tempy = 600;
for (var i = 11; i > 0; i -= 1) {
	tempx = tempx - 10;
	tempy = tempy - 10;
	var x = [tempx, tempy]; block.push(x);
}

// Nicht berechenbare oder einzelne Koordinaten

// HIER DATEN EINFÜGEN