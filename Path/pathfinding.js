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
      return Math.floor(Math.random() * 10) + 1;
    }
  }
  
  class World {
    constructor(name, type, numberOfRooms) {
      this.name = name;
      this.type = type;
      this.numberOfRooms = numberOfRooms;
      this.rooms = [];
      this.positions = [];
  
      if (this.type === "circular") {
        this.generateCircularWorld();
      } else if (this.type === "rectangle") {
        const sideLength = this.numberOfRooms;
        if (Number.isInteger(sideLength)) {
          this.generateSquareWorld(sideLength);
        } else {
          console.log("Number of rooms must be a perfect square");
        }
      } else {
        console.log("Cannot generate world");
      }
      this.generateHTML();
    } 
    
    generateCircularWorld() {
      for (let i = 0; i < this.numberOfRooms; i++) {
        const room = new Room(i);
        room.exits.push((i + 1) % this.numberOfRooms); // next room
        room.exits.push((i - 1 + this.numberOfRooms) % this.numberOfRooms); // previous room
        this.addRoom(room);
      }
    }

    generateSquareWorld(sideLength) {
      const rows = Math.floor(Math.sqrt(this.numberOfRooms));
      const cols = Math.ceil(this.numberOfRooms / rows);
      for (let i = 0; i < this.numberOfRooms; i++) {
        const room = new Room(i);
        const row = Math.floor(i / cols);
        const col = i % cols;

        // Add exits for rooms in the grid
        if (col > 0) room.exits.push(i - 1); // left
        if (col < cols - 1) room.exits.push(i + 1); // right
        if (row > 0) room.exits.push(i - cols); // top
        if (row < rows - 1) room.exits.push(i + cols); // bottom

        this.addRoom(room);
      }
    } 
    
    //chat gpt gjorde denna
    generateHTML() {
      const worldContainer = document.getElementById('world');
      worldContainer.innerHTML = ''; // Clear previous content
  
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      worldContainer.appendChild(svg);
  
      this.positions = [];
      const size = Math.min(worldContainer.clientWidth, worldContainer.clientHeight);
      const roomSize = Math.max(10, size / Math.sqrt(this.numberOfRooms)) / 2;
  
      if (this.type === "circular") {
        const radius = size / 2 - roomSize * 2;
        this.rooms.forEach((room, index) => {
          const angle = (index / this.numberOfRooms) * 2 * Math.PI;
          const x = size / 2 + radius * Math.cos(angle);
          const y = size / 2 + radius * Math.sin(angle);
          this.positions.push({ x, y });
  
          const roomCircle = document.createElementNS(svgNS, "circle");
          roomCircle.setAttribute("cx", x);
          roomCircle.setAttribute("cy", y);
          roomCircle.setAttribute("r", roomSize);
          roomCircle.setAttribute("class", "room");
          roomCircle.setAttribute("data-room-id", room.id); // Add data attribute for room id
          svg.appendChild(roomCircle);
  
          const roomText = document.createElementNS(svgNS, "text");
          roomText.setAttribute("x", x);
          roomText.setAttribute("y", y);
          roomText.setAttribute("dy", ".3em");
          roomText.setAttribute("text-anchor", "middle");
          roomText.textContent = room.id;
          svg.appendChild(roomText);
        });
      } else if (this.type === "rectangle") {
        const rows = Math.floor(Math.sqrt(this.numberOfRooms));
        const cols = Math.ceil(this.numberOfRooms / rows);
        const padding = roomSize;
        const roomWidth = (size - padding * 2) / cols;
        const roomHeight = (size - padding * 2) / rows;
  
        this.rooms.forEach((room, index) => {
          const row = Math.floor(index / cols);
          const col = index % cols;
          const x = col * roomWidth + roomWidth / 2 + padding;
          const y = row * roomHeight + roomHeight / 2 + padding;
          this.positions.push({ x, y });
  
          const roomRect = document.createElementNS(svgNS, "rect");
          roomRect.setAttribute("x", x - roomWidth / 2);
          roomRect.setAttribute("y", y - roomHeight / 2);
          roomRect.setAttribute("width", roomWidth);
          roomRect.setAttribute("height", roomHeight);
          roomRect.setAttribute("class", "room");
          roomRect.setAttribute("data-room-id", room.id); // Add data attribute for room id
          svg.appendChild(roomRect);
  
          const roomText = document.createElementNS(svgNS, "text");
          roomText.setAttribute("x", x);
          roomText.setAttribute("y", y);
          roomText.setAttribute("dy", ".3em");
          roomText.setAttribute("text-anchor", "middle");
          roomText.textContent = room.id;
          svg.appendChild(roomText);
        });
      }
  
      this.rooms.forEach((room, index) => {
        room.exits.forEach(exit => {
          const startX = this.positions[index].x;
          const startY = this.positions[index].y;
          const endX = this.positions[exit].x;
          const endY = this.positions[exit].y;
  
          const dx = endX - startX;
          const dy = endY - startY;
          const length = Math.sqrt(dx * dx + dy * dy);
          const offsetX = (dx / length) * roomSize;
          const offsetY = (dy / length) * roomSize;
  
          const line = document.createElementNS(svgNS, "line");
          line.setAttribute("x1", startX + offsetX);
          line.setAttribute("y1", startY + offsetY);
          line.setAttribute("x2", endX - offsetX);
          line.setAttribute("y2", endY - offsetY);
          line.setAttribute("class", "link");
          svg.appendChild(line);
        });
      });
    }
  
    addRoom(room) {
      this.rooms.push(room);
    }

    PathFinding(startRoomId, targetRoomId) {
      const queue = [[startRoomId]];
      const visited = new Set();
  
      while (queue.length > 0) {
        const path = queue.shift();
        const roomId = path[path.length - 1];
  
        if (roomId === targetRoomId) {
          return path;
        }
  
        if (!visited.has(roomId)) {
          visited.add(roomId);
          const room = this.rooms[roomId];
          room.exits.forEach(exit => {
            if (!visited.has(exit)) {
              const newPath = path.slice();
              newPath.push(exit);
              queue.push(newPath);
            }
          });
        }
      }
      return null;
    }
  }
  
  let myWorld = new World("Anglia", "rectangle", 63);
  myWorld.generateHTML();
  
  const path = myWorld.PathFinding(0, 62);
  const pathDisplay = document.getElementById('path-display');
  pathDisplay.textContent = `Shortest path: ${path ? path.join(" -> ") : "No path found"}`;
