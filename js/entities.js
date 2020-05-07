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
		this.attackValue = 20;
	}
	
	listEntityDetails() {
		console.log("Entity Type: " + this.type);
		console.log("Entity Health Points: " + this.hp);
		console.log("Entity Strength: " + this.strength);
		console.log("Entity Dexterity: " + this.dexterity);
		console.log("Entity Intelligence: " + this.intelligence);
		console.log("Entity Charisma: " + this.charisma);
	}
}

// Standart Entity Klasse für Spieler
class EntityPlayer {
	constructor(name, type, hp, strength, dexterity, intelligence, charisma) {
		// Spielername
		this.name = name;
		// Typen = Warrior, Mage, Rogue
		this.type = type;
		// Health Points
		this.hp = hp;
		// Generische D&D Attribute
		// Max 20 pro Attribut
		this.strength = strength;
		this.dexterity = dexterity;
		this.intelligence = intelligence;
		this.charisma = charisma;
		// Status (lebt/tot)
		this.alive = true;
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
	
	}
	
	listEntityDetails() {
		console.log("Player Type: " + this.type);
		console.log("Player Health Points: " + this.hp);
		console.log("Player Strength: " + this.strength);
		console.log("Player Dexterity: " + this.dexterity);
		console.log("Player Intelligence: " + this.intelligence);
		console.log("Player Charisma: " + this.charisma);
	}
	
	attackEnemy (enemy, slot) {
		// Test Angriff
		switch (slot) {
			case 1:
				enemy.hp = enemy.hp - this.slot1[1];
				this.hp = this.hp - enemy.attackValue;
				break;
			case 2:
				enemy.hp = enemy.hp - this.slot2[1];
				this.hp = this.hp - enemy.attackValue;
				break;
			case 3:
				enemy.hp = enemy.hp - this.slot3[1];
				this.hp = this.hp - enemy.attackValue;
				break;
		}
		// Sowohl Gegner als auch Spieler leben noch
		if (enemy.hp > 0 && this.hp > 0) {
			// Aktuelle Healthpoints anzeigen
			document.getElementById("event-container").innerHTML = "Spieler HP = " + this.hp + " - Gegner HP = " + enemy.hp;
		// Spieler lebt, Gegner gestorben
		} else if (enemy.hp <= 0 && this.hp > 0) {
			// Gegner Status auf tot setzen
			enemy.alive = false;
			// Meldung über erfolgreichen Kampf
			document.getElementById("event-container").innerHTML = this.name + " besiegt Gegner " + enemy.name;
		// Spieler stirbt
		} else if ( this.hp <= 0 ) {
			this.alive = false;
			document.getElementById("event-container").innerHTML = this.name + " wurde von " + enemy.name + " besiegt!";
		} else {
			document.getElementById("event-container").innerHTML = "FEHLER";
		}
	}	
}


// Test Gegner
testEnemy = new EntityNPC("Enemy", "Böser Oger", 100, 10, 10, 10, 10);

// Test Spieler
player = new EntityPlayer("David", "Warrior", 100, 6, 10, 20, 10);
player2 = new EntityPlayer("Jessy", "Rogue", 100, 10, 10, 20, 10);
