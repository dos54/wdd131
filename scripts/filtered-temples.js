const hamburgerToggle = document.querySelector('#hamburger');
const hamburgerIcon = document.querySelector('#hamburger > div');
const nav = document.querySelector('nav');
const gallery = document.querySelector('#gallery')

//Here be the filter buttons
const filterHome = document.querySelector('#filter-home');
const filterLarge = document.querySelector('#filter-large');
const filterSmall = document.querySelector('#filter-small');
const filterNew = document.querySelector('#filter-new');
const filterOld = document.querySelector('#filter-old');

//Add a hamburger toggle for smaller sizes.
hamburgerToggle.addEventListener('click', () => {
    if (nav.style.display !== 'block') {
        nav.style.display = 'block';
        hamburgerIcon.style.transform = 'rotate(90deg)';
        hamburgerIcon.style.width = '1em';
    } else {
        nav.style.display = 'none';
        hamburgerIcon.style.transform = 'rotate(0deg)';
    }
});

//Create labels and their content for use in the cards
const createLabel = (labelText, contentData) => {
    const labelContainer = document.createElement('div');
    labelContainer.classList.add('label-container');
    const label = document.createElement('p');
    label.classList.add('label');
    label.textContent = labelText;
    
    const data = document.createElement('p');
    data.classList.add('data');
    data.textContent = contentData;

    labelContainer.appendChild(label);
    labelContainer.appendChild(data);

    return labelContainer;
}

//Add a card for a temple, and populate it with its associated labels and images.
const addTemple = (temple) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const name = document.createElement('h1');
    name.textContent = temple.templeName;
    card.appendChild(name);

    card.appendChild(createLabel('Location:',temple.location));
    card.appendChild(createLabel('Dedicated:',temple.dedicated));
    card.appendChild(createLabel('Size:',`${temple.area} sq ft`));
    
    const picture = document.createElement('picture');
    const templeImage = document.createElement('img');
    templeImage.loading = "lazy";
    templeImage.src = temple.imageUrl;
    templeImage.alt = `${temple.templeName} Temple, located at ${temple.location} and dedicated on the date ${temple.dedicated}.`
    picture.appendChild(templeImage);

    card.appendChild(picture);

    gallery.appendChild(card);
}

//Here be the list of temples. I would prefer to have this in a seperate file...
// const temples = [
//     {
//       templeName: "Aba Nigeria",
//       location: "Aba, Nigeria",
//       dedicated: "2005, August, 7",
//       area: 11500,
//       imageUrl:
//       "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
//     },
//     {
//       templeName: "Manti Utah",
//       location: "Manti, Utah, United States",
//       dedicated: "1888, May, 21",
//       area: 74792,
//       imageUrl:
//       "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
//     },
//     {
//       templeName: "Payson Utah",
//       location: "Payson, Utah, United States",
//       dedicated: "2015, June, 7",
//       area: 96630,
//       imageUrl:
//       "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
//     },
//     {
//       templeName: "Yigo Guam",
//       location: "Yigo, Guam",
//       dedicated: "2020, May, 2",
//       area: 6861,
//       imageUrl:
//       "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
//     },
//     {
//       templeName: "Washington D.C.",
//       location: "Kensington, Maryland, United States",
//       dedicated: "1974, November, 19",
//       area: 156558,
//       imageUrl:
//       "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
//     },
//     {
//       templeName: "Lima Perú",
//       location: "Lima, Perú",
//       dedicated: "1986, January, 10",
//       area: 9600,
//       imageUrl:
//       "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
//     },
//     {
//       templeName: "Mexico City Mexico",
//       location: "Mexico City, Mexico",
//       dedicated: "1983, December, 2",
//       area: 116642,
//       imageUrl:
//       "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
//     },
//     // Add more temple objects here...
//   ];


let temples = [];
//Okay, Here's the seperate file!

async function fetchTemples() {
  try {
    const response = await fetch('data/temples.json');
    temples = await response.json();

    temples.forEach(temple => {
      addTemple(temple);
    });
  } catch (error) {
    console.error('Error fetchin temples file: ', error);
  }
}

const filterTemples = (filter) => { //The value 'filter' should be a function...
  gallery.innerHTML = ''; //Blank slate
  let filteredTemples = temples.filter(filter); 
  filteredTemples.forEach((temple) => {
    addTemple(temple);
  });
}

// All temples should be displayed
filterHome.addEventListener('click', () => {
  filterTemples((temple) => temple);
});

//Show temples built before 1900
filterOld.addEventListener('click', () => {
  filterTemples((temple) => temple.dedicated.split(', ')[0] < 1900);
});

//Show temples built after 2000
filterNew.addEventListener('click', () => {
  filterTemples((temple) => temple.dedicated.split(', ')[0] > 2000);
});

//Show temples larger than 90,000 sq ft
filterLarge.addEventListener('click', () => {
  filterTemples((temple) => temple.area > 90000);
});

//Show temples smaller than 10,000 sq fr
filterSmall.addEventListener('click', () => {
  filterTemples((temple) => temple.area < 10000);
});

fetchTemples();