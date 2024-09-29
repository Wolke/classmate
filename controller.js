class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }

    init() {
        this.updateView();
        this.view.choicesContainer.addEventListener('click', this.handleChoice.bind(this));
    }

    updateView() {
        const currentDialogue = this.model.getCurrentDialogue();
        this.view.renderDialogue(currentDialogue);
    }

    handleChoice(event) {
        if (event.target.tagName === 'BUTTON') {
            const choiceIndex = event.target.dataset.index;
            const nextDialogueIndex = this.model.getCurrentDialogue().choices[choiceIndex].nextIndex;
            if (nextDialogueIndex === -1) {
                alert('遊戲結束!');
                return;
            }
            this.model.setCurrentDialogueIndex(nextDialogueIndex);
            this.updateView();
        }
    }
}