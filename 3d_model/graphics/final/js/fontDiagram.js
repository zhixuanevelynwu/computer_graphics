window.fontDiagram = () => {
  diagram.fillRect([0, 0], [canvasW, canvasH], "black");
  let diagramX = canvasW * 0.25;
  let diagramY = canvasH * 0.2;
  // console.log(letter_choice.value);
  switch (letter_choice.value) {
    case "a":
      ADiagram(diagramX, diagramY);
      break;
    case "b":
      BDiagram(diagramX, diagramY);
      break;
    case "c":
      CDiagram(diagramX, diagramY);
      break;
    case "d":
      DDiagram(diagramX, diagramY);
      break;
    case "e":
      EDiagram(diagramX, diagramY);
      break;
    case "f":
      FDiagram(diagramX, diagramY);
      break;
    case "g":
      GDiagram(diagramX, diagramY);
      break;
    case "h":
      HDiagram(diagramX, diagramY);
      break;
    case "i":
      IDiagram(diagramX, diagramY);
      break;
    case "j":
      JDiagram(diagramX, diagramY);
      break;
    case "k":
      KDiagram(diagramX, diagramY);
      break;
    case "l":
      LDiagram(diagramX, diagramY);
      break;
    case "m":
      MDiagram(diagramX, diagramY);
      break;
    case "n":
      NDiagram(diagramX, diagramY);
      break;
    case "o":
      ODiagram(diagramX, diagramY);
      break;
    case "p":
      PDiagram(diagramX, diagramY);
      break;
    case "q":
      QDiagram(diagramX, diagramY);
      break;
    case "r":
      RDiagram(diagramX, diagramY);
      break;
    case "s":
      SDiagram(diagramX, diagramY);
      break;
    case "t":
      TDiagram(diagramX, diagramY);
      break;
    case "u":
      UDiagram(diagramX, diagramY);
      break;
    case "v":
      VDiagram(diagramX, diagramY);
      break;
    case "w":
      WDiagram(diagramX, diagramY);
      break;
    case "x":
      XDiagram(diagramX, diagramY);
      break;
    case "y":
      YDiagram(diagramX, diagramY);
      break;
    case "z":
      ZDiagram(diagramX, diagramY);
      break;
  }
};
