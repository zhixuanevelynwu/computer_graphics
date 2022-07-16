window.DDiagram = (cellX = 0, cellY = 0) => {
  designD(cellX, cellY);
  normalD();
  boldD();
  italicD();
};

let boldD = () => {
  let K = copy2D(S.posD, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  let K0 = copy2D(S.posD0, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  for (let i = 0; i < K.length; i++) {
    K[i][0] += 2 * cellW;
    if (i < K0.length) K0[i][0] += 2 * cellW;
  }

  diagram.setLineWidth(Math.max(10, (S.wD / 2) * 3));
  for (let k = 0; k < K.length - 3; k += 3)
    drawSpline([[K[k], K[k + 1], K[k + 2], K[k + 3]]]);
  drawSpline([K0]);

  diagram.drawText("Bold", [K[1][0], K[1][1] - 45], "grey", "center");
};

let italicD = () => {
  let K = copy2D(S.posD, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  let K0 = copy2D(S.posD0, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  for (let i = 0; i < K.length; i++) {
    K[i][0] += 3 * cellW;
    if (i < K0.length) K0[i][0] += 3 * cellW;
  }

  K0[0][0] += 20;
  K0[1][0] += 10;
  K0[2][0] += 10;
  K0[3][0] += 0;

  K[0][0] += 20;
  K[1][0] += 10;
  K[2][1] -= 5;
  K[2][0] += 10;
  K[3][0] += 5;
  K[4][0] += 5;
  K[5][1] += 10;
  K[6][0] += 0;

  diagram.setLineWidth(S.wD);
  for (let k = 0; k < K.length - 3; k += 3)
    drawSpline([[K[k], K[k + 1], K[k + 2], K[k + 3]]]);
  drawSpline([K0]);

  diagram.drawText("Italic", [K[1][0], K[1][1] - 45], "grey", "center");
};

let normalD = () => {
  let K = copy2D(S.posD, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  let K0 = copy2D(S.posD0, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  for (let i = 0; i < K.length; i++) {
    K[i][0] += cellW;
    if (i < K0.length) K0[i][0] += cellW;
  }

  diagram.setLineWidth(S.wD);
  for (let k = 0; k < K.length - 3; k += 3)
    drawSpline([[K[k], K[k + 1], K[k + 2], K[k + 3]]]);
  drawSpline([K0]);

  diagram.drawText("Normal", [K[1][0], K[1][1] - 45], "grey", "center");
};

let designD = (cellX, cellY) => {
  let isNear = (p) => diagram.distance(p, [x, y]) < 20;

  // SET USEFUL LOCAL VARIABLES
  let xyz = diagram.getCursor(),
    x = xyz[0],
    y = xyz[1],
    z = xyz[2];

  if (!S.posD) {
    S.posD = [
      [cellW * 0.25 + cellX, cellH * 0.25 + cellY],
      [cellW * 0.5 + cellX, cellH * 0.2 + cellY],
      [cellW * 0.67 + cellX, cellH * 0.35 + cellY],
      [cellW * 0.67 + cellX, cellH * 0.57 + cellY],
      [cellW * 0.67 + cellX, cellH * 0.8 + cellY],
      [cellW * 0.52 + cellX, cellH * 0.95 + cellY],
      [cellW * 0.25 + cellX, cellH * 0.9 + cellY],
    ];
    t = S.tD = 0;
    w = S.wD = 1;
  }

  if (!S.posD0) {
    S.posD0 = [
      S.posD[0],
      [cellW * 0.25 + cellX, cellH * 0.6 + cellY],
      [cellW * 0.25 + cellX, cellH * 0.6 + cellY],
      S.posD[S.posD.length - 1],
    ];
  }

  let K = S.posD;
  let K0 = S.posD0;
  diagram.setLineWidth(S.wD);
  for (let k = 0; k < K.length - 3; k += 3)
    drawSpline([[K[k], K[k + 1], K[k + 2], K[k + 3]]]);
  drawSpline([K0]);

  drawCircles(K0, 10, "#ffcdc7");
  drawCircles(K, 10, "#ffcdc7");

  drawHelperLine(K0, t);
  drawHelperLine(K, t);

  // interaction
  if (!z) {
    S.indexD = -1;
    S.indexD0 = -1;
  }
  if (diagram.isPress()) {
    for (let k = 0; k < K.length; k++) {
      if (isNear(K[k])) S.indexD = k;
    }
    if (isNear(K0[1]) || isNear(K0[2])) S.indexD0 = 1;
  }
  if (S.indexD >= 0) {
    let p = [x, y];
    let k = S.indexD;
    let d = subtract(p, K[k]);
    K[k] = copy(p);

    switch (k % 3) {
      case 0: // A MAJOR KEY POINT
        if (k >= 1) K[k - 1] = add(K[k - 1], d);
        if (k < K.length - 1) K[k + 1] = add(K[k + 1], d);
        break;
      case 1: // AFTER A MAJOR KEY POINT
        if (k >= 2) align(K, k - 2, k - 1, k);
        break;
      case 2: // BEFORE A MAJOR KEY POINT
        if (k < K.length - 2) align(K, k + 2, k + 1, k);
        break;
    }

    if (k == 0) {
      K0[0] = [x, y];
    }
    if (k == K.length - 1) {
      K0[3] = [x, y];
    }

    K[k] = [x, y];
  }
  if (S.indexD0 >= 0) {
    K0[1] = [x, y];
    K0[2] = [x, y];
  }

  // ---------------------- INTERACT WITH THE SLIDER ----------------------
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
    S.tSlideD = false;
    S.wSlideD = false;
  }

  if (diagram.isPress() && isNear(d))
    S.tSlideD = y >= d[1] - 10 && y < d[1] + 10;
  if (diagram.isPress() && isNear(d1))
    S.wSlideD = y >= d1[1] - 10 && y < d1[1] + 10;

  if (S.tSlideD) {
    S.tD = t = Math.max(0, Math.min(1, (x - cellX + 50) / 360));
  }

  if (S.wSlideD) {
    S.wD = w = Math.max(1, Math.min(1, (x - cellX + 40) / 360) * 20);
  }

  // DRAW THE SLIDER
  diagram.setLineWidth(3);
  diagram.setTextHeight(12);
  diagram.drawLine(spos1[0], spos1[1], "gray");

  diagram.fillRect([d1[0] - 5, d1[1] - 5], [10, 10], "white");
  let label1 = "w = " + Math.floor(100 * w) / 100;
  diagram.drawText(label1, [d1[0], d1[1] + 15], "white", "center");
};
