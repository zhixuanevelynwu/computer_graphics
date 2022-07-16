window.BDiagram = (cellX = 0, cellY = 0) => {
  designB(cellX, cellY);
  normalB();
  boldB();
  italicB();
};

let boldB = () => {
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

  for (let i = 0; i < S.posB0.length; i++) {
    for (let j = 0; j < S.posB0[0].length; j++) {
      K0[i][j] = S.posB0[i][j];
      K1[i][j] = S.posB1[i][j];
      K2[i][j] = S.posB2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 2 * cellW;
    K1[i][0] += 2 * cellW;
    K2[i][0] += 2 * cellW;
  }

  diagram.setLineWidth(Math.max(10, (S.wB / 2) * 3));
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Bold", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let italicB = () => {
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

  for (let i = 0; i < S.posB0.length; i++) {
    for (let j = 0; j < S.posB0[0].length; j++) {
      K0[i][j] = S.posB0[i][j];
      K1[i][j] = S.posB1[i][j];
      K2[i][j] = S.posB2[i][j];
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
  K1[0] = spline(K0, S.tB);

  K2[0][0] = spline(K0, 0)[0];
  K2[2][0] += -4;
  K2[1][0] += -12;
  K2[3] = spline(K0, S.tB);

  diagram.setLineWidth(S.wB);
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Italic", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let normalB = () => {
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

  for (let i = 0; i < S.posB0.length; i++) {
    for (let j = 0; j < S.posB0[0].length; j++) {
      K0[i][j] = S.posB0[i][j];
      K1[i][j] = S.posB1[i][j];
      K2[i][j] = S.posB2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += cellW;
    K1[i][0] += cellW;
    K2[i][0] += cellW;
  }

  diagram.setLineWidth(S.wB);
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Normal", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let designB = (cellX, cellY) => {
  let isNear = (p) => diagram.distance(p, [x, y]) < 20;

  // set coordinate of the line
  if (!S.posB0) {
    S.posB0 = [
      [cellW * 0.2 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.2 + cellX, cellH * 0.6 + cellY],
      [cellW * 0.2 + cellX, cellH * 0.4 + cellY],
      [cellW * 0.2 + cellX, cellH * 0.2 + cellY],
    ];
    S.tB = 0.45;
    S.wB = 1;
  }

  if (!S.posB1) {
    S.posB1 = [
      [cellW * 0.2 + cellX, cellH * 0.5 + cellY],
      [cellW * 0.7 + cellX, cellH * 0.55 + cellY],
      [cellW * 0.7 + cellX, cellH * 0.14 + cellY],
      [cellW * 0.2 + cellX, cellH * 0.2 + cellY],
    ];
  }

  // SET USEFUL LOCAL VARIABLES
  let xyz = diagram.getCursor(),
    x = xyz[0],
    y = xyz[1],
    z = xyz[2];

  let K = S.posB0,
    t = S.tB,
    w = S.wB;

  let K1 = S.posB1;

  if (!S.posB2) {
    let temp = spline(K, 0.45);
    S.posB2 = [
      spline(K, 0),
      [cellW * 0.75 + cellX, cellH * 0.9 + cellY],
      [cellW * 0.75 + cellX, cellH * 0.4 + cellY],
      temp,
    ];
    S.t0 = 0.5;
  }

  let K0 = S.posB2;

  // DRAW THE SPLINE
  let alpha = 1; // change transparency
  let o0 = 200 * alpha;
  let s0 = o0.toString(16);
  diagram.setLineWidth(S.wB);
  drawCircles(K0, 10, "#ffcdc7" + s0);
  drawCircles(K1, 10, "#ffcdc7" + s0);

  drawSpline([K]);
  drawSpline([K0]);
  drawSpline([K1]);

  // helper lines
  drawHelperLine(K, t);
  drawHelperLine(K0, t);
  drawHelperLine(K1, t);

  drawCircles(K, 12, "#ffcdc7" + s0);

  // INTERACT WITH SPLINE KEY POINTS
  if (!z) {
    S.indexB = -1;
    S.indexB0 = -1;
    S.indexB1 = -1;
  }
  if (diagram.isPress()) {
    for (let k = 0; k < K.length; k++) {
      if (isNear(K[k])) S.indexB = k;
      if (k != 3) if (isNear(K0[k])) S.indexB0 = k;
      if (k != 0) if (isNear(K1[k])) S.indexB1 = k;
    }
  }
  if (S.indexB >= 0) {
    K[S.indexB] = [x, y];
    S.posB1[0][0] = spline(K, t)[0];
    S.posB2[3][0] = spline(K, t)[0];
  }
  if (S.indexB0 >= 0) {
    K0[S.indexB0] = [x, y];
  }
  if (S.indexB1 >= 0) {
    K1[S.indexB1] = [x, y];
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
    S.tSlideB = false;
    S.wSlideB = false;
  }

  if (diagram.isPress() && isNear(d))
    S.tSlideB = y >= d[1] - 10 && y < d[1] + 10;
  if (diagram.isPress() && isNear(d1))
    S.wSlideB = y >= d1[1] - 10 && y < d1[1] + 10;

  if (S.tSlideB) {
    S.tB = t = Math.max(0, Math.min(1, (x - cellX + 50) / 360));
    let temp = spline(K, t);
    S.posB1[0] = temp;
    S.posB2[3] = spline(K, t - 0.02);
  }

  if (S.wSlideB) {
    S.wB = w = Math.max(1, Math.min(1, (x - cellX + 40) / 360) * 20);
  }

  // DRAW THE SLIDER
  diagram.setLineWidth(3);
  diagram.setTextHeight(12);
  diagram.drawLine(spos[0], spos[1], "gray");
  diagram.drawLine(spos1[0], spos1[1], "gray");

  diagram.fillRect([d[0] - 5, d[1] - 5], [10, 10], "white");
  let label = "t = " + Math.floor(100 * t) / 100;
  diagram.drawText(label, [d[0], d[1] + 15], "white", "center");

  diagram.fillRect([d1[0] - 5, d1[1] - 5], [10, 10], "white");
  let label1 = "w = " + Math.floor(100 * w) / 100;
  diagram.drawText(label1, [d1[0], d1[1] + 15], "white", "center");
};
