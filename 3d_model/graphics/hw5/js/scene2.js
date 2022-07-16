rooms.scene2 = function () {
  lib3D2();

  description = `<b>Bee and Honey Barrel</b>
                <p>
                Try click and drag on the canvas!
                <br/> 
                </p>    
                <input type=range id=spd> Wing Speed
                <br/> 
                <br/> 
                `;

  code = {
    init: `
    
   S.squareMesh = [ -1, 1, 0,  0,0,1,  0,1,
                      1, 1, 0,  0,0,1,  1,1,
                     -1,-1, 0,  0,0,1,  0,0,
                     1,-1, 0,  0,0,1,  1,0 ];

   S.BezierM = [-1, 3,-3, 1,
               3,-6, 3, 0,
               -3, 3, 0, 0,
               1, 0, 0, 0 ];

   S.CatromM = [ -1/2,  1 ,-1/2, 0,
                  3/2,-5/2,  0 , 1,
                  -3/2,  2 , 1/2, 0,
                  1/2,-1/2,  0 , 0 ];

   S.BsplinM = [ -1/6,  3/6, -3/6,  1/6,
                  3/6, -6/6,  0/6,  4/6,
                  -3/6,  3/6 , 3/6,  1/6,
                  1/6,  0/6,  0/6,  0/6 ];
 
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

    S.ringMesh = uvMesh((u,v) => {
      let theta = 2 * Math.PI * u;
      let phi = 2 * Math.PI * v;
      let cu = Math.cos(theta);
      let su = Math.sin(theta);
      let cv = Math.cos(phi);
      let sv = Math.sin(phi);
      let r = 0.2;
      return [cu * (1 + r * cv), su * (1 + r * cv), r * sv,
              cu * cv, su * cv, sv,
               u, v];
   }, 20, 10);

   let spline = (K, t) => {
      let p = [];
      let A = K[0],
        B = K[1],
        C = K[2],
        D = K[3];
      for (let i = 0; i < A.length; i++) {
        let F = matrixMultiply(S.BsplinM, [A[i], B[i], C[i], D[i]]);
        p.push(t * t * t * F[0] + t * t * F[1] + t * F[2] + F[3]);
      }
      return p;
    };
    
    S.computeCurve = () => {
      let K = [
        [105, 220],
        [130, 250],
        [124, 250],
        [110, 200],
      ];
      (A = K[0]), (B = K[1]), (C = K[2]), (D = K[3]);
      let J = [
        [A, A, B, C],
        [A, B, C, D],
        [B, C, D, D],
      ];
    
      let curve = [];
      for (let i = 0; i < J.length; i++) {
        let k = 0;
        for (let j = 0; j < 1; j += 0.01) {
          k++;
          if (k % 10 == 0) curve.push(spline(J[i], j)[0]);
        }
      }
      return curve;
    };

    let uvMeshSpline = (ru, rl, f, nu, nv) => {
      let mesh = [];
      for (let iv = 0; iv < nv; iv++) {
         let v = iv / nv;
         let strip = [];
         for (let iu = 0; iu <= nu; iu++) {
            let u = iu / nu;
            strip = strip.concat(f(ru, rl, u, v));
            strip = strip.concat(f(ru, rl, u, v + 1 / nv));
         }
         mesh = glueMeshes(mesh, strip);
      }
      return mesh;
   };
   
   S.splineMesh = (ru, rl) => {
      return uvMeshSpline(
         ru,
         rl,
         (ru, rl, u, v) => {
            let theta = 2 * Math.PI * u;
            let cu = Math.cos(theta) * (ru + v * (rl - ru));
            let su = Math.sin(theta) * (ru + v * (rl - ru));
            return [cu, su, v, cu, su, v, u, v];
         },
         20, 10);
   };

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

    S.turnX = 0;
    S.turnY = 0;
 `,
    assets: `
   // TAKE POINTS AS ARGUMENTS FOR DRAWING.

   S.beginPath = () => S.context.beginPath();
   S.moveTo    = p  => S.context.moveTo(p[0],p[1]);
   S.lineTo    = p  => S.context.lineTo(p[0],p[1]);
   S.stroke    = () => S.context.stroke();

   // SHAPE DRAWING FUNCTIONS.

   S.line = (a,b) => {
      S.beginPath();
      S.moveTo(a);
      S.lineTo(b);
      S.stroke();
   }

   S.bezierPoint = (a,b,c,d, t) =>
      mix( mix( mix(a,b,t),
               mix(b,c,t), t),
            mix( mix(b,c,t),
               mix(c,d,t), t), t);

   S.circle = (C,r,color) => {
      let P = theta => [
         C[0] + r * Math.cos(theta),
         C[1] + r * Math.sin(theta)
      ];
      if (color)
         S.context.strokeStyle = color;
      S.beginPath();
      S.moveTo(P(0));
      let n = 20;
      for (let i = 1 ; i <= n ; i++)
         S.lineTo(P(2 * Math.PI * i/n));
      S.stroke();
   }

   // VECTOR MATH FUNCTIONS.

   S.add = (a,b) => {
      let c = [];
      for (let i = 0 ; i < a.length ; i++)
         c.push(a[i] + b[i]);
      return c;
   }
   S.cross = (a,b) => {
      return [a[1]*b[2] - a[2]*b[1],
               a[2]*b[0] - a[0]*b[2],
               a[0]*b[1] - a[1]*b[0]];
   }
   S.distance = (a,b) => {
      let dd = 0;
      for (let i = 0 ; i < a.length ; i++)
         dd += (a[i] - b[i]) * (a[i] - b[i]);
      return Math.sqrt(dd);
   }
   S.norm = a => {
      let s = 0;
      for (let i = 0 ; i < a.length ; i++)
         s += a[i] * a[i];
      return Math.sqrt(s);
   }
   S.normalize = a => {
      return S.scale(a, 1 / S.norm(a));
   }
   S.scale = (a,s) => {
      let c = [];
      for (let i = 0 ; i < a.length ; i++)
         c.push(a[i] * s);
      return c;
   }
   S.subtract = (a,b) => {
      let c = [];
      for (let i = 0 ; i < a.length ; i++)
         c.push(a[i] - b[i]);
      return c;
   }
   S.copy = a => a.slice();

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
    S.setUniform('Matrix4fv', 'uPerspective', false,
       [1,0,0,0, 0,1,0,0, 0,0,1,-.1, 0,0,0,1]);
 
    let m = new Matrix();
 
    let draw = (mesh, color) => {
       S.setUniform('3fv', 'uColor', color);
       S.drawMesh(mesh, m.get());
    }

   let splineBarrel = () => {
      m.save();
      let curve = S.computeCurve();
      m.scale([0.001,0.001,0.007]);
      for (let i = 0; i < 23; i++){
         m.translate([0,0,1]); 
         draw(S.splineMesh(curve[i],curve[i+1]), [1, .8, .2]);
      }
      m.restore();

      m.save();
         m.scale([0.095,0.095,0.1]);
         draw(S.ringMesh, [0.9,0.5,0.1]);
      m.restore();

      m.save();
         m.scale([0.1,0.1,0.1]);
         m.translate([0,0,1.8]);
         draw(S.ringMesh, [0.9,0.5,0.1]);
      m.restore();
   }
 
    // Draw background
    m.save();
    m.translate([0,0,-3]);
    draw(S.cubeMesh, [.9,.95,1]);
    m.restore();

   // experimental drawing
   m.save();
      m.translate([0,0,-1.9]);
      m.scale([0.9,0.9,0.9]);
      draw(S.squareMesh, [.9,.9,1]); 
      m.save();
         m.scale([0.85,0.85,0.9]);
         draw(S.squareMesh, [.9,.85,1]); 
            m.save();
               m.scale([0.85,0.85,0.9]);
               draw(S.squareMesh, [.9,.75,1]); 
               m.save();
                  m.scale([0.85,0.85,0.9]);
                  draw(S.squareMesh, [.9,.65,1]); 
               m.restore();
            m.restore();
      m.restore();
   m.restore();

   /*   SPLINE START   */
   m.save();
      m.translate([0, -.1, 0]);
      m.rotx(0.2 * Math.cos(time) + .2);
      m.rotx(-1.5);
      splineBarrel();
   m.restore();
   /*   SPLINE END    */
   // end experiments

   // FLOWER
   let flower = (T) => {
      m.save();
         m.translate(T);
         m.roty(Math.cos(time));
         let offset = 0;
         for (let i = 0; i < 5; i++) {
            m.save();
               m.rotz(offset);
               m.save();
                  m.roty(-0.5);
                  m.translate([0,.08,0])
                  m.scale([.05,.05,.02]);
                  draw(S.sphereMesh, [1,1,1]);
               m.restore();
               m.save();
                  m.roty(0.5);
                  m.translate([0,.08,0])
                  m.scale([.05,.05,.02]);
                  draw(S.sphereMesh, [1,1,1]);
               m.restore();
            m.restore();
            offset += 1.25;
         }
         m.save();
            m.translate([0,0,0]);
            m.scale([.04,.04,.04]);
            draw(S.sphereMesh, [1,.95,.6]);
         m.restore();
      m.restore();
   }

   //flower([0,0,-0.3]);
   flower([0.5,0.5,-0.3]);
   flower([-0.5,-0.5,-0.3]);
   flower([-0.5,0.5,-0.3]);
   flower([0.5,-0.5,-0.3]);

    // ANIMATED POSITION
    m.identity();
    m.roty(.5*Math.cos(2*time) + .9);
    m.rotx(.2*Math.cos(time));
    m.roty(2 * S.turnX);
    m.rotx(2 * S.turnY);


   let K = [[.100,.250,0],
            [.200,.050,0],
            [.360,.050,0],
            [.460,.250,0]];
   let t = 0.5 * Math.cos(time);
   let A=K[0],B=K[1],C=K[2],D=K[3];

    // HEAD
    m.save();
      m.translate(bezier(A,B,C,D,t));
      m.translate([Math.sin(time/2) / 2 - 0.1, Math.cos(time/2) / 2, 0]);

    m.save();
       m.scale([.08,.08,.08]);
       draw(S.sphereMesh, [1,.95,.5]); // face
       m.save();
         m.roty(-1.1);
         m.rotz(.18);

         //EAR
         m.save();
            m.rotz(-0.3);
            m.save();
               m.translate([-1,0.45,0.3]);
               m.scale([.3,.1,.1]);
               draw(S.sphereMesh, [.2,.2,.2]);
            m.restore();
         m.restore();

         m.save();
            m.rotz(0.3);
            m.save();
               m.translate([0.9,0.5,0.3]);
               m.scale([.3,.1,.1]);
               draw(S.sphereMesh, [.2,.2,.2]);
            m.restore();
         m.restore();

   
         // EYES
         m.save();
            m.translate([-0.4,-0.3,.9]);
            m.scale([.15,.15,.12]);
            draw(S.sphereMesh, [.2,.2,.2]);
         m.restore();
   
         m.save();
            m.translate([0.4,-0.3,.9]);
            m.scale([.15,.15,.12]);
            draw(S.sphereMesh, [.2,.2,.2]);
         m.restore();
      m.restore();
   
    m.restore();
 
    // TORSO
    m.save();
       m.translate([0.1, 0,0]); 
       m.save();
          m.scale([.08,.07,.06]);
          draw(S.sphereMesh, [.25,.25,.25]);
       m.restore();
    m.restore();

    // WINGS
    m.save();
    m.rotx(-.3);
    m.rotz(-.2 * Math.cos(spd.value/5*time));
       m.translate([0.12, 0,.07]); 
       m.save();
          m.scale([.04,.01,.05]);
          draw(S.sphereMesh, [.9,.98,.98]);
       m.restore();
    m.restore();
    m.save();
      m.rotx(-.3);
      m.rotz(-.2 * Math.cos(spd.value/5*time));
      m.translate([0.12, 0,-.07]); 
      m.save();
         m.scale([.04,.01,.05]);
         draw(S.sphereMesh, [.9,.98,.98]);
      m.restore();
   m.restore();

   // SPIKE
   m.save();
       m.translate([0.17, 0,0]); 
       m.save();
          m.scale([.03,.01,.01]);
          draw(S.sphereMesh, [.6,.6,.6]);
       m.restore();
    m.restore();

    m.restore();
    

 `,
    events: `
      onPress = (x,y) => {
         S.x = x; 
         S.y = y;
      };
      onDrag = (x,y) => { 
         S.turnX += x - S.x; 
         S.turnY -= y - S.y; 
         S.x = x; 
         S.y = y;
      };
      
 `,
  };
};
