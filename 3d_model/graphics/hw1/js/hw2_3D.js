
S.setVertexShader(`

   attribute vec3 aPos;
   varying   vec3 vPos;

   void main() {
      vPos = aPos;
      gl_Position = vec4(aPos, 1.);
   }

`)



S.setFragmentShader(`



   uniform float uTime, uSpace, uX, uY;
   varying vec3 vPos;

   float circle(vec2 p, float x, float y, float r) {
      x = p.x - x;
      y = p.y - y;
      return 1.-clamp(5. * (x*x + y*y - r*r), 0., 1.) *tan(uTime);
   }

   void main() {
      vec3 p = 8. * vPos + vec3(0., 0., .5*uTime);
      vec3 color = vec3(.4,0.4,0.6);
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


`)
