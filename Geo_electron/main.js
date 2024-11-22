const { app, BrowserWindow, ipcMain, dialog } = require('electron');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: __dirname + '/preload.js',
            contextIsolation: true,
            enableRemoteModule: false,
        },
    });

    mainWindow.loadFile('index.html');
});

// Seleção de pasta de entrada
ipcMain.handle('select-folder', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory']
    });
    return result.filePaths[0] || null; // Retorna o caminho ou null caso o usuário cancele
});
