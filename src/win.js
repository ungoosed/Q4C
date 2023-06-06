
export class Win extends Phaser.Scene {
    constructor() {
        super({ key: 'win' })
    }

    create() {
        this.dialogueText = this.add.text(30, 200, 'Congratulations to all the players who embarked on this epic journey. You have successfully completed The Quest of Conception. Thanks for playing this game!', {
            lineSpacing: 5,
            fontSize: 24,
            fontFamily: 'Mainport',
            align: "left",
            wordWrap: { width: 690 }
      
          }).setFontSize(20).setDepth(3)


    }
}
