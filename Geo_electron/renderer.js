const inputFolderButton = document.getElementById('inputFolderButton');
const outputFolderButton = document.getElementById('outputFolderButton');
const inputFolderPath = document.getElementById('inputFolderPath');
const outputFolderPath = document.getElementById('outputFolderPath');

inputFolderButton.addEventListener('click', async () => {
    const folderPath = await window.electronAPI.selectFolder();
    inputFolderPath.textContent = folderPath
        ? `Pasta de entrada: ${folderPath}`
        : 'Nenhuma pasta selecionada';
});

outputFolderButton.addEventListener('click', async () => {
    const folderPath = await window.electronAPI.selectFolder();
    outputFolderPath.textContent = folderPath
        ? `Pasta de saída: ${folderPath}`
        : 'Nenhuma pasta selecionada';
});
