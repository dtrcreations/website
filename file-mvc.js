// search functionality
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        // make API call to search for songs
        fetch(`https://api.example.com/search?q=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                const resultsHtml = data.results.map(result => {
                    return `
                        <li>
                            <a href="${result.url}">${result.title}</a>
                        </li>
                    `;
                }).join('');
                searchResults.innerHTML = resultsHtml;
            })
            .catch(error => console.error(error));
    }
});

// download functionality
const songUrlInput = document.getElementById('song-url');
const downloadButton = document.getElementById('download-button');
const downloadStatus = document.getElementById('download-status');

downloadButton.addEventListener('click', () => {
    const songUrl = songUrlInput.value.trim();
    if (songUrl) {
        // make API call to download song
        fetch(`https://api.example.com/download?url=${songUrl}`)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'song.mp3';
                a.click();
                URL.revokeObjectURL(url);
                downloadStatus.textContent = 'Download complete!';
            })
            .catch(error => console.error(error));
    }
});