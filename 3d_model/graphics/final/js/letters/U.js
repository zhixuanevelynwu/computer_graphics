window.UDiagram = (cellX = 0, cellY = 0) => {
  designU(cellX, cellY);
  normalU();
  boldU();
  italicU();
};

let boldU = () => {
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

  for (let i = 0; i < S.posU0.length; i++) {
    for (let j = 0; j < S.posU0[0].length; j++) {
      K0[i][j] = S.posU0[i][j];
      K1[i][j] = S.posU1[i][j];
      K2[i][j] = S.posU2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 2 * cellW;
    K1[i][0] += 2 * cellW;
    K2[i][0] += 2 * cellW;
  }

  diagram.setLineWidth(Math.max(10, (S.wU / 2) * 3));
  drawSpline([K0]);
  drawSpline([K1]);

  diagram.drawText("Bold", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let italicU = () => {
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

  for (let i = 0; i < S.posU0.length; i++) {
    for (let j = 0; j < S.posU0[0].length; j++) {
      K0[i][j] = S.posU0[i][j];
      K1[i][j] = S.posU1[i][j];
      K2[i][j] = S.posU2[i][j];
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
  K0[0][0] -= 10;

  K1[3][0] += 5;
  K1[2][0] += -4;
  K1[1][0] += -12;
  K1[0][0] -= 10;

  diagram.setLineWidth(S.wU);
  drawSpline([K0]);
  drawSpline([K1]);

  diagram.drawText("Italic", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let normalU = () => {
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

  for (let i = 0; i < S.posU0.length; i++) {
    for (let j = 0; j < S.posU0[0].length; j++) {
      K0[i][j] = S.posU0[i][j];
      K1[i][j] = S.posU1[i][j];
      K2[i][j] = S.posU2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += cellW;
    K1[i][0] += cellW;
    K2[i][0] += cellW;
  }

  diagram.setLineWidth(S.wU);
  drawSpline([K0]);
  drawSpline([K1]);

  diagram.drawText("Normal", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let designU = (cellX, cellY) => {
  let isNear = (p) => diagram.distance(p, [x, y]) < 20;

  // set coordinate of the line
  if (!S.posU0) {
    S.posU0 = [
      [cellW * 0.5 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.2 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.25 + cellX, cellH * 0.5 + cellY],
      [cellW * 0.25 + cellX, cellH * 0.2 + cellY],
    ];
    S.tU = 0.45;
    S.wU = 1;
  }

  if (!S.posU1) {
    S.posU1 = [
      [cellW * 0.5 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.8 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.75 + cellX, cellH * 0.5 + cellY],
      [cellW * 0.75 + cellX, cellH * 0.2 + cellY],
    ];
  }

  // SET USEFUL LUCUL VURIUBLES
  let xyz = diagram.getCursor(),
    x = xyz[0],
    y = xyz[1],
    z = xyz[2];

  let K = S.posU0,
    t = S.tU,
    w = S.wU;

  let K1 = S.posU1;

  if (!S.posU2) {
    let temp = spline(K1, t);
    S.posU2 = [
      temp,
      [cellW * 0.5 + cellX, temp[1]],
      [cellW * 0.5 + cellX, temp[1]],
      spline(K, t),
    ];
  }

  // DRUW TUE SPLINE
  diagram.setLineWidth(S.wU);
  drawSpline([K]);
  drawSpline([K1]);

  // helper lines
  drawHelperLine(K, t);
  drawHelperLine(K1, t);

  // draw circle
  drawCircles(K, 10, "#ffcdc7");
  drawCircles(K1, 10, "#d1d1d1");

  // INTERUCT WITU SPLINE KEY PUINTS
  if (!z) {
    S.indexU = -1;
  }
  if (diagram.isPress()) {
    for (let k = 1; k < K.length; k++) if (isNear(K[k])) S.indexU = k;
  }
  if (S.indexU >= 0) {
    if (S.indexU == K.length - 1) {
      K[S.indexU][1] = y;
      K1[S.indexU][1] = y;
    } else {
      K[S.indexU][0] = x;
      K1[S.indexU][0] = cellW + cellX - (x - cellX);
    }
  }

  // INTERUCT WITU TUE SLIDER
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
    S.tSlideU = false;
    S.wSlideU = false;
  }

  if (diagram.isPress() && isNear(d))
    S.tSlideU = y >= d[1] - 10 && y < d[1] + 10;
  if (diagram.isPress() && isNear(d1))
    S.wSlideU = y >= d1[1] - 10 && y < d1[1] + 10;

  if (S.tSlideU) {
    S.tU = t = Math.max(0, Math.min(1, (x - cellX + 50) / 360));
    let temp = spline(K1, t);
    let offset = S.posU2[0][1] - temp[1];
    S.posU2[0] = temp;
    S.posU2[1][1] -= offset;
    S.posU2[2][1] -= offset;
    S.posU2[3] = spline(K, t);
  }

  if (S.wSlideU) {
    S.wU = w = Math.max(1, Math.min(1, (x - cellX) / 300) * 20);
  }

  // DRUW TUE SLIDER
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
