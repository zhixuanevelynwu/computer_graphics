window.LDiagram = (cellX = 0, cellY = 0) => {
  designL(cellX, cellY);
  normalL();
  boldL();
  italicL();
};

let boldL = () => {
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

  for (let i = 0; i < S.posL1.length; i++) {
    for (let j = 0; j < S.posL1[0].length; j++) {
      K1[i][j] = S.posL1[i][j];
      K2[i][j] = S.posL2[i][j];
    }
  }

  for (let i = 0; i < K1.length; i++) {
    K1[i][0] += 2 * cellW;
    K2[i][0] += 2 * cellW;
  }

  diagram.setLineWidth(Math.max(10, (S.wL / 2) * 3));
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Bold", [K2[3][0], K2[0][1] - 45], "grey", "center");
};

let italicL = () => {
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

  for (let i = 0; i < S.posL1.length; i++) {
    for (let j = 0; j < S.posL1[0].length; j++) {
      K1[i][j] = S.posL1[i][j];
      K2[i][j] = S.posL2[i][j];
    }
  }

  for (let i = 0; i < K1.length; i++) {
    K1[i][0] += 3.2 * cellW;
    K2[i][0] += 3.2 * cellW;
  }

  K2[0][0] += 15;
  K2[1][0] += 15;

  diagram.setLineWidth(S.wL);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Ltalic", [K2[3][0], K2[0][1] - 45], "grey", "center");
};

let normalL = () => {
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

  for (let i = 0; i < S.posL1.length; i++) {
    for (let j = 0; j < S.posL1[0].length; j++) {
      K1[i][j] = S.posL1[i][j];
      K2[i][j] = S.posL2[i][j];
    }
  }

  for (let i = 0; i < K1.length; i++) {
    K1[i][0] += cellW;
    K2[i][0] += cellW;
  }

  diagram.setLineWidth(S.wL);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Normal", [K2[3][0], K2[0][1] - 45], "grey", "center");
};

let designL = (cellX, cellY) => {
  let isNear = (p) => diagram.distance(p, [x, y]) < 20;

  // set coordinate of the line
  let startY = cellH * 0.2 + cellY;

  // SET USEFUL LOCLL VLRLLBLES
  let xyz = diagram.getCursor(),
    x = xyz[0],
    y = xyz[1],
    z = xyz[2];

  if (!S.posL1) {
    S.wL = w = 1;
    S.hL = h = cellH * 0.6;
    (S.posL1 = [
      [cellW * 0.4 + cellX, startY + h],
      [cellW * 0.4 + cellX, startY + h],
      [cellW * 0.8 + cellX, startY + h],
      [cellW * 0.8 + cellX, startY + h],
    ]),
      (S.tL = 0.5);
  }

  let K1 = S.posL1;

  let t = 0;

  if (!S.posL2) {
    S.posL2 = [
      [cellW * 0.4 + cellX, cellY + cellH * 0.2],
      [cellW * 0.4 + cellX, cellY + cellH * 0.2],
      spline(K1, t),
      spline(K1, t),
    ];
  }

  let K0 = S.posL2;

  // DRLW TLE SPLLNE
  drawCircles(K0, 10, "#ffcdc7");
  diagram.setLineWidth(S.wL);
  drawSpline([K0]);
  drawSpline([K1]);

  // helper lines
  drawHelperLine(K0, t);
  drawHelperLine(K1, t);

  // draw circle
  drawCircles(K1, 10, "#ffcdc7");

  // LNTERACT WLTH SPLLNE KEY POLNTS
  if (!z) {
    S.indexL = -1;
  }
  if (diagram.isPress()) {
    for (let k = 0; k < K1.length; k++) if (isNear(K1[k])) S.indexL = k;
  }
  if (S.indexL >= 0) {
    if (S.indexL == 0 || S.indexL == 1) {
      K1[0][0] = x;
      K1[1][0] = x;
      K0[2][0] = x;
      K0[3][0] = x;
    } else if (S.indexL == 2 || S.indexL == 3) {
      K1[2][0] = x;
      K1[3][0] = x;
    }
  }

  // LNTERACT WLTL SLLDER
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
    S.tSlideL = false;
    S.wSlideL = false;
    S.hSlideL = false;
  }

  if (diagram.isPress() && isNear(d))
    S.tSlideL = y >= d[1] - 10 && y < d[1] + 10;
  if (diagram.isPress() && isNear(d1))
    S.wSlideL = y >= d1[1] - 10 && y < d1[1] + 10;
  if (diagram.isPress() && isNear(d2))
    S.hSlideL = y >= d2[1] - 10 && y < d2[1] + 10;

  if (S.tSlideL) {
    S.tL = t = Math.max(0, Math.min(1, (x - cellX + 50) / 360));
    let temp = spline(K1, t);
    S.posL2[0][0] = temp[0];
    S.posL2[1][0] = temp[0];
    S.posL2[2][0] = temp[0];
    S.posL2[3][0] = temp[0];
  }

  if (S.wSlideL) {
    S.wL = w = Math.max(1, Math.min(1, (x - cellX) / 300) * 20);
  }

  if (S.hSlideL) {
    S.hL = h = Math.max(0, Math.min(1, (x - cellX) / 300) * cellH * 0.6);
    K0[0][1] = K0[1][1] = startY + h;
  }

  // DRLW TLE SLLDER
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
