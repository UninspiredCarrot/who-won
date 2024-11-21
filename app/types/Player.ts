export class Player {
    id: number;
    name: string;
  
    constructor(id: number = 0, name: string = "") {
      this.id = id;
      this.name = name;
    }
  
    // Convert to plain object for serialization
    toPlainObject() {
      return { id: this.id, name: this.name };
    }
  
    // Recreate from plain object
    static fromPlainObject(obj: { id: number, name: string }) {
      return new Player(obj.id, obj.name);
    }
  }
  