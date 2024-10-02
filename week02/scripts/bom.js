const chapterInput = document.querySelector("#favchap");
const submitButton = document.querySelector('button[type=submit]');
const list = document.getElementById('list');



submitButton.addEventListener('click', function() {
    if (chapterInput.value.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = chapterInput.value;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';

        deleteButton.addEventListener('click', function() {
            li.remove();
        });

        li.appendChild(deleteButton);
        list.appendChild(li);

        chapterInput.value = '';
    } else {
        Error("Please input a book and chapter");
    }
    chapterInput.focus();
});
