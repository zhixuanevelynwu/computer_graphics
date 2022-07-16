window.XDiagram = (cellX = 0, cellY = 0) => {
  designX(cellX, cellY);
  normalX();
  boldX();
  italicX();
};

let boldX = () => {
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

  for (let i = 0; i < S.posX0.length; i++) {
    for (let j = 0; j < S.posX0[0].length; j++) {
      K0[i][j] = S.posX0[i][j];
      K1[i][j] = S.posX1[i][j];
      K2[i][j] = S.posX2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 2 * cellW;
    K1[i][0] += 2 * cellW;
    K2[i][0] += 2 * cellW;
  }

  diagram.setLineWidth(Math.max(10, (S.wX / 2) * 3));
  drawSpline([K0]);
  drawSpline([K1]);

  diagram.drawText("Bold", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let italicX = () => {
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

  for (let i = 0; i < S.posX0.length; i++) {
    for (let j = 0; j < S.posX0[0].length; j++) {
      K0[i][j] = S.posX0[i][j];
      K1[i][j] = S.posX1[i][j];
      K2[i][j] = S.posX2[i][j];
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

  K1[3][0] += 5;
  K1[2][0] += -4;
  K1[1][0] += -12;
  K1[0][0] += -22;

  K2[0] = spline(K1, S.tX);
  K2[1][0] -= 11;
  K2[2][0] -= 11;
  K2[3] = spline(K0, S.tX);

  diagram.setLineWidth(S.wX);
  drawSpline([K0]);
  drawSpline([K1]);

  diagram.drawText("Italic", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let normalX = () => {
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

  for (let i = 0; i < S.posX0.length; i++) {
    for (let j = 0; j < S.posX0[0].length; j++) {
      K0[i][j] = S.posX0[i][j];
      K1[i][j] = S.posX1[i][j];
      K2[i][j] = S.posX2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += cellW;
    K1[i][0] += cellW;
    K2[i][0] += cellW;
  }

  diagram.setLineWidth(S.wX);
  drawSpline([K0]);
  drawSpline([K1]);

  diagram.drawText("Normal", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let designX = (cellX, cellY) => {
  let isNear = (p) => diagram.distance(p, [x, y]) < 20;

  // set coordinate of the line
  if (!S.posX0) {
    S.posX0 = [
      [cellW * 0.2 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.4 + cellX, cellH * 0.6 + cellY],
      [cellW * 0.6 + cellX, cellH * 0.4 + cellY],
      [cellW * 0.8 + cellX, cellH * 0.2 + cellY],
    ];
    S.tX = 0.33;
    S.wX = 1;
  }

  if (!S.posX1) {
    S.posX1 = [
      [cellW * 0.8 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.6 + cellX, cellH * 0.6 + cellY],
      [cellW * 0.4 + cellX, cellH * 0.4 + cellY],
      [cellW * 0.2 + cellX, cellH * 0.2 + cellY],
    ];
  }

  // SET USEFUL LOCXL VXRIXBLES
  let xyz = diagram.getCursor(),
    x = xyz[0],
    y = xyz[1],
    z = xyz[2];

  let K = S.posX0,
    t = S.tX,
    w = S.wX;

  let K1 = S.posX1;

  if (!S.posX2) {
    let temp = spline(K1, t);
    S.posX2 = [
      temp,
      [cellW * 0.5 + cellX, temp[1]],
      [cellW * 0.5 + cellX, temp[1]],
      spline(K, t),
    ];
  }

  let K0 = S.posX2;

  // DRXW THE SPLINE
  let alpha = 1; // change transparency
  let o0 = 200 * alpha;
  let s0 = o0.toString(16);
  diagram.setLineWidth(S.wX);
  drawSpline([K]);
  drawSpline([K1]);

  // helper lines
  drawHelperLine(K, t);
  drawHelperLine(K1, t);

  // draw circle
  drawCircles(K1, 10, "#d1d1d1" + s0);
  drawCircles(K, 12, "#ffcdc7" + s0);

  // INTERXCT WITH SPLINE KEY POINTS
  if (!z) {
    S.indexX = -1;
    S.indexX0 = -1;
  }
  if (diagram.isPress()) {
    for (let k = 0; k < K.length; k++) if (isNear(K[k])) S.indexX = k;
    if (isNear(K0[1]) || isNear(K0[2])) S.indexX0 = 1;
  }
  if (S.indexX >= 0) {
    K[S.indexX] = [x, y];
    K0[0] = spline(K1, t);
    K0[3] = spline(K, t);
    K1[S.indexX] = [cellW + cellX - (x - cellX), y];
  }
  if (S.indexX0 >= 0) {
    K0[1][1] = y;
    K0[2][1] = y;
  }

  // INTERXCT WITH THE SLIDER
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
    S.tSlideX = false;
    S.wSlideX = false;
  }
  if (diagram.isPress() && isNear(d1))
    S.wSlideX = y >= d1[1] - 10 && y < d1[1] + 10;

  if (S.wSlideX) {
    S.wX = w = Math.max(1, Math.min(1, (x - cellX) / 300) * 20);
  }

  // DRXW THE SLIDER
  diagram.setLineWidth(3);
  diagram.setTextHeight(12);

  diagram.drawLine(spos1[0], spos1[1], "gray");
  diagram.fillRect([d1[0] - 5, d1[1] - 5], [10, 10], "white");
  let label1 = "w = " + Math.floor(100 * w) / 100;
  diagram.drawText(label1, [d1[0], d1[1] + 15], "white", "center");
};
