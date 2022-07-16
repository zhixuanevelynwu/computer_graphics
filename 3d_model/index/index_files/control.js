/* ------ CONTROL ------ */
function mousePressed() {
  console.log(mouseX, mouseY);

  for (let i = 0; i < allItem.length; i++) {
    if (allItem[i].selected) {
      if (mouseX >= 563 && mouseX <= 688 && mouseY >= 390 && mouseY <= 425) {
        allItem[i].selected = false;
      } else if (
        scene0 &&
        mouseX >= 313 &&
        mouseX <= 436 &&
        mouseY >= 390 &&
        mouseY <= 425
      ) {
        if (allItem[i].canBuild()) {
          craftItem(i);
          allItem[i].selected = false;
        }
      }
    }
  }
}

function keyPressed() {
  console.log(keyCode);
  // CK: whenever you click the space you should jump
  if (keyIsDown(32)) {
    hero.jump();
  }

  // press K to attack or cut through things
  if (keyIsDown(75)) {
    for (let i = 0; i < woods.treeList.length; i++) {
      if (woods.treeList[i].collide()) {
        woods.treeList[i].cut();
        break;
      }
    }
    for (let i = 0; i < slimes.length; i++) {
      if (slimes[i].collide()) {
        slimes[i].hlth -= hero.attack;
      }
    }
  }

  // press enter to move an item
  if (keyIsDown(13)) {
    for (let i = 0; i < itemList.length; i++) {
      if (itemList[i].collide(hero) && itemList[i].pickedUp == false) {
        itemList[i].y -= itemList[i].pickUp;
        itemList[i].pickedUp = true;
        break;
      } else if (itemList[i].pickedUp == true) {
        let p = red(shelter[1].get(itemList[i].x, itemList[i].y));
        if (p == 255 && !hero.jumpMode) {
          itemList[i].y = hero.y + itemList[i].putDown;
          itemList[i].pickedUp = false;
          window.localStorage.setItem("itemList", storeItems());
        }
      }
    }
  }
}
