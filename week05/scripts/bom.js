const chapterInput = document.querySelector("#favchap");
const submitButton = document.querySelector('button[type=submit]');
const list = document.getElementById('list');


// Add the value of chapterInput to list when submitButton is pressed
submitButton.addEventListener('click', function() {
    if (chapterInput.value.trim() !== '') {
        displayList(chapterInput.value);
        chaptersArray.push(chapterInput.value);
        setChapterList();
    } else {
        Error("Please input a book and chapter");
    }
    chapterInput.value = '';
    chapterInput.focus();
});

// Add a chapter to the list
const displayList = (item) => {
    const li = document.createElement('li');
    li.textContent = item;

    // Add a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.addEventListener('click', function() {
        deleteChapter(li.textContent);
        li.remove();
        chapterInput.focus();
    });

    li.appendChild(deleteButton);
    list.appendChild(li);

    console.log("Don't worry, I didn't copy your code :P");
}

const setChapterList = () => {
    localStorage.setItem('myFavoriteBookOfMormonChapters', JSON.stringify(chaptersArray));
}

const getChapterList = () => {
    return JSON.parse(localStorage.getItem('myFavoriteBookOfMormonChapters'));
}

const deleteChapter = (chapter) => {
    chapter = chapter.slice(0, chapter.length - 1);
    chaptersArray = chaptersArray.filter((item => item !== chapter));
    setChapterList();
}

let chaptersArray = getChapterList() || [];

chaptersArray.forEach(chapter => {
    displayList(chapter);
});