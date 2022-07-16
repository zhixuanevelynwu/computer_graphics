window.KDiagram = (cellX = 0, cellY = 0) => {
  designK(cellX, cellY);
  normalK();
  boldK();
  italicK();
};

let boldK = () => {
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

  for (let i = 0; i < S.posK0.length; i++) {
    for (let j = 0; j < S.posK0[0].length; j++) {
      K0[i][j] = S.posK0[i][j];
      K1[i][j] = S.posK1[i][j];
      K2[i][j] = S.posK2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 2 * cellW;
    K1[i][0] += 2 * cellW;
    K2[i][0] += 2 * cellW;
  }

  diagram.setLineWidth(Math.max(10, (S.wK / 2) * 3));
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Bold", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let italicK = () => {
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

  for (let i = 0; i < S.posK0.length; i++) {
    for (let j = 0; j < S.posK0[0].length; j++) {
      K0[i][j] = S.posK0[i][j];
      K1[i][j] = S.posK1[i][j];
      K2[i][j] = S.posK2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += 3.2 * cellW;
    K1[i][0] += 3.2 * cellW;
    K2[i][0] += 3.2 * cellW;
  }

  K0[3][0] += 10;
  K0[2][0] += 0;
  K0[1][0] -= 5;
  K0[0][0] -= 12;

  diagram.setLineWidth(S.wK);
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Italic", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let normalK = () => {
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

  for (let i = 0; i < S.posK0.length; i++) {
    for (let j = 0; j < S.posK0[0].length; j++) {
      K0[i][j] = S.posK0[i][j];
      K1[i][j] = S.posK1[i][j];
      K2[i][j] = S.posK2[i][j];
    }
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += cellW;
    K1[i][0] += cellW;
    K2[i][0] += cellW;
  }

  diagram.setLineWidth(S.wK);
  drawSpline([K0]);
  drawSpline([K1]);
  drawSpline([K2]);

  diagram.drawText("Normal", [K0[3][0], K0[3][1] - 45], "grey", "center");
};

let designK = (cellX, cellY) => {
  let isNear = (p) => diagram.distance(p, [x, y]) < 20;

  // set coordinate of the line
  if (!S.posK0) {
    S.posK0 = [
      [cellW * 0.2 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.2 + cellX, cellH * 0.6 + cellY],
      [cellW * 0.2 + cellX, cellH * 0.4 + cellY],
      [cellW * 0.2 + cellX, cellH * 0.2 + cellY],
    ];
    S.tK = 0.5;
    S.wK = 1;
  }

  if (!S.posK1) {
    S.posK1 = [
      [cellW * 0.7 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.5 + cellX, cellH * 0.65 + cellY],
      [cellW * 0.35 + cellX, cellH * 0.55 + cellY],
      [S.posK0[3][0], cellH * 0.45 + cellY],
    ];
  }

  if (!S.posK2) {
    S.posK2 = [
      [cellW * 0.65 + cellX, cellH * 0.2 + cellY],
      [cellW * 0.55 + cellX, cellH * 0.3 + cellY],
      [cellW * 0.45 + cellX, cellH * 0.4 + cellY],
      spline(S.posK1, 0.75),
    ];
  }

  // SKT USKKUL LOCAL VARIABLKS
  let xyz = diagram.getCursor(),
    x = xyz[0],
    y = xyz[1],
    z = xyz[2];

  let K = S.posK0,
    t = S.tK,
    w = S.wK;

  let K1 = S.posK1;

  if (!S.posK2) {
    let temp = spline(K, t);
    S.posK2 = [
      temp,
      [cellW * 0.4 + cellX, temp[1]],
      [cellW * 0.4 + cellX, temp[1]],
      [cellW * 0.6 + cellX, temp[1]],
    ];
  }

  let K0 = S.posK2;

  // DRAW THK SPLINK
  diagram.setLineWidth(S.wK);
  drawSpline([K0]);
  drawCircles(K0, 10, "#ffcdc7");
  drawSpline([K1]);
  drawCircles(K1, 10, "#ffcdc7");
  drawSpline([K]);

  // helper lines
  drawHelperLine(K, t);
  drawHelperLine(K0, t);
  drawHelperLine(K1, t);

  // draw circle
  drawCircles(K, 12, "#ffcdc7");

  // INTERACT WITH SPLINK KKY POINTS
  if (!z) {
    S.indexK = -1;
    S.indexK0 = -1;
    S.indexK1 = -1;
    S.indexK2 = -1;
  }
  if (diagram.isPress()) {
    for (let k = 0; k < K.length; k++) {
      if (isNear(K[k])) S.indexK = k;
      if (isNear(K0[k]) && k != 3) S.indexK0 = k;
      if (isNear(K1[k]) && k != 3) S.indexK1 = k;
    }
  }
  if (S.indexK >= 0) {
    K[S.indexK] = [x, y];
    K1[3] = spline(K, 0.5);
    K0[3] = spline(S.posK1, 0.75);
  }
  if (S.indexK0 >= 0) {
    let k = S.indexK0;
    K0[k] = [x, y];
  }
  if (S.indexK1 >= 0) {
    K1[S.indexK1] = [x, y];
    K0[3] = spline(S.posK1, 0.75);
  }

  // INTERACT WITH THK SLIDKR
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
    S.tSlideK = false;
    S.wSlideK = false;
  }

  if (diagram.isPress() && isNear(d))
    S.tSlideK = y >= d[1] - 10 && y < d[1] + 10;
  if (diagram.isPress() && isNear(d1))
    S.wSlideK = y >= d1[1] - 10 && y < d1[1] + 10;

  if (S.tSlideK) {
    S.tK = t = Math.max(0, Math.min(1, (x - cellX + 50) / 360));
    let temp = spline(K, t);
    let offset = S.posK2[0][1] - temp[1];
    S.posK2[0] = temp;
    S.posK2[1][1] -= offset;
    S.posK2[2][1] -= offset;
    S.posK2[3][1] -= offset;
  }

  if (S.wSlideK) {
    S.wK = w = Math.max(1, Math.min(1, (x - cellX) / 300) * 20);
  }

  // DRAW THK SLIDKR
  diagram.setLineWidth(3);
  diagram.setTextHeight(12);

  diagram.drawLine(spos1[0], spos1[1], "gray");
  diagram.fillRect([d1[0] - 5, d1[1] - 5], [10, 10], "white");
  let label1 = "w = " + Math.floor(100 * w) / 100;
  diagram.drawText(label1, [d1[0], d1[1] + 15], "white", "center");
};
