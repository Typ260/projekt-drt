// Sprechblase 1
var bubble1 = new Image;
bubble1.src = "./img/blase1.png";

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
