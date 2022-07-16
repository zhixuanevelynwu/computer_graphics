rooms.example3D = function () {
  lib3D();

  description = "Raytracing 3D Spheres";

  code = {
    init: `
 
    // ADD INTERACTIVE WIDGETS TO THE HTML PAGE.
 
    setDescription(description + \`
       <p>
           <input type=range id=ligting   > red
       <br><input type=range id=green > green
       <br><input type=range id=blue  > blue
       <p>
           <input type=range id=radius> radius
    \`);
 `,
    vertex: `
 S.setVertexShader(\`
 
    attribute vec3 aPos;
    varying   vec3 vPos;
 
    void main() {
       vPos = aPos;
       gl_Position = vec4(aPos, 1.);
    }
 
 \`)
 `,
    fragment: `
 S.setFragmentShader(\`
   const int nL = 2;
   const int nS = 2;
 
   uniform vec3 uLd[nL];
   uniform vec3 uLc[nL];
 
   uniform float uTime;
   varying vec3 vPos;
 
   float fl = 3.;
   vec4 S[nS];
 
 
   vec3 bgColor = vec3(.1,.2,.5);
 
   vec3 Ambient = bgColor;
   vec3 Diffuse = vec3(.9);
   vec4 Specular = vec4(1.,1.,1.,10); // (r,g,b,power)
 
   float raySphere(vec3 V, vec3 W, vec4 S) {
     V -= S.xyz;
     float b = dot(V, W);
     float d = b*b - dot(V, V) + S.w*S.w;
     return d < 0. ? -1. : -b - sqrt(d); 
   }
 
   vec3 shadeSphere(vec3 P, vec4 S) {
     vec3 N = normalize(P - S.xyz);
     vec3 c  = Ambient;
     for (int l = 0; l < nL; l++) {
       c += Diffuse * max(0., dot(N, uLd[l])) * uLc[l];
     }
     return c;
   }
 
   void main() {
       // stop setting Ld and Lc here since they are now uniform
       // set them in render
 
       // 2 spheres
       S[0] = vec4(.2,.2,0.3 * sin(uTime),.3);
       S[1] = vec4(-.1,0.,0.,.3);
 
       vec3 color = bgColor;
 
       vec3 V = vec3(0., 0., fl); // origin
       vec3 W = normalize(vec3(vPos.xy, -fl)); // direction
 
       float tMin = 10000.;
       for (int n = 0; n < nS; n++) {
           float t = raySphere(V, W, S[n]);
           if (t > 0. && t < tMin) {
               color = shadeSphere(V + t * W, S[n]);
               tMin = t;
           }
       }
 
       // display
       gl_FragColor = vec4(sqrt(color), 1.);
   }
    
 \`);
 
 `,
    render: `
    S.setUniform('1f', 'uTime', time); // S - shared data
    
    // setting light source in JS
    S.setUniform('3fv', 'uLd', [
       .57, .57, .57,
       -.57, -.57, -.57]); // 3f - 3 floats for vec3 of S
 
    S.setUniform('3fv', 'uLc', [
       1,1,0,
       .5,.3,.1
    ]);
 
    S.gl.drawArrays(S.gl.TRIANGLE_STRIP, 0, 4);
 `,
    events: `
    onDrag = (x,y) => {
       S.setUniform('1f', 'uX', x);
       S.setUniform('1f', 'uY', y);
    }
    onKeyPress  =k=>S.setUniform('1f','uSpace',k==32);
    onKeyRelease=k=>S.setUniform('1f','uSpace',false);
 `,
  };
};
