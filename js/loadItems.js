document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const mainImage = document.getElementById('main-image');
    const details = document.getElementById('details');
    const navBar = document.getElementById('nav-bar');
    
    let currentLevel = 'phyla';
    let currentData = data;

    function loadItems(items, type, phylum = null) {
        sidebar.innerHTML = '';
        items.forEach((item) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('picture-item');
            if (type === 'pictures') {
                mainImage.src = 'images/whitepixle.jpg';
                itemDiv.innerHTML = `<img src="${item.url}" alt="${item.title}" class="thumbnail"><div>${item.title}</div>`;
            } else {
                itemDiv.innerHTML = item.name;
            }
            itemDiv.addEventListener('click', () => {
                if (type === 'phyla') {
                    currentLevel = 'creatures';
                    currentData = item;
                    loadItems(item.creatures, 'creatures', item.name);
                } else if (type === 'creatures') {
                    currentLevel = 'pictures';
                    currentData = item;
                    details.innerHTML = `<center><h1>Tardigradia<br>land'o'lil<br></center></h1><h2>${item.name}</h2><p>${item.description}</p><p><strong>Phylum:</strong> ${phylum}</p>`;
                    loadItems(item.pictures, 'pictures');
                } else if (type === 'pictures') {
                    mainImage.src = item.url;
                    mainImage.alt = item.title;
                }
            });
            sidebar.appendChild(itemDiv);
        });
        navBar.style.display = currentLevel === 'phyla' ? 'none' : 'block';
    }

    function initialize() {
        if (sidebar && mainImage && details && navBar && data && data.phyla) {
            loadItems(data.phyla, 'phyla');
            createFloatingBubbles(bubbleImages);
        } else {
            console.error('Initialization failed: Elements or data are missing.');
        }
    }

    navBar.addEventListener('click', () => {
        if (currentLevel === 'creatures') {
            currentLevel = 'phyla';
            currentData = data;
            loadItems(data.phyla, 'phyla');
            details.innerHTML = '';
        } else if (currentLevel === 'pictures') {
            currentLevel = 'creatures';
            loadItems(currentData.creatures, 'creatures', currentData.phylum);
        }
    });

    initialize(); // Call initialize after the DOM is fully loaded
});
