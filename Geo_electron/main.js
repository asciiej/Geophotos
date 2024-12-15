const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
const exifParser = require('exif-parser');
const Jimp = require('jimp');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'IMG', 'logoGeoPhotos.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // Remove o menu padrão
    Menu.setApplicationMenu(null);

    mainWindow.loadFile('index.html');
});

ipcMain.handle('select-folder', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory'],
    });
    return result.filePaths[0];
});

ipcMain.handle('process-images', async (event, { inputDir, outputDir }) => {
    const files = fs.readdirSync(inputDir).filter(file => /\.(jpg|jpeg|png)$/i.test(file));
    const metadataList = [];

    for (const file of files) {
        const filePath = path.join(inputDir, file);
        const buffer = fs.readFileSync(filePath);
        const parser = exifParser.create(buffer);
        const exifData = parser.parse();

        if (exifData.tags.GPSLongitude && exifData.tags.GPSLatitude) {
            const longitude = exifData.tags.GPSLongitude;
            const latitude = exifData.tags.GPSLatitude;

            metadataList.push({ file, longitude, latitude });

            const outputImagePath = path.join(outputDir, file.replace(/\.\w+$/, '.jpeg'));
            const textOverlay = `Longitude: ${longitude.toFixed(5)}, Latitude: ${latitude.toFixed(5)}`;

            try {
                const image = await Jimp.read(filePath); // Lê a imagem
                const font = await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK); // Carrega a fonte

                const textWidth = Jimp.measureText(font, textOverlay);
                const textHeight = Jimp.measureTextHeight(font, textOverlay, textWidth);

                // Adiciona fundo branco para o texto
                image
                    .blit(
                        new Jimp(textWidth + 180, textHeight + 50, 0xffffffff), // Fundo branco
                        100,
                        image.bitmap.height - textHeight - 220
                    )
                    .print(
                        font,
                        180,
                        image.bitmap.height - textHeight - 180,
                        textOverlay
                    );

                // Salva a imagem processada
                await image.writeAsync(outputImagePath);
            } catch (error) {
                console.error(`Erro ao processar a imagem ${file}:`, error);
            }
        }
    }

    // Salva o arquivo de metadados
    const metadataFile = path.join(outputDir, 'metadata.txt');
    fs.writeFileSync(
        metadataFile,
        metadataList
            .map(data => `${data.file}: Longitude ${data.longitude}, Latitude ${data.latitude}`)
            .join('\n')
    );

    return metadataList.length;
});