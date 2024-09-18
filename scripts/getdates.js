const today = new Date();
const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified")

// let currentYear = today.getFullYear();
// let lastModified = document.lastModified;

currentYear.textContent = today.getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;