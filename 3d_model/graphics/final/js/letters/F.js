window.FDiagram = (cellX = 0, cellY = 0) => {
  designF(cellX, cellY);
  normalF();
  boldF();
  italicF();
};

let boldF = () => {
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

  for (let i = 0; i < S.posF0.length; i++) {
    for (let j = 0; j < S.posF0[0].length; j++) {
      K0[i][j] = S.posF0[i][j];
      K1[i][j] = S.posF1[i][j];
      K2[i][j] = S.posF2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 2 * cellW;
    K1[i][0] += 2 * cellW;
    K2[i][0] += 2 * cellW;
  }

  diagram.setLineWidth(Math.max(10, (S.wF / 2) * 3));
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Bold", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let italicF = () => {
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

  for (let i = 0; i < S.posF0.length; i++) {
    for (let j = 0; j < S.posF0[0].length; j++) {
      K0[i][j] = S.posF0[i][j];
      K1[i][j] = S.posF1[i][j];
      K2[i][j] = S.posF2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 3.2 * cellW;
    K1[i][0] += 3.2 * cellW;
    K2[i][0] += 3.2 * cellW;
  }

  K0[3][0] += 5;
  K0[2][0] -= 5;
  K0[1][0] -= 10;
  K0[0][0] -= 20;

  K1[3] = K0[3];
  K2[0] = spline(K0, S.tF);

  diagram.setLineWidth(S.wF);
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Italic", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let normalF = () => {
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

  for (let i = 0; i < S.posF0.length; i++) {
    for (let j = 0; j < S.posF0[0].length; j++) {
      K0[i][j] = S.posF0[i][j];
      K1[i][j] = S.posF1[i][j];
      K2[i][j] = S.posF2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += cellW;
    K1[i][0] += cellW;
    K2[i][0] += cellW;
  }

  diagram.setLineWidth(S.wF);
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Normal", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let designF = (cellX, cellY) => {
  let isNear = (p) => diagram.distance(p, [x, y]) < 20;

  // set coordinate of the line
  if (!S.posF0) {
    S.posF0 = [
      [cellW * 0.2 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.2 + cellX, cellH * 0.6 + cellY],
      [cellW * 0.2 + cellX, cellH * 0.4 + cellY],
      [cellW * 0.2 + cellX, cellH * 0.2 + cellY],
    ];
    S.tF = 0.5;
    S.wF = 1;
  }

  if (!S.posF1) {
    S.posF1 = [
      [cellW * 0.65 + cellX, S.posF0[3][1]],
      [cellW * 0.5 + cellX, S.posF0[3][1]],
      [cellW * 0.35 + cellX, S.posF0[3][1]],
      S.posF0[3],
    ];
  }

  if (!S.posF3) {
    S.posF3 = [
      [cellW * 0.65 + cellX, S.posF0[0][1]],
      [cellW * 0.5 + cellX, S.posF0[0][1]],
      [cellW * 0.35 + cellX, S.posF0[0][1]],
      S.posF0[0],
    ];
  }

  // SFT USFFUL LOCAL VARIABLFS
  let xyz = diagram.getCursor(),
    x = xyz[0],
    y = xyz[1],
    z = xyz[2];

  let K = S.posF0,
    t = S.tF,
    w = S.wF;

  let K1 = S.posF1;
  let K2 = S.posF3;

  if (!S.posF2) {
    let temp = spline(K, t);
    S.posF2 = [
      temp,
      [cellW * 0.4 + cellX, temp[1]],
      [cellW * 0.4 + cellX, temp[1]],
      [cellW * 0.6 + cellX, temp[1]],
    ];
  }

  let K0 = S.posF2;

  // DRAW THF SPLINF
  diagram.setLineWidth(S.wF);
  drawSpline([K0]);
  drawCircles(K0, 10, "#ffcdc7");
  drawSpline([K]);
  drawSpline([K1]);
  //drawSpline([K2]);

  // helper lines
  drawHelperLine(K, t);
  drawHelperLine(K0, t);
  drawHelperLine(K1, t);

  // draw circle
  drawCircles(K1, 10, "#ffcdc7");
  drawCircles(K, 12, "#ffcdc7");

  // INTFRACT WITH SPLINF KFY POINTS
  if (!z) {
    S.indexF = -1;
    S.indexF0 = -1;
    S.indexF1 = -1;
    S.indexF2 = -1;
  }
  if (diagram.isPress()) {
    for (let k = 0; k < K.length; k++) {
      if (isNear(K[k])) S.indexF = k;
      if (isNear(K0[k]) && k != 0) S.indexF0 = k;
      if (isNear(K1[k])) S.indexF1 = k;
    }
  }
  if (S.indexF >= 0) {
    K[S.indexF] = [x, y];
    K0[0] = spline(K, t);
  }
  if (S.indexF0 >= 0) {
    let k = S.indexF0;
    if (k == 1 || k == 2) {
      K0[1] = [x, y];
      K0[2] = [x, y];
    } else {
      K0[k] = [x, y];
    }
  }
  if (S.indexF1 >= 0) {
    K1[S.indexF1] = [x, y];
  }

  // INTFRACT WITH THF SLIDFR
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
    S.tSlideF = false;
    S.wSlideF = false;
  }

  if (diagram.isPress() && isNear(d))
    S.tSlideF = y >= d[1] - 10 && y < d[1] + 10;
  if (diagram.isPress() && isNear(d1))
    S.wSlideF = y >= d1[1] - 10 && y < d1[1] + 10;

  if (S.tSlideF) {
    S.tF = t = Math.max(0, Math.min(1, (x - cellX + 50) / 360));
    let temp = spline(K, t);
    let offset = S.posF2[0][1] - temp[1];
    S.posF2[0] = temp;
    S.posF2[1][1] -= offset;
    S.posF2[2][1] -= offset;
    S.posF2[3][1] -= offset;
  }

  if (S.wSlideF) {
    S.wF = w = Math.max(1, Math.min(1, (x - cellX) / 300) * 20);
  }

  // DRAW THF SLIDFR
  diagram.setLineWidth(3);
  diagram.drawLine(spos[0], spos[1], "gray");
  diagram.fillRect([d[0] - 5, d[1] - 5], [10, 10], "white");
  diagram.setTextHeight(12);
  let label = "t = " + Math.floor(100 * t) / 100;
  diagram.drawText(label, [d[0], d[1] + 15], "white", "center");

  diagram.drawLine(spos1[0], spos1[1], "gray");
  diagram.fillRect([d1[0] - 5, d1[1] - 5], [10, 10], "white");
  let label1 = "w = " + Math.floor(100 * w) / 100;
  diagram.drawText(label1, [d1[0], d1[1] + 15], "white", "center");
};
