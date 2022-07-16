window.QDiagram = (cellX = 0, cellY = 0) => {
  designQ(cellX, cellY);
  normalQ();
  boldQ();
  italicQ();
};

let boldQ = () => {
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

  for (let i = 0; i < S.posQ0.length; i++) {
    for (let j = 0; j < S.posQ0[0].length; j++) {
      K0[i][j] = S.posQ0[i][j];
      K1[i][j] = S.posQ1[i][j];
      K2[i][j] = S.posQ2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 2 * cellW;
    K1[i][0] += 2 * cellW;
    K2[i][0] += 2 * cellW;
  }

  diagram.setLineWidth(Math.max(10, (S.wQ / 2) * 3));
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Bold", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let italicQ = () => {
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

  for (let i = 0; i < S.posQ0.length; i++) {
    for (let j = 0; j < S.posQ0[0].length; j++) {
      K0[i][j] = S.posQ0[i][j];
      K1[i][j] = S.posQ1[i][j];
      K2[i][j] = S.posQ2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 3.2 * cellW;
    K1[i][0] += 3.2 * cellW;
    K2[i][0] += 3.2 * cellW;
  }

  K0[3][0] += 5;
  K0[2][0] -= 4;
  K0[1][0] -= 12;
  K0[0][0] -= 22;

  K1[3][0] += 5;
  K1[2][0] += -4;
  K1[1][0] += -12;
  K1[0][0] += -20;

  K2[3][0] += -10;
  K2[2][0] += -10;
  K2[1][0] += -10;
  K2[0][0] += -10;

  diagram.setLineWidth(S.wQ);
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Italic", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let normalQ = () => {
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

  for (let i = 0; i < S.posQ0.length; i++) {
    for (let j = 0; j < S.posQ0[0].length; j++) {
      K0[i][j] = S.posQ0[i][j];
      K1[i][j] = S.posQ1[i][j];
      K2[i][j] = S.posQ2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += cellW;
    K1[i][0] += cellW;
    K2[i][0] += cellW;
  }

  diagram.setLineWidth(S.wQ);
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Normal", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let designQ = (cellX, cellY) => {
  let isNear = (p) => diagram.distance(p, [x, y]) < 20;

  // set coordinate of the line
  if (!S.posQ0) {
    S.posQ0 = [
      [cellW * 0.5 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.2 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.2 + cellX, cellH * 0.2 + cellY],
      [cellW * 0.5 + cellX, cellH * 0.2 + cellY],
    ];
    S.tQ = 0.45;
    S.wQ = 1;
  }

  if (!S.posQ1) {
    S.posQ1 = [
      [cellW * 0.5 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.8 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.8 + cellX, cellH * 0.2 + cellY],
      [cellW * 0.5 + cellX, cellH * 0.2 + cellY],
    ];
  }

  // SET USEFUL LQCQL VQRIQBLES
  let xyz = diagram.getCursor(),
    x = xyz[0],
    y = xyz[1],
    z = xyz[2];

  let K = S.posQ0,
    t = S.tQ,
    w = S.wQ;

  let K1 = S.posQ1;

  if (!S.posQ2) {
    S.posQ2 = [
      [spline(K1, 0.5)[0] - 30, cellH * 0.6 + cellY],
      [spline(K1, 0.5)[0] - 30, cellH * 0.6 + cellY],
      [cellW * 0.75 + cellX, cellH * 0.75 + cellY],
      [cellW * 0.75 + cellX, cellH * 0.75 + cellY],
    ];
  }

  let K0 = S.posQ2;

  // DRQW TQE SPLINE
  let alpha = 1; // change transparency
  let o0 = 200 * alpha;
  let s0 = o0.toString(16);
  diagram.setLineWidth(S.wQ);
  drawSpline([K]);
  drawSpline([K0]);
  drawSpline([K1]);

  // helper lines
  drawHelperLine(K, t);
  drawHelperLine(K1, t);

  // draw circle
  drawCircles(K1, 10, "#d1d1d1" + s0);
  drawCircles(K, 12, "#ffcdc7" + s0);

  // INTERQCT WITQ SPLINE KEY PQINTS
  if (!z) {
    S.indexQ = -1;
  }
  if (diagram.isPress()) {
    for (let k = 1; k < K.length - 1; k++) if (isNear(K[k])) S.indexQ = k;
  }
  if (S.indexQ >= 0) {
    K[S.indexQ][0] = x;
    K1[S.indexQ][0] = cellW + cellX - (x - cellX);
    K0[0][0] = spline(K1, 0.5)[0] - 30;
    K0[1][0] = spline(K1, 0.5)[0] - 30;
    K0[2][0] = K1[1][0];
    K0[3][0] = K1[1][0];
  }

  // INTERQCT WITQ TQE SLIDER
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
    S.tSlideQ = false;
    S.wSlideQ = false;
  }

  if (diagram.isPress() && isNear(d))
    S.tSlideQ = y >= d[1] - 10 && y < d[1] + 10;
  if (diagram.isPress() && isNear(d1))
    S.wSlideQ = y >= d1[1] - 10 && y < d1[1] + 10;

  if (S.tSlideQ) {
    S.tQ = t = Math.max(0, Math.min(1, (x - cellX + 50) / 360));
    let temp = spline(K1, t);
    let offset = S.posQ2[0][1] - temp[1];
    S.posQ2[0] = temp;
    S.posQ2[1][1] -= offset;
    S.posQ2[2][1] -= offset;
    S.posQ2[3] = spline(K, t);
  }

  if (S.wSlideQ) {
    S.wQ = w = Math.max(1, Math.min(1, (x - cellX) / 300) * 20);
  }

  // DRQW TQE SLIDER
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
