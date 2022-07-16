window.VDiagram = (cellX = 0, cellY = 0) => {
  designV(cellX, cellY);
  normalV();
  boldV();
  italicV();
};

let boldV = () => {
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

  for (let i = 0; i < S.posV0.length; i++) {
    for (let j = 0; j < S.posV0[0].length; j++) {
      K0[i][j] = S.posV0[i][j];
      K1[i][j] = S.posV1[i][j];
      K2[i][j] = S.posV2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 2 * cellW;
    K1[i][0] += 2 * cellW;
    K2[i][0] += 2 * cellW;
  }

  diagram.setLineWidth(Math.max(10, (S.wV / 2) * 3));
  drawSpline([K0]);
  drawSpline([K1]);

  diagram.drawText("Bold", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let italicV = () => {
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

  for (let i = 0; i < S.posV0.length; i++) {
    for (let j = 0; j < S.posV0[0].length; j++) {
      K0[i][j] = S.posV0[i][j];
      K1[i][j] = S.posV1[i][j];
      K2[i][j] = S.posV2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 3.2 * cellW;
    K1[i][0] += 3.2 * cellW;
    K2[i][0] += 3.2 * cellW;
  }

  K0[3][0] += 5;
  K0[2][0] += 4;
  K0[1][0] -= 12;
  K0[0][0] -= 12;

  K1[3][0] += 5;
  K1[2][0] += 5;
  K1[1][0] += -12;
  K1[0][0] -= 12;

  diagram.setLineWidth(S.wV);
  drawSpline([K0]);
  drawSpline([K1]);

  diagram.drawText("Italic", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let normalV = () => {
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

  for (let i = 0; i < S.posV0.length; i++) {
    for (let j = 0; j < S.posV0[0].length; j++) {
      K0[i][j] = S.posV0[i][j];
      K1[i][j] = S.posV1[i][j];
      K2[i][j] = S.posV2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += cellW;
    K1[i][0] += cellW;
    K2[i][0] += cellW;
  }

  diagram.setLineWidth(S.wV);
  drawSpline([K0]);
  drawSpline([K1]);

  diagram.drawText("Normal", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let designV = (cellX, cellY) => {
  let isNear = (p) => diagram.distance(p, [x, y]) < 20;

  // set coordinate of the line
  if (!S.posV0) {
    S.posV0 = [
      [cellW * 0.5 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.5 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.25 + cellX, cellH * 0.2 + cellY],
      [cellW * 0.25 + cellX, cellH * 0.2 + cellY],
    ];
    S.tV = 0.45;
    S.wV = 1;
  }

  if (!S.posV1) {
    S.posV1 = [
      [cellW * 0.5 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.5 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.75 + cellX, cellH * 0.2 + cellY],
      [cellW * 0.75 + cellX, cellH * 0.2 + cellY],
    ];
  }

  // SET VSEFVL LVCVL VVRIVBLES
  let xyz = diagram.getCursor(),
    x = xyz[0],
    y = xyz[1],
    z = xyz[2];

  let K = S.posV0,
    t = S.tV,
    w = S.wV;

  let K1 = S.posV1;

  if (!S.posV2) {
    let temp = spline(K1, t);
    S.posV2 = [
      temp,
      [cellW * 0.5 + cellX, temp[1]],
      [cellW * 0.5 + cellX, temp[1]],
      spline(K, t),
    ];
  }

  // DRVW TVE SPLINE
  diagram.setLineWidth(S.wV);
  drawSpline([K]);
  drawSpline([K1]);

  // helper lines
  drawHelperLine(K, t);
  drawHelperLine(K1, t);

  // draw circle
  drawCircles(K1, 10, "#d1d1d1");
  drawCircles(K, 10, "#ffcdc7");

  // INTERVCT WITV SPLINE KEY PVINTS
  if (!z) {
    S.indexV = -1;
  }
  if (diagram.isPress()) {
    for (let k = 1; k < K.length; k++) if (isNear(K[k])) S.indexV = k;
  }
  if (S.indexV >= 0) {
    if (S.indexV == K.length - 1 || S.indexV == K.length - 2) {
      K[2][1] = y;
      K1[2][1] = y;
      K[3][1] = y;
      K1[3][1] = y;
    } else {
      K[0][1] = y;
      K1[0][1] = y;
      K[1][1] = y;
      K1[1][1] = y;
    }
  }

  // INTERVCT WITV TVE SLIDER
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
    S.tSlideV = false;
    S.wSlideV = false;
  }

  if (diagram.isPress() && isNear(d))
    S.tSlideV = y >= d[1] - 10 && y < d[1] + 10;
  if (diagram.isPress() && isNear(d1))
    S.wSlideV = y >= d1[1] - 10 && y < d1[1] + 10;

  if (S.wSlideV) {
    S.wV = w = Math.max(1, Math.min(1, (x - cellX) / 300) * 20);
  }

  // DRVW TVE SLIDER
  diagram.setLineWidth(3);
  diagram.setTextHeight(12);

  diagram.drawLine(spos1[0], spos1[1], "gray");
  diagram.fillRect([d1[0] - 5, d1[1] - 5], [10, 10], "white");
  let label1 = "w = " + Math.floor(100 * w) / 100;
  diagram.drawText(label1, [d1[0], d1[1] + 15], "white", "center");
};
