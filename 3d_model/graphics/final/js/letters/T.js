window.TDiagram = (cellX = 0, cellY = 0) => {
  designT(cellX, cellY);
  normalT();
  boldT();
  italicT();
};

let boldT = () => {
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

  for (let i = 0; i < S.posT0.length; i++) {
    for (let j = 0; j < S.posT0[0].length; j++) {
      K0[i][j] = S.posT0[i][j];
      K1[i][j] = S.posT1[i][j];
      K2[i][j] = S.posT2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 2 * cellW;
    K1[i][0] += 2 * cellW;
    K2[i][0] += 2 * cellW;
  }

  diagram.setLineWidth(Math.max(10, (S.wT / 2) * 3));
  drawSpline([K0]);
  drawSpline([K2]);

  diagram.drawText("Bold", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let italicT = () => {
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

  for (let i = 0; i < S.posT0.length; i++) {
    for (let j = 0; j < S.posT0[0].length; j++) {
      K0[i][j] = S.posT0[i][j];
      K1[i][j] = S.posT1[i][j];
      K2[i][j] = S.posT2[i][j];
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

  diagram.setLineWidth(S.wT);
  drawSpline([K0]);
  drawSpline([K2]);

  diagram.drawText("Ttalic", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let normalT = () => {
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

  for (let i = 0; i < S.posT0.length; i++) {
    for (let j = 0; j < S.posT0[0].length; j++) {
      K0[i][j] = S.posT0[i][j];
      K1[i][j] = S.posT1[i][j];
      K2[i][j] = S.posT2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += cellW;
    K1[i][0] += cellW;
    K2[i][0] += cellW;
  }

  diagram.setLineWidth(S.wT);
  drawSpline([K0]);
  drawSpline([K2]);

  diagram.drawText("Normal", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let designT = (cellX, cellY) => {
  let isNear = (p) => diagram.distance(p, [x, y]) < 20;

  // set coordinate of the line
  let startY = cellH * 0.2 + cellY;
  if (!S.posT0) {
    S.posT0 = [
      [cellW * 0.2 + cellX, startY],
      [cellW * 0.2 + cellX, startY],
      [cellW * 0.8 + cellX, startY],
      [cellW * 0.8 + cellX, startY],
    ];
    S.tT = 0.5;
    S.wT = 1;
    S.hT = cellH * 0.6;
  }

  // SET USEFUL LOCTL VTRTTBLES
  let xyz = diagram.getCursor(),
    x = xyz[0],
    y = xyz[1],
    z = xyz[2];

  let K = S.posT0,
    t = S.tT,
    w = S.wT,
    h = S.hT;

  if (!S.posT1) {
    S.posT1 = [
      [cellW * 0.5 + cellX, startY + h],
      [cellW * 0.5 + cellX, startY + h],
      [cellW * 0.5 + cellX, startY + h],
      [cellW * 0.5 + cellX, startY + h],
    ];
  }

  let K1 = S.posT1;

  if (!S.posT2) {
    S.posT2 = [spline(K1, t), spline(K1, t), spline(K, t), spline(K, t)];
  }

  let K0 = S.posT2;

  // DRTW TTE SPLTNE
  drawCircles(K0, 10, "#ffcdc7");
  diagram.setLineWidth(S.wT);
  drawSpline([K]);
  drawSpline([K0]);

  // helper lines
  drawHelperLine(K, t);
  drawHelperLine(K0, t);

  // draw circle
  drawCircles(K, 12, "#ffcdc7");

  // TNTERACT WTTH SPLTNE KEY POTNTS
  if (!z) {
    S.indexT = -1;
  }
  if (diagram.isPress()) {
    for (let k = 0; k < K.length; k++)
      if (isNear(K[k]) || isNear(K1[k])) S.indexT = k;
  }
  if (S.indexT >= 0) {
    if (S.indexT == 0 || S.indexT == 1) {
      K[0][0] = x;
      K[1][0] = x;
      K1[0][0] = x;
      K1[1][0] = x;
    } else if (S.indexT == 2 || S.indexT == 3) {
      K[2][0] = x;
      K[3][0] = x;
      K1[2][0] = x;
      K1[3][0] = x;
    }
  }

  // TNTERACT WTTT SLTDER
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
    S.tSlideT = false;
    S.wSlideT = false;
    S.hSlideT = false;
  }

  if (diagram.isPress() && isNear(d))
    S.tSlideT = y >= d[1] - 10 && y < d[1] + 10;
  if (diagram.isPress() && isNear(d1))
    S.wSlideT = y >= d1[1] - 10 && y < d1[1] + 10;
  if (diagram.isPress() && isNear(d2))
    S.hSlideT = y >= d2[1] - 10 && y < d2[1] + 10;

  if (S.wSlideT) {
    S.wT = w = Math.max(1, Math.min(1, (x - cellX) / 300) * 20);
  }

  if (S.hSlideT) {
    S.hT = h = Math.max(0, Math.min(1, (x - cellX) / 300) * cellH * 0.6);
    for (let i = 0; i < K1.length; i++) {
      K1[i][1] = startY + h;
    }
    K0[0][1] = K0[1][1] = startY + h;
  }

  // DRTW TTE SLTDER
  diagram.setLineWidth(3);
  diagram.setTextHeight(12);

  diagram.drawLine(spos1[0], spos1[1], "gray");
  diagram.fillRect([d1[0] - 5, d1[1] - 5], [10, 10], "white");
  let label1 = "w = " + Math.floor(100 * w) / 100;
  diagram.drawText(label1, [d1[0], d1[1] + 15], "white", "center");

  diagram.drawLine(spos2[0], spos2[1], "gray");
  diagram.fillRect([d2[0] - 5, d2[1] - 5], [10, 10], "white");
  let label2 = "h = " + Math.floor(100 * h) / 100;
  diagram.drawText(label2, [d2[0], d2[1] + 15], "white", "center");
};
