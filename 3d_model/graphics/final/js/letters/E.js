window.EDiagram = (cellX = 0, cellY = 0) => {
  designE(cellX, cellY);
  normalE();
  boldE();
  italicE();
};

let boldE = () => {
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
  K3 = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];

  for (let i = 0; i < S.posE0.length; i++) {
    for (let j = 0; j < S.posE0[0].length; j++) {
      K0[i][j] = S.posE0[i][j];
      K1[i][j] = S.posE1[i][j];
      K2[i][j] = S.posE2[i][j];
      K3[i][j] = S.posE3[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 2 * cellW;
    K1[i][0] += 2 * cellW;
    K2[i][0] += 2 * cellW;
    K3[i][0] += 2 * cellW;
  }

  diagram.setLineWidth(Math.max(10, (S.wE / 2) * 3));
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);
  drawSpline([K3]);

  diagram.drawText("Bold", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let italicE = () => {
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

  for (let i = 0; i < S.posE0.length; i++) {
    for (let j = 0; j < S.posE0[0].length; j++) {
      K0[i][j] = S.posE0[i][j];
      K1[i][j] = S.posE1[i][j];
      K2[i][j] = S.posE2[i][j];
      K3[i][j] = S.posE3[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 3.2 * cellW;
    K1[i][0] += 3.2 * cellW;
    K2[i][0] += 3.2 * cellW;
    K3[i][0] += 3.2 * cellW;
  }

  K0[3][0] += 5;
  K0[2][0] -= 5;
  K0[1][0] -= 10;
  K0[0][0] -= 20;

  K1[3] = K0[3];

  K2[0] = spline(K0, S.tE);

  K3[3] = K0[0];
  K3[0][0] -= 14;

  diagram.setLineWidth(S.wE);
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);
  drawSpline([K3]);

  diagram.drawText("Italic", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let normalE = () => {
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

  for (let i = 0; i < S.posE0.length; i++) {
    for (let j = 0; j < S.posE0[0].length; j++) {
      K0[i][j] = S.posE0[i][j];
      K1[i][j] = S.posE1[i][j];
      K2[i][j] = S.posE2[i][j];
      K3[i][j] = S.posE3[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += cellW;
    K1[i][0] += cellW;
    K2[i][0] += cellW;
    K3[i][0] += cellW;
  }

  diagram.setLineWidth(S.wE);
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);
  drawSpline([K3]);

  diagram.drawText("Normal", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let designE = (cellX, cellY) => {
  let isNear = (p) => diagram.distance(p, [x, y]) < 20;

  // set coordinate of the line
  if (!S.posE0) {
    S.posE0 = [
      [cellW * 0.2 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.2 + cellX, cellH * 0.6 + cellY],
      [cellW * 0.2 + cellX, cellH * 0.4 + cellY],
      [cellW * 0.2 + cellX, cellH * 0.2 + cellY],
    ];
    S.tE = 0.5;
    S.wE = 1;
  }

  if (!S.posE1) {
    S.posE1 = [
      [cellW * 0.65 + cellX, S.posE0[3][1]],
      [cellW * 0.5 + cellX, S.posE0[3][1]],
      [cellW * 0.35 + cellX, S.posE0[3][1]],
      S.posE0[3],
    ];
  }

  if (!S.posE3) {
    S.posE3 = [
      [cellW * 0.65 + cellX, S.posE0[0][1]],
      [cellW * 0.5 + cellX, S.posE0[0][1]],
      [cellW * 0.35 + cellX, S.posE0[0][1]],
      S.posE0[0],
    ];
  }

  // SET USEFUL LOCAL VARIABLES
  let xyz = diagram.getCursor(),
    x = xyz[0],
    y = xyz[1],
    z = xyz[2];

  let K = S.posE0,
    t = S.tE,
    w = S.wE;

  let K1 = S.posE1;
  let K2 = S.posE3;

  if (!S.posE2) {
    let temp = spline(K, t);
    S.posE2 = [
      temp,
      [cellW * 0.4 + cellX, temp[1]],
      [cellW * 0.4 + cellX, temp[1]],
      [cellW * 0.6 + cellX, temp[1]],
    ];
  }

  let K0 = S.posE2;

  // DRAW THE SPLINE
  diagram.setLineWidth(S.wE);
  drawSpline([K0]);
  drawCircles(K0, 10, "#ffcdc7");
  drawSpline([K]);
  drawSpline([K1]);
  drawSpline([K2]);

  // helper lines
  drawHelperLine(K, t);
  drawHelperLine(K0, t);
  drawHelperLine(K1, t);
  drawHelperLine(K2, t);

  // draw circle
  drawCircles(K1, 10, "#ffcdc7");
  drawCircles(K, 12, "#ffcdc7");
  drawCircles(K2, 10, "#ffcdc7");

  // INTERACT WITH SPLINE KEY POINTS
  if (!z) {
    S.indexE = -1;
    S.indexE0 = -1;
    S.indexE1 = -1;
    S.indexE2 = -1;
  }
  if (diagram.isPress()) {
    for (let k = 0; k < K.length; k++) {
      if (isNear(K[k])) S.indexE = k;
      if (isNear(K0[k]) && k != 0) S.indexE0 = k;
      if (isNear(K1[k])) S.indexE1 = k;
      if (isNear(K2[k])) S.indexE2 = k;
    }
  }
  if (S.indexE >= 0) {
    K[S.indexE] = [x, y];
    K0[0] = spline(K, t);
  }
  if (S.indexE0 >= 0) {
    let k = S.indexE0;
    if (k == 1 || k == 2) {
      K0[1] = [x, y];
      K0[2] = [x, y];
    } else {
      K0[k] = [x, y];
    }
  }
  if (S.indexE1 >= 0) {
    K1[S.indexE1] = [x, y];
  }
  if (S.indexE2 >= 0) {
    K2[S.indexE2] = [x, y];
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
    S.tSlideE = false;
    S.wSlideE = false;
  }

  if (diagram.isPress() && isNear(d))
    S.tSlideE = y >= d[1] - 10 && y < d[1] + 10;
  if (diagram.isPress() && isNear(d1))
    S.wSlideE = y >= d1[1] - 10 && y < d1[1] + 10;

  if (S.tSlideE) {
    S.tE = t = Math.max(0, Math.min(1, (x - cellX + 50) / 360));
    let temp = spline(K, t);
    let offset = S.posE2[0][1] - temp[1];
    S.posE2[0] = temp;
    S.posE2[1][1] -= offset;
    S.posE2[2][1] -= offset;
    S.posE2[3][1] -= offset;
  }

  if (S.wSlideE) {
    S.wE = w = Math.max(1, Math.min(1, (x - cellX) / 300) * 20);
  }

  // DRAW THE SLIDER
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
