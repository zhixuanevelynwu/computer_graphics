function setup() {
  textFont(myFont);

  // canvas
  let canvas = createCanvas(1400, 700);
  canvas.id("my-canvas");
  canvas.parent("#container");

  // draw items window
  info = new Info();
  allItem = [
    new Table(746, 650),
    new Chair(798, 655),
    new Lamp(840, 625),
    new Closet(750, 625),
  ];

  // background
  sky = new Sky(0, 0);
  home = new Shelter(sceneWidth - shelter[0].width, height - shelter[0].height);
  theOldTree = new TheOldTree(0, height - tree[0].height);
  woods = new Forest();
  hill = new Hill(0, 400);

  // player character
  hero = new Hero("hero1", sceneWidth / 3, 250);

  // give player items
  materialList = [
    new Wood(0),
    new Iron(0),
    new Glass(0),
    new Fabric(0),
    new Plastic(0),
  ];

  // monster
  let nSlime = random(2, 3);
  slimes = [];
  for (let i = 0; i < nSlime; i++) {
    append(slimes, new Slime());
  }

  // save things
  let strList = window.localStorage.getItem("itemList");
  if (strList != null) {
    let savedList = split(trim(strList), " ");
    console.log(savedList);
    for (let i = 0; i < savedList.length - 2; i += 3) {
      console.log(savedList);
      switch (savedList[i]) {
        case "table":
          append(
            itemList,
            new Table(float(savedList[i + 1]), float(savedList[i + 2]))
          );
          break;

        case "lamp":
          append(
            itemList,
            new Lamp(float(savedList[i + 1], float(savedList[i + 2])))
          );
          console.log("LampAdded: " + itemList);
          break;

        case "closet":
          append(
            itemList,
            new Closet(float(savedList[i + 1]), float(savedList[i + 2]))
          );
          break;

        case "chair":
          append(
            itemList,
            new Chair(float(savedList[i + 1]), float(savedList[i + 2]))
          );
          break;
      }
    }
  } else {
    itemList = [new Lamp(840, 628)];
  }
}
