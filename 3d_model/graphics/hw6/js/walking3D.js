rooms.walking3D = function () {
  lib3D2();

  description = `
<b>ATLAS and P-Body from Portal 2</b>
<p>
I created a scene of ATLAS and P-Body walking. <br>
Slide the bar to the right to see P-Body and left to see ATLAS.<br>
<img src=imgs/ap.png alt="ATLAS / P-Body" width=300> <br>
   <br>
   <input type=range id=change_character > <b>ATLAS / P-Body</b> 
   <p>
<font color=red><b><i>Note:</i></b>
First run <b>walking in 2D</b>
<br>
&nbsp; &nbsp; &nbsp;
&nbsp; &nbsp; and then run this demo.</font>
<p>
    <input type=range id=leg_length > leg length  <br>
    <input type=range id=body_bounce> body bounce <br>
    <input type=range id=hip_sway   > hip sway    <br>
    <input type=range id=hip_thrust > hip thrust  <br>
    <input type=range id=hip_side   > hip side    <br>
    <input type=range id=foot_lift  > foot lift   <br>
    <input type=range id=foot_bend  > foot bend   <br>
`;

  code = {
    init: `
//window.leg_length  = {value:30};
//window.body_bounce = {value:50};
//window.hip_sway    = {value:50};
//window.hip_thrust  = {value:50};
//window.foot_lift   = {value:50};
//window.foot_bend   = {value:50};

   S.saveWalking3DParams = S.legLengthValue;

   S.squareMesh = [ -1, 1, 0,  0,0,1,  0,1,
                     1, 1, 0,  0,0,1,  1,1,
                    -1,-1, 0,  0,0,1,  0,0,
                     1,-1, 0,  0,0,1,  1,0 ];

   let glueMeshes = (a,b) => {
       let mesh = a.slice();
       mesh = mesh.concat(a.slice(a.length - S.VERTEX_SIZE, a.length));
       mesh = mesh.concat(b.slice(0, S.VERTEX_SIZE));
       mesh = mesh.concat(b);
       return mesh;
   }

   let uvMesh = (f,nu,nv) => {
      let mesh = [];
      for (let iv = 0 ; iv < nv ; iv++) {
         let v = iv / nv;
         let strip = [];
         for (let iu = 0 ; iu <= nu ; iu++) {
            let u = iu / nu;
            strip = strip.concat(f(u,v));
            strip = strip.concat(f(u,v+1/nv));
         }
         mesh = glueMeshes(mesh, strip);
      }
      return mesh;
   }

   S.sphereMesh = uvMesh((u,v) => {
      let theta = 2 * Math.PI * u;
      let phi = Math.PI * v - Math.PI/2;
      let cu = Math.cos(theta);
      let su = Math.sin(theta);
      let cv = Math.cos(phi);
      let sv = Math.sin(phi);
      return [cu * cv, su * cv, sv,
              cu * cv, su * cv, sv,
              u, v];
   }, 20, 10);

   S.semiSphereMesh = uvMesh((u,v) => {
      let theta = Math.PI * u;
      let phi = Math.PI * v - Math.PI/2;
      let cu = Math.cos(theta);
      let su = Math.sin(theta);
      let cv = Math.cos(phi);
      let sv = Math.sin(phi);
      return [cu * cv, su * cv, sv,
              cu * cv, su * cv, sv,
              u, v];
   }, 20, 10);

   let transformMesh = (mesh, matrix) => {
      let result = [];
      let IMT = matrixTranspose(matrixInverse(matrix));
      for (let n = 0 ; n < mesh.length ; n += S.VERTEX_SIZE) {
         let V = mesh.slice(n, n + S.VERTEX_SIZE);
         let P  = V.slice(0, 3);
         let N  = V.slice(3, 6);
         let UV = V.slice(6, 8);
         P = matrixTransform(matrix, [P[0], P[1], P[2], 1]);
         N = matrixTransform(IMT,    [N[0], N[1], N[2], 0]);
         result = result.concat([P[0],P[1],P[2],
                                 N[0],N[1],N[2],
                                 UV[0],UV[1]]);
      }
      return result;
   }

   let face0 = transformMesh(S.squareMesh, matrixTranslate([0,0,1]));
   let face1 = transformMesh(face0,        matrixRotx( Math.PI/2));
   let face2 = transformMesh(face0,        matrixRotx( Math.PI  ));
   let face3 = transformMesh(face0,        matrixRotx(-Math.PI/2));
   let face4 = transformMesh(face0,        matrixRoty(-Math.PI/2));
   let face5 = transformMesh(face0,        matrixRoty( Math.PI/2));
   S.cubeMesh = glueMeshes(face0,
                glueMeshes(face1,
                glueMeshes(face2,
                glueMeshes(face3,
                glueMeshes(face4,
                           face5)))));

   S.drawMesh = (mesh, matrix) => {
      let gl = S.gl;
      S.setUniform('Matrix4fv', 'uMatrix', false, matrix);
      S.setUniform('Matrix4fv', 'uInvMatrix', false, matrixInverse(matrix));
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh), gl.STATIC_DRAW);
      S.gl.drawArrays(S.gl.TRIANGLE_STRIP, 0, mesh.length / S.VERTEX_SIZE);
   }

`,
    fragment: `
S.setFragmentShader(\`
   uniform vec3 uColor;
   varying vec3 vPos, vNor;
   void main() {
      float c = .2 + .8 * max(0.,dot(vNor,vec3(.57)));
      gl_FragColor = vec4(c,c,c,1.) * vec4(uColor,1.);
   }
\`);
`,
    vertex: `
S.setVertexShader(\`

   attribute vec3 aPos, aNor;
   varying   vec3 vPos, vNor;
   uniform   mat4 uMatrix, uInvMatrix, uPerspective;

   void main() {
      vec4 pos = uPerspective * uMatrix * vec4(aPos, 1.);
      vec4 nor = vec4(aNor, 0.) * uInvMatrix;
      vPos = pos.xyz;
      vNor = normalize(nor.xyz);
      gl_Position = pos * vec4(1.,1.,-.01,1.);
   }

\`)
`,
    render: `

   // REMEMBER PREVIOUS SLIDER VALUES IF WE ARE COMING BACK TO THIS PAGE

   if (S.saveWalking3DParams) {
      delete S.saveWalking3DParams;

      leg_length.value  = S.legLengthValue ;
      body_bounce.value = S.bodyBounceValue;
      hip_sway.value    = S.hipSwayValue   ;
      hip_thrust.value  = S.hipThrustValue ;
      hip_side.value    = S.hipSideValue   ;
      foot_lift.value   = S.footLiftValue  ;
      foot_bend.value   = S.footBendValue  ;
   }

   // SET RANGES FOR ALL PARAMETERS CONTROLLED BY SLIDERS
   S.character = change_character.value <= 50;

   let atlas = S.character;
   let legL = atlas ? 0.15 : 0.45;

   S.legLength  = mix(legL,   1, (S.legLengthValue  = leg_length.value ) / 100);
   S.bodyBounce = mix(  0,  .4, (S.bodyBounceValue = body_bounce.value) / 100);
   S.hipSway    = mix(-.5,  .5, (S.hipSwayValue    = hip_sway.value   ) / 100);
   S.hipThrust  = mix(-.1,  .1, (S.hipThrustValue  = hip_thrust.value ) / 100);
   S.hipSide    = mix(-.2,  .2, (S.hipSideValue    = hip_side.value   ) / 100);
   S.footLift   = mix(.05, .25, (S.footLiftValue   = foot_lift.value  ) / 100);
   S.footBend   = mix(  0,   1, (S.footBendValue   = foot_bend.value  ) / 100);

   S.setUniform('Matrix4fv', 'uPerspective', false,
      [1,0,0,0, 0,1,0,0, 0,0,1,-.1, 0,0,0,1]);

   let m = new Matrix();

   let draw = (mesh, color) => {
      S.setUniform('3fv', 'uColor', color);
      S.drawMesh(mesh, m.get());
   }

   // TRANSFORM FROM PIXEL COORDS TO 3D DISPLAY COORDS

   // --- TRANSFORM A 3D POINT

   let xf = p => [ (p[0] - 400) / 400,
                  -(p[1] - 400) / 400,
                    p[2]        / 400 ];

   // --- TRANSFORM A 3D DIRECTION VECTOR

   let xf0  = p => [ p[0] / 400, -p[1] / 400, p[2] / 400 ];

   let ixf0 = p => [ p[0] * 400, -p[1] * 400, p[2] * 400 ];

   // ANIMATED POSITION

   if (S.rollView === undefined)
      S.rollView = -.6;
   if (S.rollViewY === undefined)
      S.rollViewY = -.25;

   m.identity();
   m.rotx(2 * S.rollView);
   m.rotz(2 * S.rollViewY);


   // DRAW GAME BOARD

   m.save();
      m.scale([.9,.9,.001]);
      draw(S.cubeMesh, [1,1,1]);
   m.restore();

   // DRAW ANIMATION PATH

   for (let i = 0 ; i < S.C.length ; i++) {
      m.save();
         m.translate(xf(S.C[i].p));
         m.scale([.01,.01,.01]);
         draw(S.cubeMesh, [0,0,0]);
      m.restore();
   }

   // FOOT LENGTH

   let footLength = 0.12;

   // INITIALIZE FRAME COUNT IF NEEDED

   if (S.frame === undefined)
      S.frame = 0;

   if (S.frame == 0)
      S.startTime = time;

   S.frame = (S.frame + 1) % S.C.length;

   // COMPUTE DIRECTION OF MOVEMENT

   let d = S.subtract(S.body3D[S.frame+1], S.body3D[S.frame]);
   d[2] = 0;
   d = S.normalize(d);
   let turn = Math.atan2(d[0],d[1]);

   // DRAW FEET

   let ankle = [];

   let ankleHeight = .015 * 400;

   for (let f = 0 ; f < 2 ; f++) {
      let s = 2 * f - 1;
      m.save();
         ankle[f] = S.feet3D[S.frame][f].slice();
         let z = ankle[f][2];
         ankle[f][2] = ankleHeight + 400 * S.footLift * z;
         ankle[f] = S.add(ankle[f], S.scale(d, -footLength/2 * 400));
         let foot = ankle[f].slice();
         foot[2] -= ankleHeight;
         m.translate(xf(foot));
         m.rotz(turn);
         let footBend = s * z * S.footBend * Math.sin(2 * Math.PI * S.walkSpeed * (time - S.startTime));
         m.rotx(footBend);
         m.translate([0,-.06,0]);
         m.scale([.035, footLength, .035]);
         draw(S.sphereMesh, [1,1,1]);
      m.restore();
   }

   // DRAW HEAD

   let t = S.C[S.frame].t;
   let dampen = 1 - S.nearEnd(t);

   let body = S.add(S.body3D[S.frame], [0,0,400*S.legLength]);
   let z0 = S.feet3D[S.frame][0][2];
   let z1 = S.feet3D[S.frame][1][2];
   S.bodyLift = mix(S.bodyLift, (z0 + z1) / 3 + 4 * S.bodyBounce * (1 - dampen), .5);

   let sway   = dampen * -S.hipSway * Math.sin(2 * Math.PI * S.walkSpeed * (time - S.startTime));
   let thrust = dampen * -S.hipThrust * Math.cos(4 * Math.PI * S.walkSpeed * time);
   let side   = dampen * -S.hipSide * Math.cos(2 * Math.PI * S.walkSpeed * time);
   let bounce = dampen * -S.bodyBounce;

   let eyeA = [[4/255, 67/255, 204/255], [160/255, 208/255, 250/255]];
   let eyeP = [[245/255, 144/255, 56/255], [255/255, 178/255, 115/255]];
   let bodyLengthA = 2.5;
   let bodyLengthP = 1.5;
   let bodyWidthA = 2.5;
   let bodyWidthP = 3;

   let eyeColor = eyeA;
   let bodyWidth = bodyWidthA;
   let bodyLength = bodyLengthA;
   if (!atlas) {
      eyeColor = eyeP;
      bodyLength = bodyLengthP;
   } 

   m.save();
      let z = S.body3D[S.frame][2];
      m.translate(xf(S.body3D[S.frame]));
      m.translate([0, 0, S.legLength + bounce * z]);
      m.rotz(turn);
      m.roty(sway);
      m.translate([side,thrust,0]);
      m.translate([thrust,0,0]);

      m.save();
      if (!atlas) {
         m.translate([0,0,0.05]);
      }
      m.scale([S.feetApart/bodyWidth,S.feetApart/2.5,S.feetApart/bodyLength]);
      draw(S.sphereMesh, [1,1,1]);
      m.restore();

      // FACE
      if (!atlas) {
         m.scale([S.feetApart/3,S.feetApart/2.5,S.feetApart/3]);
      } else {
         m.scale([S.feetApart/2.5,S.feetApart/2.5,S.feetApart/2.5]);
      }
      m.save();
         m.translate([0,-0.65,0]);
         m.scale([0.8, 0.67, 0.8]);
         draw(S.semiSphereMesh, [.8,.8,.8]);
         m.save();
            m.translate([0,-0.1,0]);
            m.scale([0.9, 0.67, 0.9]);
            draw(S.semiSphereMesh, [.8,.8,.8]);
         m.restore();
      m.restore();

      // EYE LID
      m.save();
         m.translate([0,-1,Math.abs(Math.cos(time) * 0.3)]);
         m.rotx(1.2)
         m.scale([0.5, 0.5, 0.2]);
         draw(S.semiSphereMesh, [.8,.8,.8]);
      m.restore();
      m.save();
         m.translate([0,-1, -Math.abs(Math.cos(time) * 0.3)]);
         m.rotx(-1.4)
         m.scale([0.5, 0.5, 0.2]);
         draw(S.semiSphereMesh, [.8,.8,.8]);
      m.restore();

      // EYE
      m.save();
         m.translate([0,-0.8,0]);
         m.scale([0.45,0.25,0.45]);
         draw(S.sphereMesh, [0,0,0]);
         m.save();
            m.translate([0,-0.8,0]);
            m.scale([0.7,0.25,0.7])
            draw(S.sphereMesh, [1,1,1]);
            m.save();
               m.translate([0,-0.8,0]);
               m.scale([0.8,0.25,0.8])
               draw(S.sphereMesh, eyeColor[0]);
               m.save();
                  m.translate([0,-0.8,0]);
                  m.scale([0.7,0.25,0.7])
                  draw(S.sphereMesh, eyeColor[1]);
                  m.save();
                     m.translate([0,-0.8,0]);
                     m.scale([0.4,0.25,0.4])
                     draw(S.sphereMesh, eyeColor[0]);
                  m.restore();
               m.restore();
            m.restore();
         m.restore();
      m.restore();
   m.restore();

   // DRAW KNEES AND LEGS
   let e = S.cross(d, [0,0,1]);
   e = S.normalize(e);
   for (let f = 0 ; f < 2 ; f++) {
      let s = 2 * f - 1;
      let yToHip = -s*120*S.feetApart;
      let xToHip = thrust;
      let swayCos = Math.cos(sway);
      let swaySin = Math.sin(sway);
      let ee = S.add(S.scale(e, swayCos), [0,0,-swaySin]);
      let hip = S.add(body, S.scale(ee, yToHip));
      hip = S.add(hip, ixf0([ thrust*e[1]+side*e[0], thrust*e[0]-side*e[1], bounce*S.body3D[S.frame][2] ]));
      let knee = d.slice();
      ik(195*S.legLength,195*S.legLength,S.subtract(ankle[f], hip), knee);
      knee = S.add(hip, knee);
      m.save();
         m.translate(xf(knee));
         m.scale([.03,.03,.03]);
         draw(S.sphereMesh, [1,1,1]);
      m.restore();

      // DRAW LEGS
      {
         let H = xf(hip);
         let K = xf(knee);
         let A = xf(ankle[f]);

         let K2H = S.subtract(H,K);
         let A2K = S.subtract(K,A);
	   // UPPER LEG CONNECTS KNEE TO HIP
         m.save();
            m.translate(mix(K,H,.5));
            m.aimz(K2H, xf0(d));
            m.scale([ .05, .04, S.norm(K2H) / 2 ]);
            draw(S.sphereMesh, [1,1,1]);
         m.restore();

	   // LOWER LEG CONNECTS ANKLE TO KNEE
         m.save();
            m.translate(mix(A,K,.5));
            m.aimz(A2K, xf0(d));
            m.scale([ .05, .03, S.norm(A2K) / 2 ]);
            draw(S.sphereMesh, [1,1,1]);
         m.restore();
      }
   }

   // DRAW ARM
   for (let f = 0 ; f < 2 ; f++) {
      let s = 2 * f - 1;
      let yToHip = -s*120*S.feetApart;
      let xToHip = thrust;
      let swayCos = -Math.cos(sway);
      let swaySin = -Math.sin(sway);
      let ee = S.add(S.scale(e, swayCos), [0,0,-swaySin]);
      let hip = S.add(body, S.scale(ee, yToHip));
      hip = S.add(hip, ixf0([ thrust*e[1]+side*e[0], thrust*e[0]-side*e[1], bounce*S.body3D[S.frame][2] ]));
      let knee = d.slice();
      ik(195*S.legLength,195*S.legLength,S.subtract(ankle[f], hip), knee);
      knee = S.add(hip, knee);
      m.save();
         m.translate([0,0,1]);
         m.save();
            m.translate(xf(knee));
            m.scale([.03,.03,.03]);
            //draw(S.sphereMesh, [1,1,1]);
         m.restore();
      m.restore();

      {
         let H = xf(hip);
         let K = xf(knee);
         let A = xf(ankle[f]);
         let K2H = S.subtract(H,K);
         let A2K = S.subtract(K,A);
	      // UPPER ARM CONNECTS TO HEAD
         m.save();
            m.translate(mix(K,H,1.5));
            m.aimz(K2H, xf0(d));
            m.scale([ .07, .04, S.norm(K2H) / 3 ]);
            draw(S.sphereMesh, [1,1,1]);
            m.save();
               m.translate([0, 0, 1]);
               m.scale([ 0.7,0.7,0.2 ]);
               draw(S.sphereMesh, [1,1,1]);
               let o = f == 0 ? -1 : 1;
               m.rotx(-2);
               m.roty(0.5 * o);
               m.save();
                  m.translate([0, 1, 3 * o]);
                  m.scale([1.5,2,4]);
                  draw(S.sphereMesh, [1,1,1]);
               m.restore();
            m.restore();
         m.restore();
        
      }
   }
`,
    events: `
   onPress = (x,y) => {S.y = y; S.x = x;}
   onDrag  = (x,y) =>{ 
                        S.rollView += S.y - y; S.y = y; 
                        S.rollViewY -= S.x - x; S.x = x;
                     }
`,
  };
};
