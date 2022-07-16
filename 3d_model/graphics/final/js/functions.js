let distance = (a, b) => {
  let dd = 0;
  for (let i = 0; i < a.length; i++) dd += (a[i] - b[i]) * (a[i] - b[i]);
  return Math.sqrt(dd);
};

let add = (a, b) => {
  let c = [];
  for (let i = 0; i < a.length; i++) c.push(a[i] + b[i]);
  return c;
};

let scale = (a, s) => {
  let c = [];
  for (let i = 0; i < a.length; i++) c.push(a[i] * s);
  return c;
};

let subtract = (a, b) => {
  let c = [];
  for (let i = 0; i < a.length; i++) c.push(a[i] - b[i]);
  return c;
};

let align = (K, i, j, k) => {
  let a = K[i],
    b = K[j],
    c = K[k];
  let ab = distance(a, b);
  let bc = distance(b, c);
  K[i] = add(b, scale(subtract(b, c), ab / bc));
};

let copy = (a) => a.slice();

let makeLoop = (K, a, b, c, d) => {
  if (a < 0) a += K.length;
  if (b < 0) b += K.length;
  if (c < 0) c += K.length;
  if (d < 0) d += K.length;
  K[a] = add(K[a], subtract(K[c], K[b]));
  K[b] = copy(K[c]);
  align(K, a, c, d);
};

let drawSpline = (J) => {
  for (let j = 0; j < J.length; j++)
    for (let t = 0; t < 1; t += 1 / 100)
      diagram.drawLine(spline(J[j], t), spline(J[j], t + 1 / 100), "white");
};

let drawHelperLine = (K, t) => {
  let A = K[0],
    B = K[1],
    C = K[2],
    D = K[3];
  let a = mix(A, B, t),
    b = mix(B, C, t),
    c = mix(C, D, t);
  diagram.setLineWidth(1);
  for (let k = 0; k < K.length - 1; k++)
    diagram.drawLine(K[k], K[k + 1], "grey");
  diagram.drawLine(a, b);
  diagram.drawLine(b, c);
  diagram.drawLine(mix(a, b, t), mix(b, c, t));
};

let drawCircles = (K, r, color) => {
  for (let k = 0; k < K.length; k++) diagram.fillCircle(K[k], r, color);
};

S.BezierM = [-1, 3, -3, 1, 3, -6, 3, 0, -3, 3, 0, 0, 1, 0, 0, 0];

S.CatromM = [
  -1 / 2,
  1,
  -1 / 2,
  0,
  3 / 2,
  -5 / 2,
  0,
  1,
  -3 / 2,
  2,
  1 / 2,
  0,
  1 / 2,
  -1 / 2,
  0,
  0,
];

S.BsplinM = [
  -1 / 6,
  3 / 6,
  -3 / 6,
  1 / 6,
  3 / 6,
  -6 / 6,
  0 / 6,
  4 / 6,
  -3 / 6,
  3 / 6,
  3 / 6,
  1 / 6,
  1 / 6,
  0 / 6,
  0 / 6,
  0 / 6,
];

let spline = (K, t) => {
  let p = [];
  let A = K[0],
    B = K[1],
    C = K[2],
    D = K[3];
  let M = S.BezierM;
  for (let i = 0; i < A.length; i++) {
    let F = matrixMultiply(M, [A[i], B[i], C[i], D[i]]);
    p.push(t * t * t * F[0] + t * t * F[1] + t * F[2] + F[3]);
  }
  return p;
};

let copy2D = (K, K0) => {
  for (let i = 0; i < K.length; i++) {
    for (let j = 0; j < K[0].length; j++) {
      K0[i][j] = K[i][j];
    }
  }
  return K0;
};
