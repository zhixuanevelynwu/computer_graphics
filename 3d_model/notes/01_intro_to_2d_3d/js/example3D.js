
rooms.example3D = function() {

lib3D();

description = 'Interactive WebGL<br>on a single square.';

code = {
'explanation': `
   S.html(\`
      Most of the work happens in a fragment shader.
      <p>
      Input to the fragment shader is x,y and time: <code>uPos, uTime</code>
      <p>
      We can also interact by adding information about the cursor: <code>uX,uY</code>
      <p>
      Output at each fragment is: red,green,blue,alpha
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



   uniform float uTime, uSpace, uX, uY;
   varying vec3 vPos;

   float turbulence(vec3 p) {
      float t = 0., f = 1.;
      for (int i = 0 ; i < 10 ; i++) {
         t += abs(noise(f * p)) / f;
         f *= 2.;
      }
      return t;
   }

   float disk(vec2 p, float x, float y, float r) {
      x = p.x - x;
      y = p.y - y;
      return 1.-clamp(10. * (x*x + y*y - r*r), 0., 1.);
   }

   vec3 stripes(float x) {
      float t = pow(sin(x) * .5 + .5, .1);
      return vec3(t, t*t, t*t*t);
   }

   vec3 clouds(float y) {
      vec3 sky = vec3(.3,.6,1.);
      float s = mix(.6,1., clamp(3.*y-2., 0.,1.));
      return mix(sky, vec3(s), clamp(.5*y,0.,1.));
   }

   void main() {
//    vec3 p = 6.*vPos; // THESE TWO LINES MAKE MARBLE
//    vec3 color = stripes(p.x+5.*turbulence(p/5.));
      vec3 p = 8. * vPos + vec3(0., 0., .5*uTime);
      vec3 color = clouds(vPos.y+2.*turbulence(p/10.));
      color *= disk(vPos.xy, 0., 0., .5);
      gl_FragColor = vec4(sqrt(color), 1.);
   }


\`)
`,
render: `
   S.setUniform('1f', 'uTime', time);
   S.gl.drawArrays(S.gl.TRIANGLE_STRIP, 0, 4);
`,
events: `
   onDrag = (x,y) => {
      S.setUniform('1f', 'uX', x);
      S.setUniform('1f', 'uY', y);
   }
   onKeyPress  =k=>S.setUniform('1f','uSpace',k==32);
   onKeyRelease=k=>S.setUniform('1f','uSpace',false);
`
}

}

