function storeItems() {
  let str = "";
  console.log(itemList);
  for (let i = 0; i < itemList.length; i++) {
    str += itemList[i].name + " " + itemList[i].x + " " + itemList[i].y + " ";
  }
  return str;
}

function craftItem(id) {
  switch (id) {
    case 0:
      append(itemList, new Table(hero.x, hero.y - 5));
      materialList[0].quantity -= 3;
      break;
    case 1:
      append(itemList, new Chair(hero.x, hero.y));
      materialList[0].quantity -= 2;
      break;
    case 2:
      append(itemList, new Lamp(hero.x, hero.y));
      materialList[0].quantity -= 2;
      break;
    case 3:
      append(itemList, new Closet(hero.x, hero.y));
      materialList[0].quantity -= 5;
      break;
  }
  // save things
  //storeItems();
  window.localStorage.setItem("itemList", storeItems());
}

function displaySlimes() {
  for (let i = 0; i < slimes.length; i++) {
    if (slimes[i].hlth <= 0) {
      slimes.splice(i, 1);
    } else {
      slimes[i].display();
    }
  }
}

function displayItems() {
  for (let i = 0; i < itemList.length; i++) {
    itemList[i].display(hero);
  }
}

function displayItemList() {
  let offset = 0;
  for (let i = 0; i < allItem.length; i++) {
    allItem[i].avatar(1070 + offset, 90);
    offset += 86;
  }
}

function displayMaterialList() {
  push();
  fill(70);
  let offset = 0;
  for (let i = 0; i < materialList.length; i++) {
    text(
      materialList[i].name + ": " + materialList[i].quantity + "\n",
      1050,
      300 + offset
    );
    offset += 30;
  }
  pop();
}

function displayShelterScene() {
  imageMode(CORNER);
  sky.display();
  theOldTree.display();
  home.display();
}

function displayInfo() {
  if (scene0) {
    if (!home.collide() && !theOldTree.collide()) {
      info.conversation = "...";
    }
    for (let i = 0; i < itemList.length; i++) {
      itemList[i].collide();
    }
  } else if (scene1) {
    info.conversation = "...";

    for (let i = 0; i < woods.treeList.length; i++) {
      if (woods.treeList[i].collide()) {
        break;
      }
    }
  }
  info.display();
}

function preload() {
  shelter = [
    loadImage("assets/images/shelter/building.png"),
    loadImage("assets/images/shelter/shelter_hitmap.png"),
  ];
  forest = [loadImage("assets/images/forest/forest_hitmap.png")];
  mountain = loadImage("assets/images/ground/hill.png");
  tree = [loadImage("assets/images/shelter/tree.png")];
  trees = [
    loadImage("assets/images/forest/tree0.png"),
    loadImage("assets/images/forest/tree1.png"),
    loadImage("assets/images/forest/tree2.png"),
  ];
  ball = [
    loadImage("assets/images/hero/ball_l.png"),
    loadImage("assets/images/hero/ball_r.png"),
  ];
  skySprites = loadImage("assets/images/ground/sky.png");
  items = [
    loadImage("assets/images/items/table.png"),
    loadImage("assets/images/items/chair.png"),
    loadImage("assets/images/items/lamp.png"),
    loadImage("assets/images/items/closet.png"),
  ];
  floor = [loadImage("assets/images/ground/soil.png")];

  // font
  myFont = loadFont("font/ufonts.com_01problematixbold.ttf");

  // monster
  monster = [loadImage("assets/images/slime/slimeani.png")];
}

/* ------ HELPER FUNCTIONS ------ */
function loadSprite(img, spriteWidth, spriteHeight) {
  let offset = 0;
  return [
    img.get(offset, 0, spriteWidth, spriteHeight),
    img.get(spriteWidth + offset, -2, spriteWidth, spriteHeight),
    img.get(2 * spriteWidth + offset, 0, spriteWidth, spriteHeight),
    img.get(3 * spriteWidth + offset, 0, spriteWidth, spriteHeight),
  ];
}

function loadSlime(img, spriteWidth, spriteHeight) {
  let offset = 0;
  return [
    img.get(offset, 0, spriteWidth, spriteHeight),
    img.get(spriteWidth + offset, 0, spriteWidth, spriteHeight),
    img.get(2 * spriteWidth + offset, 0, spriteWidth, spriteHeight),
    img.get(3 * spriteWidth + offset, 0, spriteWidth, spriteHeight),
    img.get(4 * spriteWidth + offset, 0, spriteWidth, spriteHeight),
    img.get(5 * spriteWidth + offset, 0, spriteWidth, spriteHeight),
  ];
}

function drawBorder() {
  push();
  rectMode(CORNER);
  noFill();
  strokeWeight(15);
  stroke(0, 0, 0);
  rect(0, 0, width, height);
  pop();
}
