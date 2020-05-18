// Entities wie z.b. Spieler oder Gegner


// Standart Entity Klasse für NPC
class EntityNPC {
	constructor(type, name, hp, strength, dexterity, intelligence, charisma) {
		// Typen = Gegner -> Enemy, Dialogpartner -> Friendly
		this.type = type;
		// Name
		this.name = name;
		// Health Points
		this.hp = hp;
		// Generic D&D-like attributes
		this.strength = strength;
		this.dexterity = dexterity;
		this.intelligence = intelligence;
		this.charisma = charisma;
		// Status (lebt/tot)
		this.alive = true;
		// Skillset
		this.attackName = "generic Attack";
		this.attackValue = 5;
	}
	
	// Aktualisiert rechte Statusleiste mit aktuellen NPC Daten
	updateStatusbarNPC() {
		document.getElementById("statusbarNPCName").innerHTML = this.name;
		if (this.type == "Enemy") {
			document.getElementById("statusbarNPCType").style = "color:red";
			document.getElementById("statusbarNPCType").innerHTML = "Feindlich";
		}else{
			document.getElementById("statusbarNPCType").style = "color:green";
			document.getElementById("statusbarNPCType").innerHTML = "Freundlich";
		}
		document.getElementById("statusbarNPCHP").innerHTML = this.hp;
	}
}

// Standart Entity Klasse für Spieler
class EntityPlayer {
	constructor(name, type, hp, strength, endurance, dexterity, intelligence, charisma) {
		// Spielername
		this.name = name;
		// Typen = Warrior, Mage, Rogue
		this.type = type;
		// Health Points
		this.hp = hp;
		// Generische D&D Attribute
		// Max 20 pro Attribut
		this.strength = strength;
		this.endurance = endurance;
		this.dexterity = dexterity;
		this.intelligence = intelligence;
		this.charisma = charisma;
		// Status (lebt/tot)
		this.alive = true;
		// Aktionspunkte
		this.ap = undefined;
		// Skillset generieren
		this.generateSkillset();
	}
	
	generateSkillset() {
		// Skillset für Krieger generieren
		if (this.type == "Warrior") {
			// Slot 1 bestimmen
			if (this.strength < 7) {
				this.slot1 = erbitterterSchlag;
			} else if (this.strength >= 7 && this.strength <= 14) {
				this.slot1 = axtHieb;
			} else {
				this.slot1 = doppelschlag;
			}
			// Slot 2 bestimmen
			if (this.dexterity < 7) {
				this.slot2 = bogenschuss;
			} else if (this.dexterity >= 7 && this.dexterity <= 14) {
				this.slot2 = faecherschuss;
			} else {
				this.slot2 = explosionsschuss;
			}
			// Slot 3 bestimmen
			if (this.intelligence < 7) {
				this.slot3 = speerstich;
			} else if (this.intelligence >= 7 && this.intelligence <= 14) {
				this.slot3 = speerwurf;
			} else {
				this.slot3 = sturmangriff;
			}
		// Skillset für Magier generieren
		} else if (this.type == "Mage") {
			if (this.strength < 7) {
				this.slot1 = stabSchlag;
			} else if (this.strength >= 7 && this.strength <= 14) {
				this.slot1 = stabStoss;
			} else {
				this.slot1 = stabWirbel;
			}
			// Slot 2 bestimmen
			if (this.dexterity < 7) {
				this.slot2 = feuerball;
			} else if (this.dexterity >= 7 && this.dexterity <= 14) {
				this.slot2 = blitzschlag;
			} else {
				this.slot2 = flammenwelle;
			}
			// Slot 3 bestimmen
			if (this.intelligence < 7) {
				this.slot3 = illusion;
			} else if (this.intelligence >= 7 && this.intelligence <= 14) {
				this.slot3 = dornenranken;
			} else {
				this.slot3 = teleport;
			}
		// Skillset für Schurke generiere
		} else if (this.type == "Rogue") {
			if (this.strength < 7) {
				this.slot1 = dolchstich;
			} else if (this.strength >= 7 && this.strength <= 14) {
				this.slot1 = dolchwurf;
			} else {
				this.slot1 = dolchfaecher;
			}
			// Slot 2 bestimmen
			if (this.dexterity < 7) {
				this.slot2 = armbrustschuss;
			} else if (this.dexterity >= 7 && this.dexterity <= 14) {
				this.slot2 = wurfmesser;
			} else {
				this.slot2 = giftpfeil;
			}
			// Slot 3 bestimmen
			if (this.intelligence < 7) {
				this.slot3 = schattenangriff;
			} else if (this.intelligence >= 7 && this.intelligence <= 14) {
				this.slot3 = sprungstoß;
			} else {
				this.slot3 = rauchbombe;
			}
		}
		// Slot 4 Klassenübergreifend füllen
		if (this.charisma < 7) {
			this.slot4 = kleinerHeiltrank;
		} else if (this.charisma >= 7 && this.charisma <= 14) {
			this.slot4 = grosserHeiltrank;
		} else {
			this.slot4 = magischeSalbe;
		}
		// Aktionspunkte berechnen
		if (this.endurance < 7) {
			this.ap = 75;
		} else if (this.endurance >= 7 && this.endurance <= 14) {
			this.ap = 100;
		} else {
			this.ap = 125;
		}
	
	}
	
	// Aktualisiert linke Statusleiste mit aktuellen Spielerdaten
	updateStatusbar() {
		document.getElementById("statusbarPlayerName").innerHTML = this.name;
		if (this.type == "Warrior") {
			document.getElementById("statusbarPlayerClass").innerHTML = "Krieger";
		} else if (this.type == "Rogue") {
			document.getElementById("statusbarPlayerClass").innerHTML = "Schurke";
		} else {
			document.getElementById("statusbarPlayerClass").innerHTML = "Magier";
		}
		document.getElementById("statusbarPlayerHP").innerHTML = this.hp;
		document.getElementById("statusbarPlayerAP").innerHTML = this.ap;
	}
	
	attackEnemy (enemy, slot) {
		// Variable für Spieler Angriffswert
		var playerAttack;
		// Name des Angriffs zwischenspeichern
		var playerAttackName;
		// Gegnerangriff berechnen
		var enemyAttackValue = getRnd(enemy.attackValue/2, enemy.attackValue*2);
		// Controlpanel abschalten
		disableAtkCtl(true);
		// Welcher Angriff wurde ausgewählt
		switch (slot) {
			case 1:
				// Spielerangriffswert ist ein zufälliger Wert
				// zwischen der Hälfte und dem vollen Wert des Skills
				playerAttack = getRnd(this.slot1[1]/2, this.slot1[1]);
				// Gegner HP reduzieren - TODO: Verfehlchance?
				enemy.hp = enemy.hp - playerAttack;
				// Gegner greift den Spieler an
				this.hp = this.hp - enemyAttackValue;
				// Name des Angriffs in playerAttackName speichern
				playerAttackName = this.slot1[0];
				// Aktionspunkte abziehen
				this.ap = this.ap - this.slot1[2];
				break;
			case 2:
				playerAttack = getRnd(this.slot2[1]/2, this.slot2[1]);
				enemy.hp = enemy.hp - playerAttack;
				this.hp = this.hp - enemyAttackValue;
				playerAttackName = this.slot2[0];
				this.ap = this.ap - this.slot2[2];
				break;
			case 3:
				playerAttack = getRnd(this.slot3[1]/2, this.slot3[1]);
				enemy.hp = enemy.hp - playerAttack;
				this.hp = this.hp - enemyAttackValue;
				playerAttackName = this.slot3[0];
				this.ap = this.ap - this.slot3[2];
				break;
			case 4:
				// Spielerangriffswert ist im Fall der Selbstheilung null
				playerAttack = 0;
				// Spieler heilt eigene HP
				this.hp = this.hp + this.slot4[1];
				// Gegner greift den Spieler an
				this.hp = this.hp - enemyAttackValue;
				playerAttackName = this.slot4[0];
				this.ap = this.ap - this.slot4[2];
				break;
		}
		
		// TODO: Animation Spielerangriff
		// Ereignissprotokoll des Spielerangriffs auf das Canvas zeichnen
		setTimeout(() => { draw_bubble2(this.name + " setzt " + playerAttackName + " ein.", this.name + " verursacht " + playerAttack + " Schaden"); }, 500);
		// TODO: Animation Gegnerangriff
		setTimeout(() => {
			// Ereignissprotokoll des Gegnerangriffs auf das Canvas zeichnen - TODO: Delay an Angriffsanimation anpassen
			draw_bubble2(enemy.name + " setzt " + enemy.attackName + " ein.", enemy.name + " verursacht " + enemyAttackValue + " Schaden");
			// Steuerungsbuttons selektiv reaktivieren
			if (this.ap >= this.slot1[2]) {disableAtkCtl("oneOn");}
			if (this.ap >= this.slot2[2]) {disableAtkCtl("twoOn");}
			if (this.ap >= this.slot3[2]) {disableAtkCtl("threeOn");}
			if (this.ap >= this.slot4[2]) {disableAtkCtl("fourOn");}
			
		}, 2000);
		// Sowohl Gegner als auch Spieler leben noch
		if (enemy.hp > 0 && this.hp > 0) {
			// Statusleisten aktualisieren
			this.updateStatusbar();
			enemy.updateStatusbarNPC();
		// Spieler lebt, Gegner gestorben
		} else if (enemy.hp <= 0 && this.hp > 0) {
			// Statusleisten aktualisieren
			this.updateStatusbar();
			enemy.updateStatusbarNPC();
			// Gegner Status auf tot setzen
			enemy.alive = false;
			// Meldung über erfolgreichen Kampf
			setTimeout(() => { draw_bubble2(this.name + " besiegt " + enemy.name + ".", " "); disableAtkCtl(true);}, 2001);
		// Spieler stirbt
		} else if ( this.hp <= 0 ) {
			// Statusleisten aktualisieren
			this.updateStatusbar();
			enemy.updateStatusbarNPC();
			// Spielerstatus auf tot setzen
			this.alive = false;
			// Meldung übder tot
			setTimeout(() => { draw_bubble2(this.name + " wurde von " + enemy.name + " besiegt.", " "); disableAtkCtl(true); }, 2001);
		} else {
			document.getElementById("event-container").innerHTML = "FEHLER";
		}
	}	
}


// Test Gegner - TODO : Gegner zufällig "zusammenbauen"
testEnemy = new EntityNPC("Enemy", "Böser Oger", 100, 10, 10, 10, 10);

// Test Spieler - TODO : PHP Landing Page mit POST-FORM für Spielerdaten und/oder Vollwertiges Login mit SQL
player = new EntityPlayer("David", "Warrior", 100, 6, 10, 10, 20, 10);
player2 = new EntityPlayer("Jessy", "Rogue", 100, 10, 10, 10, 20, 10);





