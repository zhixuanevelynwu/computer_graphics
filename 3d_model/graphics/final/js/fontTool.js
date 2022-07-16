let cellW = 200,
  cellH = 200;
let canvasW = 1300,
  canvasH = 900;

rooms.hw5 = function () {
  description =
    `
    <select id="letter_choice" style="position: absolute; top: 500px; left: 600px; z-index: 100;">   
        <option value="a">A</option>
        <option value="b">B</option>
        <option value="c">C</option>
        <option value="d">D</option>
        <option value="e">E</option>
        <option value="f">F</option>
        <option value="g">G</option>
        <option value="h">H</option>
        <option value="i">I</option>
        <option value="j">J</option>
        <option value="k">K</option>
        <option value="l">L</option>
        <option value="m">M</option>
        <option value="n">N</option>
        <option value="o">O</option>
        <option value="p">P</option>
        <option value="q">Q</option>
        <option value="r">R</option>
        <option value="s">S</option>
        <option value="t">T</option>
        <option value="u">U</option>
        <option value="v">V</option>
        <option value="w">W</option>
        <option value="x">X</option>
        <option value="y">Y</option>
        <option value="z">Z</option>

    </select>

    <p style="color: white; position: absolute; top: 550px; left: 400px; font-size: 20px;">
    This is a website for users to make customized fonts.</br></br>  
    Instruction: </br>
      1. Click and drag on the pink circles to design the letters.</br>
      2. Use the dropdown menu to switch between different character.
    </p>
` + addDiagram(canvasW, canvasH);

  code = {
    intro: `
    if (showDiagram())
      fontDiagram();
    `,
  };
};
