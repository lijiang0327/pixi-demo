import * as PIXI from 'pixi.js';
import gsap from 'gsap';

const app = new PIXI.Application({
    background: '#1099bb',
    resizeTo: document.body,
    eventFeatures: {
        click: true,
    }
});

const bunny = PIXI.Sprite.from('https://pixijs.com/assets/bunny.png');

app.stage.addChild(bunny);

bunny.anchor.set(0.5);

bunny.x = app.screen.width * 0.5;
bunny.y = app.screen.height * 0.5;

bunny.eventMode = 'static';

app.stage.hitArea = new PIXI.Rectangle(0, 0, app.screen.width, app.screen.height);

app.stage.eventMode = 'static';


const container = new PIXI.Container();
app.stage.addChild(container);
container.width = app.screen.width;
container.height = app.screen.height;
container.x = app.screen.width * 0.5;
container.y = app.screen.height * 0.5;
container.pivot.x = app.screen.width * 0.5;
container.pivot.y = app.screen.height * 0.5;

container.rotation = 45 * Math.PI / 180;

const colors = ['#00ff00', '#ffffff', '#999999', '#ffff00', '#ff00ff', '#00ffff'];
const points = [];

for(let i = 0; i < 20; i++) {
    const gr = new PIXI.Graphics();
    gr.beginFill(colors[Math.floor(Math.random() * colors.length)]);
    gr.lineStyle(0);
    gr.drawCircle(0, 0, Math.random() * 2 + 2);
    gr.endFill();

    gr.x = Math.random() * app.screen.width;
    gr.y = Math.random() * app.screen.height;

    container.addChild(gr);
    points.push(gr);
}
let speed = 0;
const loop = () => {
    speed = Math.min(15, speed+1);

    points.forEach((gr) => {
        gr.x += speed;

        gr.scale.x = Math.max(1, 2 * speed);
        gr.scale.y = Math.max(0.2, 3 / speed);
        gr.alpha = Math.random() * 0.3 + 0.3;

        if (gr.x > 1000) {
            gr.x = 0
        }
    })
}

app.ticker.add(loop);

app.stage.on('mousemove', (event) => {
    gsap.to(bunny, {
        x: event.x,
        y: event.y,
        duration: 0.1,
        ease: 'power2.inOut'
    })
});

app.stage.on('pointerdown', () => {
    app.ticker.remove(loop);
    points.forEach((gr) => {
        gr.scale.x = 1;
        gr.scale.y = 1;
        gr.alpha = 1;
    })
});

app.stage.on('pointerup', () => {
    app.ticker.add(loop);
})

document.body.appendChild(app.view);
