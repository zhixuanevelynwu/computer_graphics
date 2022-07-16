rooms.example2Da = function () {
  lib2D();

  description = "Assignemnt Part 1 - 2D";

  code = {
    explanation: `
    S.html(\`
       A 2D canvas lets you create paths.
       <p>
       You can either
       draw <i>strokes</i> along those paths or else
       create solid shapes by <i>filling</i> those paths.
    \`);
  `,
    init: `
    S.x = 400;
    S.y = 400;
  `,
    assets: `
    S.line = (ax,ay,bx,by) => {
       S.context.beginPath();
       S.context.moveTo(ax,ay);
       S.context.lineTo(bx,by);
       S.context.stroke();
    }
  
    S.rect = (x,y,w,h) => {
       S.context.beginPath();
       S.context.rect(x,y,w,h);
  
       S.context.strokeStyle = 'white';
       S.context.stroke();
  
       if (S.isSpace) {
          S.context.fillStyle = 'gray';
          S.context.fill();
       }
    }
  `,
    render: `
    let ctx = S.context;

    let width = 300;
    let height = 100;
    
    ctx.translate(0, Math.sin(time) / 5);
    // ship body
    ctx.moveTo(S.x - width / 2, S.y - height / 2);
    ctx.lineTo(S.x + width, S.y - height / 2);
    ctx.lineTo(S.x + width - 50, S.y + height / 2);
    ctx.lineTo(S.x - width / 2 + 50, S.y + height / 2);
    ctx.lineTo(S.x - width / 2, S.y - height / 2);
    ctx.stroke();
    
    // pirate flag
    S.rect(S.x, S.y - height / 2 - 250, 10, 220);
    ctx.moveTo(S.x + 10, S.y - height / 2 - 250);
    ctx.bezierCurveTo(
      S.x + 160,
      S.y - 250,
      S.x + 160,
      100,
      S.x + 160,
      S.y - height / 2 - 230
    );
    ctx.lineTo(S.x + 130, S.y - height / 2 - 190);
    ctx.lineTo(S.x + 160, S.y - height / 2 - 150);
    ctx.bezierCurveTo(
      S.x + 160,
      S.y - 200,
      S.x + 160,
      220,
      S.x + 10,
      S.y - height / 2 - 150
    );
    ctx.stroke();
    
    // ship border
    S.rect(S.x - width / 2, S.y - height / 2 - 30, 450, 30);
    
    // water
    ctx.moveTo(0, S.y + height / 2);
    ctx.bezierCurveTo(
      S.x + 160,
      S.y - 50 - Math.sin(time) * 20,
      S.x + 150,
      500 - Math.sin(time) * 20,
      800,
      S.y + height / 2 - 25 + Math.sin(time) * 20
    );
    ctx.lineTo(800, 800);
    ctx.lineTo(0, 800);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "#000000";
    ctx.fill();
    
  `,
    events: `
    onDrag = (x,y) => {
       S.x = x;
       S.y = y;
    }
    onKeyPress   = key => S.isSpace = key == 32;
    onKeyRelease = key => S.isSpace = false;
  `,
  };
};
