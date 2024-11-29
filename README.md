# Geophotos

**Geophotos** é uma aplicação desktop desenvolvida com Electron que processa imagens, extraindo dados EXIF (longitude e latitude) e adicionando essas informações diretamente nas imagens. Além disso, o aplicativo gera um arquivo de texto com os nomes das imagens e suas coordenadas geográficas.

## 🖼️ Funcionalidades

- Seleção de uma pasta de entrada contendo imagens.
- Processamento automático das imagens que possuem dados EXIF de localização.
- Adição de um retângulo no canto inferior esquerdo das imagens com as coordenadas (longitude e latitude).
- Geração de um arquivo `metadata.txt` contendo os nomes das imagens e suas coordenadas.
- Seleção de uma pasta de saída para salvar as imagens processadas e o arquivo de metadados.

## 🚀 Tecnologias Utilizadas

- **Electron**: Framework para desenvolvimento de aplicações desktop multiplataforma.
- **Sharp**: Biblioteca para processamento e manipulação de imagens.
- **EXIF Parser**: Biblioteca para extração de metadados EXIF.
- **HTML/CSS/JavaScript**: Tecnologias para desenvolvimento da interface gráfica.

## 📂 Estrutura do Projeto

```plaintext
/Geophotos
│
├── main.js         # Arquivo principal da aplicação (processo principal)
├── renderer.js     # Lógica do frontend
├── preload.js      # Comunicação segura entre o processo principal e o frontend
├── index.html      # Arquivo da interface do usuário
├── package.json    # Configuração e dependências do projeto
└── README.md       # Documentação do projeto
