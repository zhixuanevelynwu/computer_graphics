window.MDiagram = (cellX = 0, cellY = 0) => {
  designM(cellX, cellY);
  normalM();
  boldM();
  italicM();
};

let boldM = () => {
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

  for (let i = 0; i < S.posM0.length; i++) {
    for (let j = 0; j < S.posM0[0].length; j++) {
      K0[i][j] = S.posM0[i][j];
      K1[i][j] = S.posM1[i][j];
      K2[i][j] = S.posM2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 2 * cellW;
    K1[i][0] += 2 * cellW;
    K2[i][0] += 2 * cellW;
  }

  diagram.setLineWidth(Math.max(10, (S.wM / 2) * 3));
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Bold", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let italicM = () => {
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

  for (let i = 0; i < S.posM0.length; i++) {
    for (let j = 0; j < S.posM0[0].length; j++) {
      K0[i][j] = S.posM0[i][j];
      K1[i][j] = S.posM1[i][j];
      K2[i][j] = S.posM2[i][j];
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
  K1[0][0] += -22;

  K2[0] = spline(K1, S.tM);
  K2[1][0] -= 11;
  K2[2][0] -= 11;
  K2[3] = spline(K0, S.tM);

  diagram.setLineWidth(S.wM);
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Italic", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let normalM = () => {
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

  for (let i = 0; i < S.posM0.length; i++) {
    for (let j = 0; j < S.posM0[0].length; j++) {
      K0[i][j] = S.posM0[i][j];
      K1[i][j] = S.posM1[i][j];
      K2[i][j] = S.posM2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += cellW;
    K1[i][0] += cellW;
    K2[i][0] += cellW;
  }

  diagram.setLineWidth(S.wM);
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Normal", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let designM = (cellX, cellY) => {
  let isNear = (p) => diagram.distance(p, [x, y]) < 20;

  // set coordinate of the line
  if (!S.posM0) {
    S.posM0 = [
      [cellW * 0.2 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.2 + cellX, cellH * 0.6 + cellY],
      [cellW * 0.2 + cellX, cellH * 0.4 + cellY],
      [cellW * 0.2 + cellX, cellH * 0.2 + cellY],
    ];
    S.tM = 1;
    S.wM = 1;
  }

  if (!S.posM1) {
    S.posM1 = [
      [cellW * 0.8 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.8 + cellX, cellH * 0.6 + cellY],
      [cellW * 0.8 + cellX, cellH * 0.4 + cellY],
      [cellW * 0.8 + cellX, cellH * 0.2 + cellY],
    ];
  }

  // SET USEFUL LOCML VMRIMBLES
  let xyz = diagram.getCursor(),
    x = xyz[0],
    y = xyz[1],
    z = xyz[2];

  let K = S.posM0,
    t = S.tM,
    w = S.wM;

  let K1 = S.posM1;

  if (!S.posM2) {
    S.posM2 = [
      K[3],
      [cellW * 0.5 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.5 + cellX, cellH * 0.8 + cellY],
      K1[3],
    ];
  }

  let K0 = S.posM2;

  // DRMW TME SPLINE
  let alpha = 1; // change transparency
  let o0 = 200 * alpha;
  let s0 = o0.toString(16);
  drawCircles(K0, 10, "#ffcdc7" + s0);
  diagram.setLineWidth(S.wM);
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

  // INTERMCT WITM SPLINE KEY POINTS
  if (!z) {
    S.indexM = -1;
    S.indexM0 = -1;
  }
  if (diagram.isPress()) {
    for (let k = 0; k < K.length; k++) if (isNear(K[k])) S.indexM = k;
    if (isNear(K0[1]) || isNear(K0[2])) S.indexM0 = 1;
  }
  if (S.indexM >= 0) {
    K[S.indexM] = [x, y];
    K0[0] = spline(K1, t);
    K0[3] = spline(K, t);
    K1[S.indexM] = [cellW + cellX - (x - cellX), y];
  }
  if (S.indexM0 >= 0) {
    if (y >= cellY + cellH * 0.25) {
      K0[1][1] = y;
      K0[2][1] = y;
    }
  }

  // INTERMCT WITM TME SLIDER
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
    S.tSlideM = false;
    S.wSlideM = false;
  }

  if (diagram.isPress() && isNear(d))
    S.tSlideM = y >= d[1] - 10 && y < d[1] + 10;
  if (diagram.isPress() && isNear(d1))
    S.wSlideM = y >= d1[1] - 10 && y < d1[1] + 10;

  if (S.wSlideM) {
    S.wM = w = Math.max(1, Math.min(1, (x - cellX) / 300) * 20);
  }

  // DRMW TME SLIDER
  diagram.setLineWidth(3);
  diagram.setTextHeight(12);

  diagram.drawLine(spos1[0], spos1[1], "gray");
  diagram.fillRect([d1[0] - 5, d1[1] - 5], [10, 10], "white");
  let label1 = "w = " + Math.floor(100 * w) / 100;
  diagram.drawText(label1, [d1[0], d1[1] + 15], "white", "center");
};
