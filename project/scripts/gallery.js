function capitalizeFirstLetter(str) {
    if (str.length === 0) return str; // Handle empty strings
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

function createGalleryItem(item) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    const title = document.createElement('h3');
    title.textContent = `${capitalizeFirstLetter(item.materials[0])} ${capitalizeFirstLetter(item.type)}`;
    
    const picture = document.createElement('picture');
    const img = document.createElement('img');
    img.src = `images/${item.image}`;
    img.loading = "lazy";
    img.classList.add('product-picture');
    img.alt = `Image of ${item.materials[0]} ${item.type}`;

    card.appendChild(title);
    picture.appendChild(img);
    card.appendChild(picture);

    return card;
}

async function loadGalleryItems() {
    const galleryList = document.getElementById('gallery-container');
    //Fetch the list of gallery files
    const galleryFilesResponse = await fetch(`data/all-items.json`);
    const galleryFileNames = await galleryFilesResponse.json();

    for (let i = 0; i < galleryFileNames.length; i++) {
        try {
            const response = await fetch(`data/gallery-items/${galleryFileNames[i]}`);
            const itemData = await response.json();
            galleryList.appendChild(createGalleryItem(itemData));
        } catch (error) {
            console.error('Error loading gallery item: ', error);
        }
    } 
}

loadGalleryItems();
