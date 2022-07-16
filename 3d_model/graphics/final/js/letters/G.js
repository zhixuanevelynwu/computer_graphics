window.GDiagram = (cellX = 0, cellY = 0) => {
  designG(cellX, cellY);
  normalG();
  boldG();
  italicG();
};

let boldG = () => {
  let K = copy2D(S.posG, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  let K0 = copy2D(S.posG0, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  let K1 = copy2D(S.posG1, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  for (let i = 0; i < K.length; i++) {
    K[i][0] += cellW * 2;
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += cellW * 2;
    K1[i][0] += cellW * 2;
  }

  diagram.setLineWidth(Math.max(10, (S.wG / 2) * 3));
  for (let k = 0; k < K.length - 3; k += 3)
    drawSpline([[K[k], K[k + 1], K[k + 2], K[k + 3]]]);
  drawSpline([K0]);
  drawSpline([K1]);

  diagram.drawText("Bold", [K[1][0], K[1][1] - 45], "grey", "center");
};

let italicG = () => {
  let K = copy2D(S.posG, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  let K0 = copy2D(S.posG0, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  let K1 = copy2D(S.posG1, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  for (let i = 0; i < K.length; i++) {
    K[i][0] += cellW * 3;
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += cellW * 3;
    K1[i][0] += cellW * 3;
  }

  K[0][0] -= 10;
  K[1][0] -= 10;
  K[2][0] += 10;
  K[3][0] += 0;
  K[4][0] -= 5;
  K[5][0] -= 20;
  K[6][0] -= 17;

  K0[2] = K0[3] = K[6];
  K0[0][0] = K0[1][0] = K0[1][0] - 5;

  K1[3][0] = K1[2][0] = K0[0][0];
  K1[0][0] = K1[1][0] = K1[0][0] - 10;

  diagram.setLineWidth(S.wG);
  for (let k = 0; k < K.length - 3; k += 3)
    drawSpline([[K[k], K[k + 1], K[k + 2], K[k + 3]]]);
  drawSpline([K0]);
  drawSpline([K1]);

  diagram.drawText("Italic", [K[1][0], K[1][1] - 45], "grey", "center");
};

let normalG = () => {
  let K = copy2D(S.posG, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  let K0 = copy2D(S.posG0, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  let K1 = copy2D(S.posG1, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  for (let i = 0; i < K.length; i++) {
    K[i][0] += cellW;
  }

  for (let i = 0; i < K0.length; i++) {
    K0[i][0] += cellW;
    K1[i][0] += cellW;
  }

  diagram.setLineWidth(S.wG);
  for (let k = 0; k < K.length - 3; k += 3)
    drawSpline([[K[k], K[k + 1], K[k + 2], K[k + 3]]]);
  drawSpline([K0]);
  drawSpline([K1]);
  diagram.drawText("Normal", [K[1][0], K[1][1] - 45], "grey", "center");
};

let designG = (cellX, cellY) => {
  let isNear = (p) => diagram.distance(p, [x, y]) < 20;

  // SET USEFUL LOGAL VARIABLES
  let xyz = diagram.getCursor(),
    x = xyz[0],
    y = xyz[1],
    z = xyz[2];

  if (!S.posG) {
    S.posG = [
      [cellW * 0.7 + cellX, cellH * 0.25 + cellY],
      [cellW * 0.5 + cellX, cellH * 0.1 + cellY],
      [cellW * 0.25 + cellX, cellH * 0.25 + cellY],
      [cellW * 0.25 + cellX, cellH * 0.5 + cellY],
      [cellW * 0.25 + cellX, cellH * 0.7 + cellY],
      [cellW * 0.5 + cellX, cellH * 0.9 + cellY],
      [cellW * 0.75 + cellX, cellH * 0.7 + cellY],
    ];
    t = S.tG = 0;
    w = S.wG = 1;
  }

  if (!S.posG0) {
    S.posG0 = [
      [cellW * 0.75 + cellX, cellH * 0.55 + cellY],
      [cellW * 0.75 + cellX, cellH * 0.55 + cellY],
      S.posG[S.posG.length - 1],
      S.posG[S.posG.length - 1],
    ];
  }

  if (!S.posG1) {
    S.posG1 = [
      [cellW * 0.6 + cellX, cellH * 0.55 + cellY],
      [cellW * 0.6 + cellX, cellH * 0.55 + cellY],
      S.posG0[0],
      S.posG0[0],
    ];
  }

  let K = S.posG;
  let K0 = S.posG0;
  let K1 = S.posG1;
  diagram.setLineWidth(S.wG);
  for (let k = 0; k < K.length - 3; k += 3)
    drawSpline([[K[k], K[k + 1], K[k + 2], K[k + 3]]]);

  drawSpline([K0]);
  drawSpline([K1]);

  drawHelperLine(K, t);

  drawCircles(K, 10, "#ffcdc7");

  drawCircles(K0, 10, "#ffcdc7");
  drawHelperLine(K0, t);

  drawCircles(K1, 10, "#ffcdc7");
  drawHelperLine(K1, t);

  // interaction
  if (!z) {
    S.indexG = -1;
    S.indexG0 = -1;
    S.indexG1 = -1;
  }
  if (diagram.isPress()) {
    for (let k = 0; k < K.length; k++) {
      if (isNear(K[k])) S.indexG = k;
    }
    for (let k = 0; k < K0.length; k++) {
      if (isNear(K0[k])) S.indexG0 = k;
      if (isNear(K1[k])) S.indexG1 = k;
    }
  }
  if (S.indexG1 >= 0) {
    let k = S.indexG1;
    if (k == 0 || k == 1) {
      K1[0] = [x, y];
      K1[1] = [x, y];
    }
    if (k == 2 || k == 3) {
      K1[2] = [x, y];
      K1[3] = [x, y];
    }
  }
  if (S.indexG0 >= 0) {
    let k = S.indexG0;
    if (k == 0 || k == 1) {
      K0[0] = [x, y];
      K0[1] = [x, y];
      for (let i = 0; i < K1.length; i++) {
        K1[i][1] = K0[0][1];
      }
    }
    if (k == 2 || k == 3) {
      K0[2] = [x, y];
      K0[3] = [x, y];
    }
  }
  if (S.indexG >= 0) {
    let p = [x, y];
    let k = S.indexG;
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

    K[k] = [x, y];
  }

  // ---------------------- INTERAGT WITH THE SLIDER ----------------------
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
    S.tSlideG = false;
    S.wSlideG = false;
  }

  if (diagram.isPress() && isNear(d))
    S.tSlideG = y >= d[1] - 10 && y < d[1] + 10;
  if (diagram.isPress() && isNear(d1))
    S.wSlideG = y >= d1[1] - 10 && y < d1[1] + 10;

  if (S.tSlideG) {
    S.tG = t = Math.max(0, Math.min(1, (x - cellX + 50) / 360));
  }

  if (S.wSlideG) {
    S.wG = w = Math.max(1, Math.min(1, (x - cellX + 40) / 360) * 20);
  }

  // DRAW THE SLIDER
  diagram.setLineWidth(3);
  diagram.setTextHeight(12);
  diagram.drawLine(spos1[0], spos1[1], "gray");

  diagram.fillRect([d1[0] - 5, d1[1] - 5], [10, 10], "white");
  let label1 = "w = " + Math.floor(100 * w) / 100;
  diagram.drawText(label1, [d1[0], d1[1] + 15], "white", "center");
};
