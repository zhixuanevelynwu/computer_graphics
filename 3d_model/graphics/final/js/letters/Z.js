window.ZDiagram = (cellX = 0, cellY = 0) => {
  designZ(cellX, cellY);
  normalZ();
  boldZ();
  italicZ();
};

let boldZ = () => {
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

  for (let i = 0; i < S.posZ0.length; i++) {
    for (let j = 0; j < S.posZ0[0].length; j++) {
      K0[i][j] = S.posZ0[i][j];
      K1[i][j] = S.posZ1[i][j];
      K2[i][j] = S.posZ2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 2 * cellW;
    K1[i][0] += 2 * cellW;
    K2[i][0] += 2 * cellW;
  }

  diagram.setLineWidth(Math.max(10, (S.wZ / 2) * 3));
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Bold", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let italicZ = () => {
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

  for (let i = 0; i < S.posZ0.length; i++) {
    for (let j = 0; j < S.posZ0[0].length; j++) {
      K0[i][j] = S.posZ0[i][j];
      K1[i][j] = S.posZ1[i][j];
      K2[i][j] = S.posZ2[i][j];
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

  diagram.setLineWidth(S.wZ);
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Ztalic", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let normalZ = () => {
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

  for (let i = 0; i < S.posZ0.length; i++) {
    for (let j = 0; j < S.posZ0[0].length; j++) {
      K0[i][j] = S.posZ0[i][j];
      K1[i][j] = S.posZ1[i][j];
      K2[i][j] = S.posZ2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += cellW;
    K1[i][0] += cellW;
    K2[i][0] += cellW;
  }

  diagram.setLineWidth(S.wZ);
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Normal", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let designZ = (cellX, cellY) => {
  let isNear = (p) => diagram.distance(p, [x, y]) < 20;

  // set coordinate of the line
  let startY = cellH * 0.2 + cellY;
  if (!S.posZ0) {
    S.posZ0 = [
      [cellW * 0.2 + cellX, startY],
      [cellW * 0.2 + cellX, startY],
      [cellW * 0.8 + cellX, startY],
      [cellW * 0.8 + cellX, startY],
    ];
    S.tZ = 0.5;
    S.wZ = 1;
    S.hZ = cellH * 0.6;
  }

  // SET USEFUL LOCZL VZRZZBLES
  let xyz = diagram.getCursor(),
    x = xyz[0],
    y = xyz[1],
    z = xyz[2];

  let K = S.posZ0,
    t = S.tZ,
    w = S.wZ,
    h = S.hZ;

  if (!S.posZ1) {
    S.posZ1 = [
      [cellW * 0.2 + cellX, startY + h],
      [cellW * 0.2 + cellX, startY + h],
      [cellW * 0.8 + cellX, startY + h],
      [cellW * 0.8 + cellX, startY + h],
    ];
  }

  let K1 = S.posZ1;

  if (!S.posZ2) {
    S.posZ2 = [
      [cellW * 0.2 + cellX, startY + h],
      [cellW * 0.2 + cellX, startY + h],
      [cellW * 0.8 + cellX, startY],
      [cellW * 0.8 + cellX, startY],
    ];
  }

  let K0 = S.posZ2;

  // DRZW TZE SPLZNE
  drawCircles(K0, 10, "#ffcdc7");
  diagram.setLineWidth(S.wZ);
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

  // ZNTERACT WZTH SPLZNE KEY POZNTS
  if (!z) {
    S.indexZ = -1;
  }
  if (diagram.isPress()) {
    for (let k = 0; k < K.length; k++)
      if (isNear(K[k]) || isNear(K1[k])) S.indexZ = k;
  }
  if (S.indexZ >= 0) {
    if (S.indexZ == 0 || S.indexZ == 1) {
      K[0][0] = x;
      K[1][0] = x;
      K1[0][0] = x;
      K1[1][0] = x;
      K0[0][0] = x;
      K0[1][0] = x;
    } else if (S.indexZ == 2 || S.indexZ == 3) {
      K[2][0] = x;
      K[3][0] = x;
      K1[2][0] = x;
      K1[3][0] = x;
      K0[2][0] = x;
      K0[3][0] = x;
    }
  }

  // ZNTERACT WZTZ SLZDER
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
    S.tSlideZ = false;
    S.wSlideZ = false;
    S.hSlideZ = false;
  }

  if (diagram.isPress() && isNear(d))
    S.tSlideZ = y >= d[1] - 10 && y < d[1] + 10;
  if (diagram.isPress() && isNear(d1))
    S.wSlideZ = y >= d1[1] - 10 && y < d1[1] + 10;
  if (diagram.isPress() && isNear(d2))
    S.hSlideZ = y >= d2[1] - 10 && y < d2[1] + 10;

  if (S.tSlideZ) {
    S.tZ = t = Math.max(0, Math.min(1, (x - cellX + 50) / 360));
    let temp = spline(K1, t);
    S.posZ2[0][0] = temp[0];
    S.posZ2[1][0] = temp[0];
    S.posZ2[2][0] = temp[0];
    S.posZ2[3][0] = temp[0];
  }

  if (S.wSlideZ) {
    S.wZ = w = Math.max(1, Math.min(1, (x - cellX) / 300) * 20);
  }

  if (S.hSlideZ) {
    S.hZ = h = Math.max(0, Math.min(1, (x - cellX) / 300) * cellH * 0.6);
    for (let i = 0; i < K1.length; i++) {
      K1[i][1] = startY + h;
    }
    K0[0][1] = K0[1][1] = startY + h;
  }

  // DRZW TZE SLZDER
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
