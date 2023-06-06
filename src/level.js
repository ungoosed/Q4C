
export class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'level' })
    }

    kill() {
        this.physics.pause();
        this.scene.stop('level')
        this.scene.stop('hud')
        global.health = 100;
        this.registry.set('health', global.health)
        this.scene.start('dead')
        console.log('die')
    }

    create() {
        
        console.log(this.registry.get('tube'))
        if (this.registry.get('tube') == 0) {
            this.egg = this.physics.add.sprite(3018, 512, 'egg')
        } else {
            this.egg = this.physics.add.sprite(13157, 610, 'egg')

        }
        this.egg.depth = 10
        this.egg.setScale(0.5)
        global.checkpoint = { x: 7060, y: 20875 };

        global.player = this.physics.add.sprite(global.checkpoint.x, global.checkpoint.y, 'sperm').setScale(3)
        this.map = this.make.tilemap({ key: 'map', tileWidth: 16, tileHeight: 16 })
        const tileset = this.map.addTilesetImage('organ', 'tiles')
        global.body = this.map.createLayer('body', tileset, 0, 0).setScale(4)
        global.acid = this.map.createLayer('acid', tileset, 0, 0).setScale(4)

        global.walls = this.map.createLayer('top', tileset, 0, 0).setScale(4)
        global.acid.setDepth(7)
        global.player.setDepth(8);
        global.player.setSize(7, 7);
        

        global.cursors = this.input.keyboard.createCursorKeys();
        this.cameras.main.setBounds(0, 0,);
        this.cameras.main.startFollow(global.player);

        this.physics.add.collider(global.player, global.acid)
        this.physics.add.collider(global.player, global.walls)
        global.walls.setCollisionBetween(1, 7)
        global.walls.setDepth(1)

        global.acid.setTileIndexCallback([9, 10, 11, 12, 13, 14, 15, 16], () => {
            global.health = global.health - 1;
            this.registry.set('health', global.health)
        })


        global.player.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('sperm', { start: 0, end: 8 }),
            frameRate: 18,
            repeat: -1
        });

        const spriteConfig = {
            key: 'antibody', frame: 0, scale: 4
        }
        this.enemyGroup = this.physics.add.group()
        const enemyArray = this.map.createFromTiles(4, 8, spriteConfig, null, null, 'acid')
        for (let i = 0; i < enemyArray.length; i++) {
            enemyArray[i].setScale(4).setDepth(8)
            this.enemyGroup.add(enemyArray[i])
            enemyArray[i].body.setSize(10, 10)
        }



        this.enemyGroup.getChildren().forEach(function (enemy) {
            this.physics.add.collider(enemy, global.walls);
            global.walls.setCollisionBetween(1, 7)
        }, this)

        this.enemyGroup.getChildren().forEach(function (enemy) {

            enemy.anims.create({
                key: 'attack',
                frames: enemy.anims.generateFrameNumbers('antibody', { start: 0, end: 16 }),
                frameRate: 16,
                repeat: -1
            });
            enemy.anims.create({
                key: 'attack2',
                frames: enemy.anims.generateFrameNumbers('antibody', { start: 9, end: 16 }),
                frameRate: 7,
                repeat: -1
            });

        })
        global.that = this;
        this.physics.add.overlap(global.player, this.egg, ()=>{
            global.that.registry.set('dlevel', 15)
            console.log(global.that.registry.get('dlevel'))
            global.that.physics.pause();

        })

    }


    update(time, delta) {
        this.registry.set('playerX', global.player.x)
        this.registry.set('playerY', global.player.y)
        
        const outThis = this;
        this.enemyGroup.getChildren().forEach(function (enemy) {
            const dist = Phaser.Math.Distance.Between(enemy.x, enemy.y, global.player.x, global.player.y)
            if (dist <= 2000) {
                if (dist <= 60) {
                    global.health = global.health -1;
                    enemy.anims.play('attack', true)

                    this.physics.moveToObject(enemy, global.player, 400);
            
                    setTimeout(() => {

                        global.health--
                    }, 10)

                } else {
                    
                    this.physics.moveToObject(enemy, global.player, 300);
                }
            }
        }, this)

        var rotationSpeed = 1 * Math.PI;
        if (global.cursors.left.isDown || global.cursors.right.isDown || global.cursors.down.isDown || global.cursors.up.isDown) {
            global.player.rotation = Phaser.Math.Angle.RotateTo(global.player.rotation, global.player.body.angle + 1.6, rotationSpeed * 0.003 * delta);

            global.player.anims.play('run', true)

        } else {
            global.player.anims.stop()
        }
        global.player.setVelocityX(0);
        global.player.setVelocityY(0);
        if (global.cursors.up.isDown) {
            global.player.setVelocityY(-global.speed)


        }
        if (global.cursors.down.isDown) {
            global.player.setVelocityY(global.speed)


        }
        if (global.cursors.left.isDown) {
            global.player.setVelocityX(-global.speed)

        }
        if (global.cursors.right.isDown) {
            global.player.setVelocityX(global.speed)

        }
        if (global.health <= 0) {
            this.kill()

        }


    }
}

const global = { speed: 300, health: 100 }
