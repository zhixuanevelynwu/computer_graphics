function draw() {
  if (scene0) {
    displayShelterScene();

    // CK: I used this overlay the shelter hitmap
    // -- this is how I figured out the dimensions were off
    //tint(255,255,255,100);
    //image(shelter[1], 0, 0);
    //noTint();

    displayInfo();
    displayItems();
    displayItemList();
    hero.display(home.hitmap, home.floorY);
    home.exitScene();
  } else if (scene1) {
    woods.display();
    hero.display(forest[0], woods.floorY);
    displayInfo();
    displayItemList();
    displaySlimes();
    woods.exitScene();
  }

  displayMaterialList();
  drawBorder();
}
