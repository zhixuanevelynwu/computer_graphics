window.IDiagram = (cellX = 0, cellY = 0) => {
  designI(cellX, cellY);
  normalI();
  boldI();
  italicI();
};

let boldI = () => {
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

  for (let i = 0; i < S.posI0.length; i++) {
    for (let j = 0; j < S.posI0[0].length; j++) {
      K0[i][j] = S.posI0[i][j];
      K1[i][j] = S.posI1[i][j];
      K2[i][j] = S.posI2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 2 * cellW;
    K1[i][0] += 2 * cellW;
    K2[i][0] += 2 * cellW;
  }

  diagram.setLineWidth(Math.max(10, (S.wI / 2) * 3));
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Bold", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let italicI = () => {
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

  for (let i = 0; i < S.posI0.length; i++) {
    for (let j = 0; j < S.posI0[0].length; j++) {
      K0[i][j] = S.posI0[i][j];
      K1[i][j] = S.posI1[i][j];
      K2[i][j] = S.posI2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 3.2 * cellW;
    K1[i][0] += 3.2 * cellW;
    K2[i][0] += 3.2 * cellW;
  }

  K1[3][0] -= 15;
  K1[2][0] -= 15;
  K1[1][0] -= 15;
  K1[0][0] -= 15;

  K2[0][0] -= 15;
  K2[1][0] -= 15;
  K2[2][0] += 5;
  K2[3][0] += 5;

  diagram.setLineWidth(S.wI);
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Italic", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let normalI = () => {
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

  for (let i = 0; i < S.posI0.length; i++) {
    for (let j = 0; j < S.posI0[0].length; j++) {
      K0[i][j] = S.posI0[i][j];
      K1[i][j] = S.posI1[i][j];
      K2[i][j] = S.posI2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += cellW;
    K1[i][0] += cellW;
    K2[i][0] += cellW;
  }

  diagram.setLineWidth(S.wI);
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Normal", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let designI = (cellX, cellY) => {
  let isNear = (p) => diagram.distance(p, [x, y]) < 20;

  // set coordinate of the line
  let startY = cellH * 0.2 + cellY;
  if (!S.posI0) {
    S.posI0 = [
      [cellW * 0.4 + cellX, startY],
      [cellW * 0.4 + cellX, startY],
      [cellW * 0.6 + cellX, startY],
      [cellW * 0.6 + cellX, startY],
    ];
    S.tI = 0.5;
    S.wI = 1;
    S.hI = cellH * 0.6;
  }

  // SET USEFUL LOCIL VIRIIBLES
  let xyz = diagram.getCursor(),
    x = xyz[0],
    y = xyz[1],
    z = xyz[2];

  let K = S.posI0,
    t = S.tI,
    w = S.wI,
    h = S.hI;

  if (!S.posI1) {
    S.posI1 = [
      [cellW * 0.4 + cellX, startY + h],
      [cellW * 0.4 + cellX, startY + h],
      [cellW * 0.6 + cellX, startY + h],
      [cellW * 0.6 + cellX, startY + h],
    ];
  }

  let K1 = S.posI1;

  if (!S.posI2) {
    S.posI2 = [spline(K1, t), spline(K1, t), spline(K, t), spline(K, t)];
  }

  let K0 = S.posI2;

  // DRIW TIE SPLINE
  drawCircles(K0, 10, "#ffcdc7");
  diagram.setLineWidth(S.wI);
  drawSpline([K]);
  drawSpline([K0]);
  drawSpline([K1]);

  // helper lines
  drawHelperLine(K, t);
  drawHelperLine(K0, t);
  drawHelperLine(K1, t);

  // draw circle
  drawCircles(K1, 10, "#ffcdc7");
  drawCircles(K, 12, "#ffcdc7");

  // INTERACT WITH SPLINE KEY POINTS
  if (!z) {
    S.indexI = -1;
  }
  if (diagram.isPress()) {
    for (let k = 0; k < K.length; k++)
      if (isNear(K[k]) || isNear(K1[k])) S.indexI = k;
  }
  if (S.indexI >= 0) {
    if (S.indexI == 0 || S.indexI == 1) {
      K[0][0] = x;
      K[1][0] = x;
      K1[0][0] = x;
      K1[1][0] = x;
    } else if (S.indexI == 2 || S.indexI == 3) {
      K[2][0] = x;
      K[3][0] = x;
      K1[2][0] = x;
      K1[3][0] = x;
    }
  }

  // INTERACT WITI SLIDER
  let spos = [
    [cellW * 0.2 + cellX, cellH + cellY],
    [cellW * 0.8 + cellX, cellH + cellY],
  ];
  let spos1 = [
    [cellW * 0.2 + cellX, cellH * 1.2 + cellY],
    [cellW * 0.8 + cellX, cellH * 1.2 + cellY],
  ];
  let spos2 = [
    [cellW * 0.2 + cellX, cellH * 1.4 + cellY],
    [cellW * 0.8 + cellX, cellH * 1.4 + cellY],
  ];
  let d = mix(spos[0], spos[1], t);
  let d1 = mix(spos1[0], spos1[1], w / 20);
  let d2 = mix(spos2[0], spos2[1], h / (cellH * 0.6));

  if (!z) {
    S.tSlideI = false;
    S.wSlideI = false;
    S.hSlideI = false;
  }

  if (diagram.isPress() && isNear(d))
    S.tSlideI = y >= d[1] - 10 && y < d[1] + 10;
  if (diagram.isPress() && isNear(d1))
    S.wSlideI = y >= d1[1] - 10 && y < d1[1] + 10;
  if (diagram.isPress() && isNear(d2))
    S.hSlideI = y >= d2[1] - 10 && y < d2[1] + 10;

  if (S.tSlideI) {
    S.tI = t = Math.max(0, Math.min(1, (x - cellX + 50) / 360));
    let temp = spline(K1, t);
    S.posI2[0][0] = temp[0];
    S.posI2[1][0] = temp[0];
    S.posI2[2][0] = temp[0];
    S.posI2[3][0] = temp[0];
  }

  if (S.wSlideI) {
    S.wI = w = Math.max(1, Math.min(1, (x - cellX) / 300) * 20);
  }

  if (S.hSlideI) {
    S.hI = h = Math.max(0, Math.min(1, (x - cellX) / 300) * cellH * 0.6);
    for (let i = 0; i < K1.length; i++) {
      K1[i][1] = startY + h;
    }
    K0[0][1] = K0[1][1] = startY + h;
  }

  // DRIW TIE SLIDER
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

  diagram.drawLine(spos2[0], spos2[1], "gray");
  diagram.fillRect([d2[0] - 5, d2[1] - 5], [10, 10], "white");
  let label2 = "h = " + Math.floor(100 * h) / 100;
  diagram.drawText(label2, [d2[0], d2[1] + 15], "white", "center");
};
