export function preload (this: any)
{
    this.load.setBaseURL('http://localhost:3000');

    this.load.image('bg', 'assets/bg.png');
    this.load.image('logo', 'assets/logo.png');
    this.load.image('orb', 'assets/glow-orb.png');
}

export function create (this: any)
{
    this.add.image(400, 300, 'bg');

    const particles = this.add.particles('orb');

    const emitter = particles.createEmitter({
        speed: 100,
        scale: {start: 1, end: 0},
        blendMode: 'ADD'
    });

    const logo = this.physics.add.image(400, 100, 'logo');

    logo.setScale(0.45);
    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
}
