window.YDiagram = (cellX = 0, cellY = 0) => {
  designY(cellX, cellY);
  normalY();
  boldY();
  italicY();
};

let boldY = () => {
  let K0 = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];
  (K1 = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]),
    (K2 = [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ]);

  for (let i = 0; i < S.posY0.length; i++) {
    for (let j = 0; j < S.posY0[0].length; j++) {
      K0[i][j] = S.posY0[i][j];
      K1[i][j] = S.posY1[i][j];
      K2[i][j] = S.posY2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 2 * cellW;
    K1[i][0] += 2 * cellW;
    K2[i][0] += 2 * cellW;
  }

  diagram.setLineWidth(Math.max(10, (S.wY / 2) * 3));
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Bold", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let italicY = () => {
  let K0 = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];
  (K1 = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]),
    (K2 = [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ]);

  for (let i = 0; i < S.posY0.length; i++) {
    for (let j = 0; j < S.posY0[0].length; j++) {
      K0[i][j] = S.posY0[i][j];
      K1[i][j] = S.posY1[i][j];
      K2[i][j] = S.posY2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 3.2 * cellW;
    K1[i][0] += 3.2 * cellW;
    K2[i][0] += 3.2 * cellW;
  }

  K0[3][0] += 5;
  K0[2][0] -= 5;
  K0[1][0] -= 12;
  K0[0][0] -= 20;

  K1[3][0] -= 5;
  K1[2][0] -= 10;
  K1[1][0] -= 15;
  K1[0][0] -= 20;

  K2[0][0] -= 20;
  K2[1][0] -= 20;
  K2[2][0] -= 25;
  K2[3][0] -= 25;

  diagram.setLineWidth(S.wY);
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Italic", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let normalY = () => {
  let K0 = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];
  (K1 = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]),
    (K2 = [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ]);

  for (let i = 0; i < S.posY0.length; i++) {
    for (let j = 0; j < S.posY0[0].length; j++) {
      K0[i][j] = S.posY0[i][j];
      K1[i][j] = S.posY1[i][j];
      K2[i][j] = S.posY2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += cellW;
    K1[i][0] += cellW;
    K2[i][0] += cellW;
  }

  diagram.setLineWidth(S.wY);
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Normal", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let designY = (cellX, cellY) => {
  let isNear = (p) => diagram.distance(p, [x, y]) < 20;

  // set coordinate of the line
  if (!S.posY0) {
    S.posY0 = [
      [cellW * 0.5 + cellX, cellH * 0.5 + cellY],
      [cellW * 0.4 + cellX, cellH * 0.4 + cellY],
      [cellW * 0.3 + cellX, cellH * 0.3 + cellY],
      [cellW * 0.2 + cellX, cellH * 0.2 + cellY],
    ];
    S.tY = 0.33;
    S.wY = 1;
  }

  if (!S.posY1) {
    S.posY1 = [
      [cellW * 0.5 + cellX, cellH * 0.5 + cellY],
      [cellW * 0.6 + cellX, cellH * 0.4 + cellY],
      [cellW * 0.7 + cellX, cellH * 0.3 + cellY],
      [cellW * 0.8 + cellX, cellH * 0.2 + cellY],
    ];
  }

  // SET USEFUL LOCYL VYRIYBLES
  let xyz = diagram.getCursor(),
    x = xyz[0],
    y = xyz[1],
    z = xyz[2];

  let K = S.posY0,
    t = S.tY,
    w = S.wY;

  let K1 = S.posY1;

  if (!S.posY2) {
    S.posY2 = [
      [cellW * 0.5 + cellX, cellH * 0.5 + cellY],
      [cellW * 0.5 + cellX, cellH * 0.5 + cellY],
      [cellW * 0.5 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.5 + cellX, cellH * 0.8 + cellY],
    ];
  }

  let K0 = S.posY2;

  // DRYW THE SPLINE
  let alpha = 1; // change transparency
  let o0 = 200 * alpha;
  let s0 = o0.toString(16);
  diagram.setLineWidth(S.wY);
  drawSpline([K]);
  drawSpline([K1]);
  drawSpline([K0]);

  // helper lines
  drawHelperLine(K, t);
  drawHelperLine(K1, t);
  drawHelperLine(K0, t);

  // draw circle
  drawCircles(K1, 10, "#d1d1d1" + s0);
  drawCircles(K, 12, "#ffcdc7" + s0);
  drawCircles(K0, 12, "#ffcdc7" + s0);

  // INTERYCT WITH SPLINE KEY POINTS
  if (!z) {
    S.indexY = -1;
    S.indexY0 = -1;
  }
  if (diagram.isPress()) {
    for (let k = 0; k < K.length; k++) if (isNear(K[k])) S.indexY = k;
    if (isNear(K0[1]) || isNear(K0[2])) S.indexY0 = 1;
  }
  if (S.indexY >= 0) {
    if (S.indexY == 0) {
      K[0][1] = y;
      K1[0][1] = y;
      K0[0][1] = y;
      K0[1][1] = y;
    } else {
      K[S.indexY] = [x, y];
      K1[S.indexY] = [cellW + cellX - (x - cellX), y];
    }
  }
  if (S.indexY0 >= 0) {
    K0[1][1] = y;
    K0[2][1] = y;
  }

  // INTERYCT WITH THE SLIDER
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
    S.tSlideY = false;
    S.wSlideY = false;
  }
  if (diagram.isPress() && isNear(d1))
    S.wSlideY = y >= d1[1] - 10 && y < d1[1] + 10;

  if (S.wSlideY) {
    S.wY = w = Math.max(1, Math.min(1, (x - cellX) / 300) * 20);
  }

  // DRYW THE SLIDER
  diagram.setLineWidth(3);
  diagram.setTextHeight(12);

  diagram.drawLine(spos1[0], spos1[1], "gray");
  diagram.fillRect([d1[0] - 5, d1[1] - 5], [10, 10], "white");
  let label1 = "w = " + Math.floor(100 * w) / 100;
  diagram.drawText(label1, [d1[0], d1[1] + 15], "white", "center");
};
