
rooms.example3Da = function() {

lib3D();

description = 'Assignemnt Part 2 - 3D';

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

   float circle(vec2 p, float x, float y, float r) {
      x = p.x - x;
      y = p.y - y;
      return 1.-clamp(5. * (x*x + y*y - r*r), 0., 1.) *tan(uTime);
   }

   void main() {
      vec3 p = 8. * vPos + vec3(0., 0., .5*uTime);
      vec3 color = vec3(.4,0.4,0.4);
      color -= circle(vPos.xy, 0., 0., 1.);
      color += circle(vPos.xy, 0., 0., .9);
      color -= circle(vPos.xy, 0., 0., .8);
      color += circle(vPos.xy, 0., 0., .7);
      color -= circle(vPos.xy, 0., 0., .6);
      color += circle(vPos.xy, 0., 0., .5);
      color -= circle(vPos.xy, 0., 0., .4);
      color += circle(vPos.xy, 0., 0., .3);
      color -= circle(vPos.xy, 0., 0., .2);
      color += circle(vPos.xy, 0., 0., .1);

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

