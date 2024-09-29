document.addEventListener('DOMContentLoaded', async () => {
    const model = new GameModel();
    await model.loadDialoguesFromMD('dialogues.md');
    const view = new GameView();
    const controller = new GameController(model, view);
});