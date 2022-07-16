window.WDiagram = (cellX = 0, cellY = 0) => {
  designW(cellX, cellY);
  normalW();
  boldW();
  italicW();
};

let boldW = () => {
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
    ]),
    (K3 = [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ]);

  for (let i = 0; i < S.posW0.length; i++) {
    for (let j = 0; j < S.posW0[0].length; j++) {
      K0[i][j] = S.posW0[i][j];
      K1[i][j] = S.posW1[i][j];
      K2[i][j] = S.posW2[i][j];
      K3[i][j] = S.posW3[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 2.4 * cellW;
    K1[i][0] += 2.4 * cellW;
    K2[i][0] += 2.4 * cellW;
    K3[i][0] += 2.4 * cellW;
  }

  diagram.setLineWidth(Math.max(10, (S.wW / 2) * 3));
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);
  drawSpline([K3]);

  diagram.drawText("Bold", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let italicW = () => {
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
    ]),
    (K3 = [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ]);

  for (let i = 0; i < S.posW0.length; i++) {
    for (let j = 0; j < S.posW0[0].length; j++) {
      K0[i][j] = S.posW0[i][j];
      K1[i][j] = S.posW1[i][j];
      K2[i][j] = S.posW2[i][j];
      K3[i][j] = S.posW3[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 3.6 * cellW;
    K1[i][0] += 3.6 * cellW;
    K2[i][0] += 3.6 * cellW;
    K3[i][0] += 3.6 * cellW;
  }

  K0[3][0] += 15;
  K0[2][0] += 10;
  K0[1][0] += 5;
  K0[0][0] += 0;

  K1[3][0] -= 15;
  K1[2][0] -= 10;
  K1[1][0] -= 5;
  K1[0][0] -= 0;

  K2[3][0] -= 15;
  K2[2][0] -= 20;
  K2[1][0] -= 25;
  K2[0][0] -= 30;

  K3[3][0] -= 39;
  K3[2][0] -= 36;
  K3[1][0] -= 33;
  K3[0][0] -= 30;

  diagram.setLineWidth(S.wW);
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);
  drawSpline([K3]);

  diagram.drawText("Italic", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let normalW = () => {
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
    ]),
    (K3 = [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ]);

  for (let i = 0; i < S.posW0.length; i++) {
    for (let j = 0; j < S.posW0[0].length; j++) {
      K0[i][j] = S.posW0[i][j];
      K1[i][j] = S.posW1[i][j];
      K2[i][j] = S.posW2[i][j];
      K3[i][j] = S.posW3[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += cellW * 1.2;
    K1[i][0] += cellW * 1.2;
    K2[i][0] += cellW * 1.2;
    K3[i][0] += cellW * 1.2;
  }

  diagram.setLineWidth(S.wW);
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);
  drawSpline([K3]);

  diagram.drawText("Normal", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let designW = (cellX, cellY) => {
  let isNear = (p) => diagram.distance(p, [x, y]) < 20;

  // set coordinate of the line
  if (!S.posW0) {
    S.posW0 = [
      [cellW * 0.25 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.16 + cellX, cellH * 0.6 + cellY],
      [cellW * 0.07 + cellX, cellH * 0.4 + cellY],
      [cellW * 0 + cellX, cellH * 0.2 + cellY],
    ];
    S.tW = 0.45;
    S.wW = 1;
  }

  if (!S.posW1) {
    S.posW1 = [
      [cellW * 0.25 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.34 + cellX, cellH * 0.6 + cellY],
      [cellW * 0.42 + cellX, cellH * 0.4 + cellY],
      [cellW * 0.5 + cellX, cellH * 0.2 + cellY],
    ];
  }

  if (!S.posW2) {
    S.posW2 = [
      [S.posW0[0][0] + cellW * 0.5, cellH * 0.8 + cellY],
      [S.posW0[1][0] + cellW * 0.5, cellH * 0.6 + cellY],
      [S.posW0[2][0] + cellW * 0.5, cellH * 0.4 + cellY],
      [S.posW0[3][0] + cellW * 0.5, cellH * 0.2 + cellY],
    ];
  }

  if (!S.posW3) {
    S.posW3 = [
      [S.posW1[0][0] + cellW * 0.5, cellH * 0.8 + cellY],
      [S.posW1[1][0] + cellW * 0.5, cellH * 0.6 + cellY],
      [S.posW1[2][0] + cellW * 0.5, cellH * 0.4 + cellY],
      [S.posW1[3][0] + cellW * 0.5, cellH * 0.2 + cellY],
    ];
  }

  // SET WSEFWL LWCWL WWRIWBLES
  let xyz = diagram.getCursor(),
    x = xyz[0],
    y = xyz[1],
    z = xyz[2];

  let K = S.posW0,
    t = S.tW,
    w = S.wW;

  let K1 = S.posW1;
  let K2 = S.posW2;
  let K3 = S.posW3;

  // DRWW TWE SPLINE
  diagram.setLineWidth(S.wW);
  drawSpline([K]);
  drawSpline([K1]);
  drawSpline([K2]);
  drawSpline([K3]);

  // helper lines
  drawHelperLine(K, t);
  drawHelperLine(K1, t);
  drawHelperLine(K2, t);
  drawHelperLine(K3, t);

  // draw circle
  drawCircles(K2, 10, "#d1d1d1");
  drawCircles(K3, 10, "#d1d1d1");
  drawCircles(K, 10, "#ffcdc7");
  drawCircles(K1, 10, "#ffcdc7");

  // INTERWCT WITW SPLINE KEY PWINTS
  if (!z) {
    S.indexW = -1;
    S.indexW1 = -1;
  }
  if (diagram.isPress()) {
    for (let k = 1; k < K.length; k++) {
      if (isNear(K[k])) S.indexW = k;
      if (isNear(K1[k])) S.indexW1 = k;
    }
  }
  if (S.indexW >= 0) {
    K[S.indexW] = [x, y];
    K3[S.indexW] = [cellX + cellW - (x - cellX), y];
  }
  if (S.indexW1 >= 0) {
    if (S.indexW1 == 3) {
      K1[3][1] = y;
      K2[3][1] = y;
    } else {
      K1[S.indexW1] = [x, y];
      K2[S.indexW1] = [cellX + cellW - (x - cellX), y];
    }
  }

  // INTERWCT WITW TWE SLIDER
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
    S.tSlideW = false;
    S.wSlideW = false;
  }

  if (diagram.isPress() && isNear(d))
    S.tSlideW = y >= d[1] - 10 && y < d[1] + 10;
  if (diagram.isPress() && isNear(d1))
    S.wSlideW = y >= d1[1] - 10 && y < d1[1] + 10;

  if (S.wSlideW) {
    S.wW = w = Math.max(1, Math.min(1, (x - cellX) / 300) * 20);
  }

  // DRWW TWE SLIDER
  diagram.setLineWidth(3);
  diagram.setTextHeight(12);

  diagram.drawLine(spos1[0], spos1[1], "gray");
  diagram.fillRect([d1[0] - 5, d1[1] - 5], [10, 10], "white");
  let label1 = "w = " + Math.floor(100 * w) / 100;
  diagram.drawText(label1, [d1[0], d1[1] + 15], "white", "center");
};
