const first = [
    "The Flowery Garden",
    "The Misty Valley",
    "The Silent Forest",
    "The Shimmering Lake",
    "The Enchanted Meadow",
  ];
  
  const second = [
    "of Sloppy Meat",
    "of Eternal Sorrow",
    "of Dancing Flames",
    "of Whispering Winds",
    "of Forgotten Dreams",
  ];
  
  class Room {
    constructor(id, name, exits = []) {
      this.id = id;
      this.name = this.genName();
      this.exits = exits;
      this.complexity = this.genComplexity();
    }

    genName() {
      const firstName = first[Math.floor(Math.random() * first.length)];
      const secondName = second[Math.floor(Math.random() * second.length)];
      return `${firstName} ${secondName}`;
    }

    genComplexity() {
      return Math.floor(Math.random() * 10) + 1; // Complexity between 1 and 10
    }
  }
  
  class World {
    constructor(name, type, numberOfRooms) {
      this.name = name;
      this.type = type;
      this.numberOfRooms = numberOfRooms;
      this.rooms = [];
  
      if (this.type === "circular") {
        this.generateCircularWorld();
      } else if (this.type === "rectangular") {
        this.generateSquareWorld();
      } else {
        console.log("Error - cannot generate world");
      }
    }
  
    generateCircularWorld() {
      for (let i = 0; i < this.numberOfRooms; i++) {
        const room = new Room(i);
        if (i === 0) {
          room.exits.push(i + 1);
          room.exits.push(this.numberOfRooms - 1);
        } else if (i === this.numberOfRooms - 1) {
          room.exits.push(i - 1);
          room.exits.push(0);
        } else {
          room.exits.push(i - 1);
          room.exits.push(i + 1);
        }
        this.addRoom(room);
      }
      this.addShortcuts();
    }

    addShortcuts() {
      for (let i = 0; i < this.numberOfRooms; i++) {
        const room = this.rooms[i];
        const shortcut = (i + Math.floor(Math.random() * (this.numberOfRooms - 2)) + 1) % this.numberOfRooms;
        if (!room.exits.includes(shortcut)) {
          room.exits.push(shortcut);
        }
      }
    }
  
    generateSquareWorld() {
      console.log("Not implemented");
    }
  
    addRoom(room) {
      this.rooms.push(room);

    }
  }
  
  let myWorld = new World("Anglia", "circular", 6);
  
  for (let i = 0; i < myWorld.rooms.length; i++) {
    console.log(
      `Room ${myWorld.rooms[i].id}: ${myWorld.rooms[i].name}, Exits: ${myWorld.rooms[i].exits.join(", ")}`
    );
  }
