const selectInputFolderBtn = document.getElementById('select-input-folder');
const selectOutputFolderBtn = document.getElementById('select-output-folder');
const processImagesBtn = document.getElementById('process-images');
const inputFolderLabel = document.getElementById('input-folder');
const outputFolderLabel = document.getElementById('output-folder');

let inputFolder = '';
let outputFolder = '';

selectInputFolderBtn.addEventListener('click', async () => {
    inputFolder = await window.electronAPI.selectFolder();
    inputFolderLabel.textContent = inputFolder;
    inputFolderLabel.classList.add('folder-label'); //criação de classe para alterar a cor para verde
});

selectOutputFolderBtn.addEventListener('click', async () => {
    outputFolder = await window.electronAPI.selectFolder();
    outputFolderLabel.textContent = outputFolder;
    outputFolderLabel.classList.add('folder-label'); //criação de classe para alterar a cor para verde
});

processImagesBtn.addEventListener('click', async () => {
    if (!inputFolder || !outputFolder) {
        alert('Selecione as pastas de entrada e saída!');
        return;
    }

    const count = await window.electronAPI.processImages({ inputDir: inputFolder, outputDir: outputFolder });
    alert(`${count} imagens processadas!`);
});
