class Material {
  constructor(name, quantity) {
    this.name = name;
    this.quantity = quantity;
  }
  get() {
    this.quantity += int(random(1, 4));
  }
}

class Wood extends Material {
  constructor(quantity) {
    super("wood", quantity);
  }
}

class Iron extends Material {
  constructor(quantity) {
    super("iron", quantity);
  }
}

class Glass extends Material {
  constructor(quantity) {
    super("glass", quantity);
  }
}

class Fabric extends Material {
  constructor(quantity) {
    super("fabric", quantity);
  }
}

class Plastic extends Material {
  constructor(quantity) {
    super("plastic", quantity);
  }
}
