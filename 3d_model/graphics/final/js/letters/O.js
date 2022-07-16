window.ODiagram = (cellX = 0, cellY = 0) => {
  designO(cellX, cellY);
  normalO();
  boldO();
  italicO();
};

let boldO = () => {
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

  for (let i = 0; i < S.posO0.length; i++) {
    for (let j = 0; j < S.posO0[0].length; j++) {
      K0[i][j] = S.posO0[i][j];
      K1[i][j] = S.posO1[i][j];
      K2[i][j] = S.posO2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 2 * cellW;
    K1[i][0] += 2 * cellW;
    K2[i][0] += 2 * cellW;
  }

  diagram.setLineWidth(Math.max(10, (S.wO / 2) * 3));
  drawSpline([K0]);
  drawSpline([K1]);

  diagram.drawText("Bold", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let italicO = () => {
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

  for (let i = 0; i < S.posO0.length; i++) {
    for (let j = 0; j < S.posO0[0].length; j++) {
      K0[i][j] = S.posO0[i][j];
      K1[i][j] = S.posO1[i][j];
      K2[i][j] = S.posO2[i][j];
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

  diagram.setLineWidth(S.wO);
  drawSpline([K0]);
  drawSpline([K1]);

  diagram.drawText("Italic", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let normalO = () => {
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

  for (let i = 0; i < S.posO0.length; i++) {
    for (let j = 0; j < S.posO0[0].length; j++) {
      K0[i][j] = S.posO0[i][j];
      K1[i][j] = S.posO1[i][j];
      K2[i][j] = S.posO2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += cellW;
    K1[i][0] += cellW;
    K2[i][0] += cellW;
  }

  diagram.setLineWidth(S.wO);
  drawSpline([K0]);
  drawSpline([K1]);

  diagram.drawText("Normal", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let designO = (cellX, cellY) => {
  let isNear = (p) => diagram.distance(p, [x, y]) < 20;

  // set coordinate of the line
  if (!S.posO0) {
    S.posO0 = [
      [cellW * 0.5 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.2 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.2 + cellX, cellH * 0.2 + cellY],
      [cellW * 0.5 + cellX, cellH * 0.2 + cellY],
    ];
    S.tO = 0.45;
    S.wO = 1;
  }

  if (!S.posO1) {
    S.posO1 = [
      [cellW * 0.5 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.8 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.8 + cellX, cellH * 0.2 + cellY],
      [cellW * 0.5 + cellX, cellH * 0.2 + cellY],
    ];
  }

  // SET USEFUL LOCOL VORIOBLES
  let xyz = diagram.getCursor(),
    x = xyz[0],
    y = xyz[1],
    z = xyz[2];

  let K = S.posO0,
    t = S.tO,
    w = S.wO;

  let K1 = S.posO1;

  if (!S.posO2) {
    let temp = spline(K1, t);
    S.posO2 = [
      temp,
      [cellW * 0.5 + cellX, temp[1]],
      [cellW * 0.5 + cellX, temp[1]],
      spline(K, t),
    ];
  }

  let K0 = S.posO2;

  // DROW TOE SPLINE
  let alpha = 1; // change transparency
  let o0 = 200 * alpha;
  let s0 = o0.toString(16);
  diagram.setLineWidth(S.wO);
  drawSpline([K]);
  drawSpline([K1]);

  // helper lines
  drawHelperLine(K, t);
  drawHelperLine(K1, t);

  // draw circle
  drawCircles(K1, 10, "#d1d1d1" + s0);
  drawCircles(K, 12, "#ffcdc7" + s0);

  // INTEROCT WITO SPLINE KEY POINTS
  if (!z) {
    S.indexO = -1;
  }
  if (diagram.isPress()) {
    for (let k = 1; k < K.length - 1; k++) if (isNear(K[k])) S.indexO = k;
  }
  if (S.indexO >= 0) {
    K[S.indexO][0] = x;
    K1[S.indexO][0] = cellW + cellX - (x - cellX);
  }

  // INTEROCT WITO TOE SLIDER
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
    S.tSlideO = false;
    S.wSlideO = false;
  }

  if (diagram.isPress() && isNear(d))
    S.tSlideO = y >= d[1] - 10 && y < d[1] + 10;
  if (diagram.isPress() && isNear(d1))
    S.wSlideO = y >= d1[1] - 10 && y < d1[1] + 10;

  if (S.tSlideO) {
    S.tO = t = Math.max(0, Math.min(1, (x - cellX + 50) / 360));
    let temp = spline(K1, t);
    let offset = S.posO2[0][1] - temp[1];
    S.posO2[0] = temp;
    S.posO2[1][1] -= offset;
    S.posO2[2][1] -= offset;
    S.posO2[3] = spline(K, t);
  }

  if (S.wSlideO) {
    S.wO = w = Math.max(1, Math.min(1, (x - cellX) / 300) * 20);
  }

  // DROW TOE SLIDER
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
