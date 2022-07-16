window.ADiagram = (cellX = 0, cellY = 0) => {
  designA(cellX, cellY);
  normalA();
  boldA();
  italicA();
};

let boldA = () => {
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

  for (let i = 0; i < S.posA0.length; i++) {
    for (let j = 0; j < S.posA0[0].length; j++) {
      K0[i][j] = S.posA0[i][j];
      K1[i][j] = S.posA1[i][j];
      K2[i][j] = S.posA2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 2 * cellW;
    K1[i][0] += 2 * cellW;
    K2[i][0] += 2 * cellW;
  }

  diagram.setLineWidth(Math.max(10, (S.wA / 2) * 3));
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Bold", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let italicA = () => {
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

  for (let i = 0; i < S.posA0.length; i++) {
    for (let j = 0; j < S.posA0[0].length; j++) {
      K0[i][j] = S.posA0[i][j];
      K1[i][j] = S.posA1[i][j];
      K2[i][j] = S.posA2[i][j];
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

  K2[0] = spline(K1, S.tA);
  K2[1][0] -= 11;
  K2[2][0] -= 11;
  K2[3] = spline(K0, S.tA);

  diagram.setLineWidth(S.wA);
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Italic", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let normalA = () => {
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

  for (let i = 0; i < S.posA0.length; i++) {
    for (let j = 0; j < S.posA0[0].length; j++) {
      K0[i][j] = S.posA0[i][j];
      K1[i][j] = S.posA1[i][j];
      K2[i][j] = S.posA2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += cellW;
    K1[i][0] += cellW;
    K2[i][0] += cellW;
  }

  diagram.setLineWidth(S.wA);
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Normal", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let designA = (cellX, cellY) => {
  let isNear = (p) => diagram.distance(p, [x, y]) < 20;

  // set coordinate of the line
  if (!S.posA0) {
    S.posA0 = [
      [cellW * 0.2 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.3 + cellX, cellH * 0.6 + cellY],
      [cellW * 0.4 + cellX, cellH * 0.4 + cellY],
      [cellW * 0.5 + cellX, cellH * 0.2 + cellY],
    ];
    S.tA = 0.33;
    S.wA = 1;
  }

  if (!S.posA1) {
    S.posA1 = [
      [cellW * 0.8 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.7 + cellX, cellH * 0.6 + cellY],
      [cellW * 0.6 + cellX, cellH * 0.4 + cellY],
      [cellW * 0.5 + cellX, cellH * 0.2 + cellY],
    ];
  }

  // SET USEFUL LOCAL VARIABLES
  let xyz = diagram.getCursor(),
    x = xyz[0],
    y = xyz[1],
    z = xyz[2];

  let K = S.posA0,
    t = S.tA,
    w = S.wA;

  let K1 = S.posA1;

  if (!S.posA2) {
    let temp = spline(K1, t);
    S.posA2 = [
      temp,
      [cellW * 0.5 + cellX, temp[1]],
      [cellW * 0.5 + cellX, temp[1]],
      spline(K, t),
    ];
  }

  let K0 = S.posA2;

  // DRAW THE SPLINE
  let alpha = 1; // change transparency
  let o0 = 200 * alpha;
  let s0 = o0.toString(16);
  //drawCircles(K0, 10, "#ffcdc7" + s0);
  diagram.setLineWidth(S.wA);
  drawSpline([K]);
  drawSpline([K0]);
  drawSpline([K1]);

  // helper lines
  drawHelperLine(K, t);
  drawHelperLine(K0, t);
  drawHelperLine(K1, t);

  // draw circle
  drawCircles(K1, 10, "#d1d1d1" + s0);
  drawCircles(K, 12, "#ffcdc7" + s0);
  diagram.fillCircle(K0[1], 10, "#ffcdc7");

  // INTERACT WITH SPLINE KEY POINTS
  if (!z) {
    S.indexA = -1;
    S.indexA0 = -1;
  }
  if (diagram.isPress()) {
    for (let k = 0; k < K.length; k++) if (isNear(K[k])) S.indexA = k;
    if (isNear(K0[1]) || isNear(K0[2])) S.indexA0 = 1;
  }
  if (S.indexA >= 0) {
    if (x < cellX + cellW && x > cellX && y < cellY + cellH && y > cellY) {
      if (S.indexA == K.length - 1) {
        K[S.indexA][1] = y;
        K1[S.indexA][1] = y;
      } else {
        if (x < cellX + cellW * 0.5) {
          K[S.indexA] = [x, y];
          K0[0] = spline(K1, t);
          K0[3] = spline(K, t);
          K1[S.indexA] = [cellW + cellX - (x - cellX), y];
        }
      }
    }
  }
  if (S.indexA0 >= 0) {
    if (y < cellH + cellY && y > cellY + cellH * 0.3) {
      K0[1][1] = y;
      K0[2][1] = y;
    }
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
    S.tSlideA = false;
    S.wSlideA = false;
  }

  if (diagram.isPress() && isNear(d))
    S.tSlideA = y >= d[1] - 10 && y < d[1] + 10;
  if (diagram.isPress() && isNear(d1))
    S.wSlideA = y >= d1[1] - 10 && y < d1[1] + 10;

  if (S.tSlideA) {
    S.tA = t = Math.max(0, Math.min(1, (x - cellX + 50) / 360));
    let temp = spline(K1, t);
    let offset = S.posA2[0][1] - temp[1];
    S.posA2[0] = temp;
    S.posA2[1][1] -= offset;
    S.posA2[2][1] -= offset;
    S.posA2[3] = spline(K, t);
  }

  if (S.wSlideA) {
    S.wA = w = Math.max(1, Math.min(1, (x - cellX) / 300) * 20);
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
