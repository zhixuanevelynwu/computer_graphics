/*
   lib3D.js -> lib3D2.js
   vertex -> 8 numbers
   	const VERTEX_MESH = 8;
	...
	S.VERTEX_MESH = VERTEX_MESH;
   square mesh
   glueMeshes function
   uvMesh function
   sphereMesh
   pass in uMatrix and uInvMatrix to vertexShader
   	apply to aPos -> pos -> vPos
	         aNor -> nor -> vNor
                 gl_Position = pos;
   S.drawMesh(mesh, matrix)
   create Matrix class
   two spheres
   modify z in vertexShader
                 gl_Position = pos * vec4(1.,1.,-.01,1.);
   create perspectiveMatrix
   pass in uPerspective to vertexShader
   transformMesh
   cubeMesh
   add save / restore to Matrix class
*/

rooms.scene2 = function () {
  lib3D2();

  description = `<b>Teddy Bear</b>
               <p>
               Because it is Halloween, <br/>I decide to make a slightly<br/> creepy teddy bear with potbelly.`;

  code = {
    init: `
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

/*
   let uvMesh = (f,nu,nv) => {
      let addVertex = V => {
         mesh = mesh.concat(V);
      }
      let mesh = [];
      for (let iv = 0 ; iv < nv ; iv++) {
         let v = iv / nv;
         if (iv > 0)
	    addVertex(f(0,v));
         for (let iu = 0 ; iu <= nu ; iu++) {
	    let u = iu / nu;
	    addVertex(f(u,v));
	    addVertex(f(u,v+1/nv));
	 }
	 addVertex(f(1,v+1/nv));
      }
      return mesh;
   }
*/

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
   const int nS = 1;
   const int nSm = 1;
   const int nL = 2;

   uniform vec3 uLd[nL];
   uniform vec3 uLc[nL];

   uniform vec4 uS[nS];
   uniform mat4 uSm[nSm];

   uniform mat4 uCIM;
   uniform vec4 uCube[6];

   uniform mat4 uQ[2];

   uniform float uTime;

   uniform vec3 uColor;
   varying vec3 vPos, vNor;

   float raySphere(vec3 V, vec3 W, vec4 S) {
      V = V - S.xyz + .001 * W;
      float b = dot(V, W);
      float d = b * b - dot(V, V) + S.w * S.w;
      return d < 0. ? -1. : -b - sqrt(d);
   }


   vec3 shadeSurface(vec3 P, vec3 W, vec3 N, mat4 m) {
      vec3 Ambient  = m[0].rgb;
      vec3 Diffuse  = m[1].rgb;
      vec4 Specular = m[2];

      vec3 c = Ambient;
      for (int l = 0 ; l < nL ; l++) {

         // ARE WE SHADOWED BY ANY OTHER SPHERE?

         float t = -1.;
         for (int n = 0 ; n < nS ; n++)
            t = max(t, raySphere(P, uLd[l], uS[n]));

         // IF NOT, ADD LIGHTING FROM THIS LIGHT

         if (t < 0.) {
            vec3 R = 2. * dot(N, uLd[l]) * N - uLd[l];
            c += uLc[l] * (Diffuse * max(0., dot(N, uLd[l])) + 
               Specular.xyz * pow(max(0., dot(R,-W)), Specular.w));
         }
      }

      return c;
   }
   
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

   // ANIMATED POSITION
   m.identity();
   m.roty(.5 * Math.cos( time));

   // FACE
   m.save();
      m.scale([.28,.25,.25]);
      draw(S.sphereMesh, [1,.7,.6]);

      //EAR
      m.save();
         m.translate([-0.9,0.5,0.3]);
         m.scale([.3,.3,.1]);
         draw(S.sphereMesh, [1,.7,.6]);
      m.restore();
      m.save();
         m.translate([0.9,0.5,0.3]);
         m.scale([.3,.3,.1]);
         draw(S.sphereMesh, [1,.7,.6]);
      m.restore();

      //NOSE
      m.save();
         m.translate([0,-0.5,.9]);
         m.scale([.15,.1,.1]);
         draw(S.sphereMesh, [.4, .3, .2]);
      m.restore();

      // EYES
      m.save();
         m.translate([-0.4,-0.3,.9]);
         m.scale([.12,.12,.03]);
         draw(S.sphereMesh, [.4,.4,.5]);

         m.rotz(.8)
         m.save();
            m.translate([0,0,1]);
            m.scale([.1,.8,.1]);
            draw(S.sphereMesh, [.9, .9, .9]);
         m.restore();

         m.rotz(-1.5)
         m.save();
            m.translate([0,0,1]);
            m.scale([.1,.8,.1]);
            draw(S.sphereMesh, [.9, .8, .7]);
         m.restore();
      m.restore();

      m.save();
         m.translate([0.4, -0.3, .9]);
         m.scale([.08,.08,.03]);
         draw(S.sphereMesh, [.6,.3,.3]);
         m.save();
            m.translate([0,0,1]);
            m.scale([.9,.9,.03]);
            draw(S.sphereMesh, [.9, .7, .7]);
            m.save();
               m.translate([-.3,0,1]);
               m.scale([.1,.3,.9]);
               draw(S.sphereMesh, [0, 0, 0]);
            m.restore();
            m.save();
               m.translate([.3,0,1]);
               m.scale([.1,.3,.9]);
               draw(S.sphereMesh, [0, 0, 0]);
            m.restore();
         m.restore();
      m.restore();

   m.restore();

   // TORSO
   m.save();
      m.translate([0,-.16,-.05]); // MOVE FROM CENTER OF HEAD DOWN TO NECK
      //m.rotz(Math.cos(time)); // ROTATE ABOUT THE NECK
      m.save();
         m.translate([0,-.2,0]);  // RENDER THE TORSO
         m.scale([.21,.2,.2]);
         draw(S.sphereMesh, [1,.7,.6]);

         // ARM
         m.save();
            m.rotz(-.4)
            m.translate([-.9,.1,0]);  
            m.scale([.4,.7,.4]);
            draw(S.sphereMesh, [1,.7,.6]);
         m.restore();

         m.save();
            m.rotz(.4)
            m.translate([.9,.1,0]);  
            m.scale([.4,.7,.4]);
            draw(S.sphereMesh, [1,.7,.6]);
         m.restore();

         // LEG
         m.save();
            //m.rotz(-.4)
            m.translate([-.6,-.5,0.2]);  
            m.scale([.4,.7,.4]);
            draw(S.sphereMesh, [1,.7,.6]);
         m.restore();

         m.save();
            //m.rotz(-.4)
            m.translate([.6,-.5,0.2]);  
            m.scale([.4,.7,.4]);
            draw(S.sphereMesh, [1,.7,.6]);
         m.restore();


      m.restore();
   m.restore();
`,
    events: `
   ;
`,
  };
};
