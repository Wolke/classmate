class GameModel {
    constructor() {
        this.dialogues = [];
        this.currentDialogueIndex = 0;
    }

    async loadDialoguesFromMD(url) {
        try {
            const response = await fetch(url);
            const mdContent = await response.text();
            this.parseDialogues(mdContent);
        } catch (error) {
            console.error('無法載入對話腳本:', error);
        }
    }

    parseDialogues(mdContent) {
        const lines = mdContent.split('\n');
        let currentDialogue = null;

        for (const line of lines) {
            if (line.startsWith('# ')) {
                if (currentDialogue) {
                    this.dialogues.push(currentDialogue);
                }
                currentDialogue = {
                    text: line.substring(2).trim(),
                    choices: [],
                    background: '',
                    character: ''
                };
            } else if (line.startsWith('- ')) {
                const choiceText = line.substring(2).trim();
                const [text, nextIndex] = choiceText.split('|');
                currentDialogue.choices.push({ text: text.trim(), nextIndex: parseInt(nextIndex.trim()) });
            } else if (line.startsWith('背景: ')) {
                currentDialogue.background = line.substring(4).trim();
            } else if (line.startsWith('角色: ')) {
                currentDialogue.character = line.substring(4).trim();
            }
        }

        if (currentDialogue) {
            this.dialogues.push(currentDialogue);
        }
    }

    getCurrentDialogue() {
        return this.dialogues[this.currentDialogueIndex];
    }

    setCurrentDialogueIndex(index) {
        this.currentDialogueIndex = index;
    }
}