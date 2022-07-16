window.JDiagram = (cellX = 0, cellY = 0) => {
  designJ(cellX, cellY);
  normalJ();
  boldJ();
  italicJ();
};

let boldJ = () => {
  let K0 = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];
  K1 = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];

  for (let i = 0; i < S.posJ0.length; i++) {
    for (let j = 0; j < S.posJ0[0].length; j++) {
      K0[i][j] = S.posJ0[i][j];
      K1[i][j] = S.posJ1[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 2 * cellW;
    K1[i][0] += 2 * cellW;
  }

  diagram.setLineWidth(Math.max(10, (S.wJ / 2) * 3));
  drawSpline([K0]);
  drawSpline([K1]);

  diagram.drawText("Bold", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let italicJ = () => {
  let K0 = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];
  K1 = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];

  for (let i = 0; i < S.posJ0.length; i++) {
    for (let j = 0; j < S.posJ0[0].length; j++) {
      K0[i][j] = S.posJ0[i][j];
      K1[i][j] = S.posJ1[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 3.2 * cellW;
    K1[i][0] += 3.2 * cellW;
  }

  K0[3][0] += 5;
  K0[2][0] += 5;
  K0[1][0] -= 10;
  K0[0][0] -= 10;

  K1[3][0] -= 5;
  K1[2][0] -= 5;
  K1[1][0] -= 20;
  K1[0][0] -= 10;

  diagram.setLineWidth(S.wJ);
  drawSpline([K0]);
  drawSpline([K1]);

  diagram.drawText("Italic", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let normalJ = () => {
  let K0 = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];
  K1 = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];

  for (let i = 0; i < S.posJ0.length; i++) {
    for (let j = 0; j < S.posJ0[0].length; j++) {
      K0[i][j] = S.posJ0[i][j];
      K1[i][j] = S.posJ1[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += cellW;
    K1[i][0] += cellW;
  }

  diagram.setLineWidth(S.wJ);
  drawSpline([K0]);
  drawSpline([K1]);

  diagram.drawText("Normal", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let designJ = (cellX, cellY) => {
  let isNear = (p) => diagram.distance(p, [x, y]) < 20;

  // set coordinate of the line
  if (!S.posJ0) {
    S.posJ0 = [
      [cellW * 0.5 + cellX, cellH * 0.6 + cellY],
      [cellW * 0.5 + cellX, cellH * 0.6 + cellY],
      [cellW * 0.5 + cellX, cellH * 0.2 + cellY],
      [cellW * 0.5 + cellX, cellH * 0.2 + cellY],
    ];
    S.tJ = 0.45;
    S.wJ = 1;
  }

  if (!S.posJ1) {
    S.posJ1 = [
      S.posJ0[0],
      [cellW * 0.52 + cellX, cellH * 0.8 + cellY],
      [S.posJ0[0][0] * 0.9, cellH * 0.85 + cellY],
      [cellW * 0.2 + cellX, cellH * 0.7 + cellY],
    ];
  }

  // SET USEFUL LOCAL VJRIABLES
  let xyz = diagram.getCursor(),
    x = xyz[0],
    y = xyz[1],
    z = xyz[2];

  let K = S.posJ0,
    t = S.tJ,
    w = S.wJ;

  let K1 = S.posJ1;

  // DRAW SPLINE
  let alpha = 1; // change transparency
  let o0 = 200 * alpha;
  let s0 = o0.toString(16);
  diagram.setLineWidth(S.wJ);
  drawSpline([K]);
  drawSpline([K1]);

  // helper lines
  drawHelperLine(K, t);
  drawHelperLine(K1, t);

  // draw circle
  drawCircles(K1, 10, "#ffcdc7" + s0);
  drawCircles(K, 12, "#ffcdc7" + s0);

  // INTERACT SPLINE KEY POINTS
  if (!z) {
    S.indexJ = -1;
    S.indexJ1 = -1;
  }
  if (diagram.isPress()) {
    for (let k = 0; k < K.length; k++) {
      if (isNear(K[k])) S.indexJ = k;
      else if (isNear(K1[k])) S.indexJ1 = k;
    }
  }
  if (S.indexJ >= 0) {
    if (S.indexJ == 0 || S.indexJ == 1) {
      if (y <= cellH * 0.7 + cellY) {
        K[0][1] = y;
        K[1][1] = y;
      }
    } else {
      K[2][1] = y;
      K[3][1] = y;
    }
  }
  if (S.indexJ1 >= 0) {
    if (x <= cellW * 0.5 + cellX) K1[S.indexJ1] = [x, y];
  }

  // INTERACT WITH THE SLIDER
  let spos = [
    [cellW * 0.2 + cellX, cellH + cellY],
    [cellW * 0.8 + cellX, cellH + cellY],
  ];
  let spos1 = [
    [cellW * 0.2 + cellX, cellH * 1.2 + cellY],
    [cellW * 0.8 + cellX, cellH * 1.2 + cellY],
  ];
  let d = mix(spos[0], spos[1], t);
  let d1 = mix(spos1[0], spos1[1], w / 20);

  if (!z) {
    S.tSlideJ = false;
    S.wSlideJ = false;
  }

  if (diagram.isPress() && isNear(d))
    S.tSlideJ = y >= d[1] - 10 && y < d[1] + 10;
  if (diagram.isPress() && isNear(d1))
    S.wSlideJ = y >= d1[1] - 10 && y < d1[1] + 10;

  if (S.wSlideJ) {
    S.wJ = w = Math.max(1, Math.min(1, (x - cellX) / 300) * 20);
  }

  // DRJW TJE SLIDER
  diagram.setLineWidth(3);
  diagram.setTextHeight(12);

  diagram.drawLine(spos1[0], spos1[1], "gray");
  diagram.fillRect([d1[0] - 5, d1[1] - 5], [10, 10], "white");
  let label1 = "w = " + Math.floor(100 * w) / 100;
  diagram.drawText(label1, [d1[0], d1[1] + 15], "white", "center");
};
