window.CDiagram = (cellX = 0, cellY = 0) => {
  designC(cellX, cellY);
  normalC();
  boldC();
  italicC();
};

let boldC = () => {
  let K = copy2D(S.posC, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  for (let i = 0; i < K.length; i++) {
    K[i][0] += cellW * 2;
  }

  diagram.setLineWidth(Math.max(10, (S.wC / 2) * 3));
  for (let k = 0; k < K.length - 3; k += 3)
    drawSpline([[K[k], K[k + 1], K[k + 2], K[k + 3]]]);

  diagram.drawText("Bold", [K[1][0], K[1][1] - 45], "grey", "center");
};

let italicC = () => {
  let K = copy2D(S.posC, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  for (let i = 0; i < K.length; i++) {
    K[i][0] += cellW * 3;
  }
  K[0][0] -= 10;
  K[1][0] -= 10;
  K[2][0] += 10;
  K[3][0] += 0;
  K[4][0] -= 5;
  K[5][0] -= 20;
  K[6][0] -= 17;

  diagram.setLineWidth(S.wC);
  for (let k = 0; k < K.length - 3; k += 3)
    drawSpline([[K[k], K[k + 1], K[k + 2], K[k + 3]]]);

  diagram.drawText("Italic", [K[1][0], K[1][1] - 45], "grey", "center");
};

let normalC = () => {
  let K = copy2D(S.posC, [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  for (let i = 0; i < K.length; i++) {
    K[i][0] += cellW;
  }

  diagram.setLineWidth(S.wC);
  for (let k = 0; k < K.length - 3; k += 3)
    drawSpline([[K[k], K[k + 1], K[k + 2], K[k + 3]]]);

  diagram.drawText("Normal", [K[1][0], K[1][1] - 45], "grey", "center");
};

let designC = (cellX, cellY) => {
  let isNear = (p) => diagram.distance(p, [x, y]) < 20;

  // SET USEFUL LOCAL VARIABLES
  let xyz = diagram.getCursor(),
    x = xyz[0],
    y = xyz[1],
    z = xyz[2];

  if (!S.posC) {
    S.posC = [
      [cellW * 0.7 + cellX, cellH * 0.25 + cellY],
      [cellW * 0.5 + cellX, cellH * 0.1 + cellY],
      [cellW * 0.25 + cellX, cellH * 0.25 + cellY],
      [cellW * 0.25 + cellX, cellH * 0.5 + cellY],
      [cellW * 0.25 + cellX, cellH * 0.7 + cellY],
      [cellW * 0.5 + cellX, cellH * 0.9 + cellY],
      [cellW * 0.75 + cellX, cellH * 0.7 + cellY],
    ];
    t = S.tC = 0;
    w = S.wC = 1;
  }

  let K = S.posC;
  diagram.setLineWidth(S.wC);
  for (let k = 0; k < K.length - 3; k += 3)
    drawSpline([[K[k], K[k + 1], K[k + 2], K[k + 3]]]);

  drawCircles(K, 10, "#ffcdc7");
  drawHelperLine(K, t);

  // interaction
  if (!z) {
    S.indexC = -1;
  }
  if (diagram.isPress()) {
    for (let k = 0; k < K.length; k++) {
      if (isNear(K[k])) S.indexC = k;
    }
  }
  if (S.indexC >= 0) {
    let p = [x, y];
    let k = S.indexC;
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
    S.tSlideC = false;
    S.wSlideC = false;
  }

  if (diagram.isPress() && isNear(d))
    S.tSlideC = y >= d[1] - 10 && y < d[1] + 10;
  if (diagram.isPress() && isNear(d1))
    S.wSlideC = y >= d1[1] - 10 && y < d1[1] + 10;

  if (S.tSlideC) {
    S.tC = t = Math.max(0, Math.min(1, (x - cellX + 50) / 360));
  }

  if (S.wSlideC) {
    S.wC = w = Math.max(1, Math.min(1, (x - cellX + 40) / 360) * 20);
  }

  // DRAW THE SLIDER
  diagram.setLineWidth(3);
  diagram.setTextHeight(12);
  diagram.drawLine(spos1[0], spos1[1], "gray");

  diagram.fillRect([d1[0] - 5, d1[1] - 5], [10, 10], "white");
  let label1 = "w = " + Math.floor(100 * w) / 100;
  diagram.drawText(label1, [d1[0], d1[1] + 15], "white", "center");
};
