class GameView {
    constructor() {
        this.dialogueBox = document.getElementById('dialogue-box');
        this.choicesContainer = document.getElementById('choices');
        this.backgroundLayer = document.getElementById('background');
        this.characterLayer = document.getElementById('character');
    }

    renderDialogue(dialogue) {
        this.dialogueBox.innerHTML = marked.parse(dialogue.text);
        this.choicesContainer.innerHTML = '';
        dialogue.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.dataset.index = index;
            this.choicesContainer.appendChild(button);
        });

        this.backgroundLayer.style.backgroundImage = `url('${dialogue.background}')`;
        this.characterLayer.style.backgroundImage = `url('${dialogue.character}')`;
    }
}