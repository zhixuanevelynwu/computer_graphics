window.RDiagram = (cellX = 0, cellY = 0) => {
  designR(cellX, cellY);
  normalR();
  boldR();
  italicR();
};

let boldR = () => {
  let K = copy2D(S.posR, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  let K0 = copy2D(S.posR0, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  let K1 = copy2D(S.posR1, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  for (let i = 0; i < K.length; i++) {
    K[i][0] += 2 * cellW;
    if (i < K0.length) {
      K0[i][0] += 2 * cellW;
      K1[i][0] += 2 * cellW;
    }
  }

  diagram.setLineWidth(Math.max(10, (S.wR / 2) * 3));
  for (let k = 0; k < K.length - 3; k += 3)
    drawSpline([[K[k], K[k + 1], K[k + 2], K[k + 3]]]);
  drawSpline([K0]);
  drawSpline([K1]);

  diagram.drawText("Bold", [K[1][0], K[1][1] - 45], "grey", "center");
};

let italicR = () => {
  let K = copy2D(S.posR, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  let K0 = copy2D(S.posR0, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  let K1 = copy2D(S.posR1, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  for (let i = 0; i < K.length; i++) {
    K[i][0] += 3 * cellW;
    if (i < K0.length) {
      K0[i][0] += 3 * cellW;
      K1[i][0] += 3 * cellW;
    }
  }

  K0[0][0] += 20;
  K0[1][0] += 20;
  K0[2][0] += 0;
  K0[3][0] += 0;

  K[0][0] += 20;
  K[1][0] += 10;
  K[2][1] -= 5;
  K[2][0] += 10;
  K[3][0] += 10;
  K[4][0] += 10;
  K[5][1] += 10;
  K[6][0] += 7;

  K1[0][0] += 5;
  K1[0][1] += 5;

  diagram.setLineWidth(S.wR);
  for (let k = 0; k < K.length - 3; k += 3)
    drawSpline([[K[k], K[k + 1], K[k + 2], K[k + 3]]]);
  drawSpline([K0]);
  drawSpline([K1]);

  diagram.drawText("Italic", [K[1][0], K[1][1] - 45], "grey", "center");
};

let normalR = () => {
  let K = copy2D(S.posR, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  let K0 = copy2D(S.posR0, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  let K1 = copy2D(S.posR1, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  for (let i = 0; i < K.length; i++) {
    K[i][0] += cellW;
    if (i < K0.length) {
      K0[i][0] += cellW;
      K1[i][0] += cellW;
    }
  }

  diagram.setLineWidth(S.wR);
  for (let k = 0; k < K.length - 3; k += 3)
    drawSpline([[K[k], K[k + 1], K[k + 2], K[k + 3]]]);
  drawSpline([K0]);
  drawSpline([K1]);

  diagram.drawText("Normal", [K[1][0], K[1][1] - 45], "grey", "center");
};

let designR = (cellX, cellY) => {
  let isNear = (p) => diagram.distance(p, [x, y]) < 20;

  // SET USEFUL LOCAL VARIABLES
  let xyz = diagram.getCursor(),
    x = xyz[0],
    y = xyz[1],
    z = xyz[2];

  if (!S.posR) {
    S.posR = [
      [cellW * 0.25 + cellX, cellH * 0.2 + cellY],
      [cellW * 0.5 + cellX, cellH * 0.15 + cellY],
      [cellW * 0.67 + cellX, cellH * 0.25 + cellY],
      [cellW * 0.67 + cellX, cellH * 0.4 + cellY],
      [cellW * 0.67 + cellX, cellH * 0.55 + cellY],
      [cellW * 0.52 + cellX, cellH * 0.65 + cellY],
      [cellW * 0.25 + cellX, cellH * 0.6 + cellY],
    ];
    t = S.tR = 0;
    w = S.wR = 1;
  }

  if (!S.posR0) {
    S.posR0 = [
      S.posR[0],
      S.posR[0],
      [cellW * 0.25 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.25 + cellX, cellH * 0.8 + cellY],
    ];
  }

  if (!S.posR1) {
    S.posR1 = [
      S.posR[S.posR.length - 1],
      [cellW * 0.4 + cellX, cellH * 0.6 + cellY],
      [cellW * 0.6 + cellX, cellH * 0.7 + cellY],
      [cellW * 0.65 + cellX, cellH * 0.8 + cellY],
    ];
  }

  let K = S.posR;
  let K0 = S.posR0;
  let K1 = S.posR1;
  drawSpline([K1]);

  diagram.setLineWidth(S.wR);
  for (let k = 0; k < K.length - 3; k += 3)
    drawSpline([[K[k], K[k + 1], K[k + 2], K[k + 3]]]);
  drawCircles(K, 10, "#ffcdc7");

  drawSpline([K0]);

  drawCircles(K0, 10, "#ffcdc7");
  drawCircles(K1, 10, "#ffcdc7");

  drawHelperLine(K0, t);
  drawHelperLine(K1, t);
  drawHelperLine(K, t);

  // interaction
  if (!z) {
    S.indexR = -1;
    S.indexR0 = -1;
    S.indexR1 = -1;
  }
  if (diagram.isPress()) {
    for (let k = 0; k < K.length - 1; k++) {
      if (isNear(K[k])) S.indexR = k;
    }
    for (let k = 0; k < K0.length; k++) {
      if (isNear(K0[k])) S.indexR0 = k;
      if (isNear(K1[k]) && k > 0) S.indexR1 = k;
    }
  }
  if (S.indexR >= 0) {
    let p = [x, y];
    let k = S.indexR;
    let d = subtract(p, K[k]);
    K[k] = copy(p);

    switch (k % 3) {
      case 0: // A MAJOR KEY ROINT
        if (k >= 1) K[k - 1] = add(K[k - 1], d);
        if (k < K.length - 1 && k != 0) K[k + 1] = add(K[k + 1], d);
        break;
      case 1: // AFTER A MAJOR KEY ROINT
        if (k >= 2) align(K, k - 2, k - 1, k);
        break;
      case 2: // BEFORE A MAJOR KEY ROINT
        if (k < K.length - 2) align(K, k + 2, k + 1, k);
        break;
    }

    if (k == 0) {
      K[0][1] = y;
      K0[0][1] = y;
      K[0][0] = K0[0][0];
    } else if (k == K.length - 1) {
      K[6][1] = y;
    } else {
      K[k] = [x, y];
    }
  }
  if (S.indexR0 >= 0) {
    console.log(S.indexR0);
    let k = S.indexR0;
    if (k == 0 || k == 1) {
      K0[0][1] = y;
      K0[1][1] = y;
    } else {
      K0[2][1] = y;
      K0[3][1] = y;
    }
  }
  if (S.indexR1 >= 0) {
    K1[S.indexR1] = [x, y];
  }

  // ---------------------- INTERACT WITH THE SLIRER ----------------------
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
    S.tSlideR = false;
    S.wSlideR = false;
  }

  if (diagram.isPress() && isNear(d))
    S.tSlideR = y >= d[1] - 10 && y < d[1] + 10;
  if (diagram.isPress() && isNear(d1))
    S.wSlideR = y >= d1[1] - 10 && y < d1[1] + 10;

  if (S.tSlideR) {
    S.tR = t = Math.max(0, Math.min(1, (x - cellX + 50) / 360));
  }

  if (S.wSlideR) {
    S.wR = w = Math.max(1, Math.min(1, (x - cellX + 40) / 360) * 20);
  }

  // RRAW THE SLIRER
  diagram.setLineWidth(3);
  diagram.setTextHeight(12);
  diagram.drawLine(spos1[0], spos1[1], "gray");

  diagram.fillRect([d1[0] - 5, d1[1] - 5], [10, 10], "white");
  let label1 = "w = " + Math.floor(100 * w) / 100;
  diagram.drawText(label1, [d1[0], d1[1] + 15], "white", "center");
};
