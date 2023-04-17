"use strict";

let myLibrary = [];

function Book(title, author, pages, read_status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read_status = read_status;
  this.info = () => {
    return (
      this.title +
      " by " +
      this.author +
      ", " +
      this.pages +
      " pages " +
      ", " +
      this.read_status
    );
  };
}

function addBookToLibrary(title, author, pages, read_status) {
  const b_obj = new Book(title, author, pages, read_status);
  //const b_obj=new Book("The Hobbit", "J.R.R Tolkien", 295, "not read yet");
  myLibrary.push(b_obj);
  console.log("book added");

  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book");

  const bookTitle = document.createElement("p");
  bookTitle.setAttribute("class", "book-name");
  bookTitle.textContent = title;
  bookDiv.appendChild(bookTitle);

  const bookAuthor = document.createElement("p");
  bookAuthor.textContent = author;
  bookDiv.appendChild(bookAuthor);

  const bookPages = document.createElement("p");
  bookPages.textContent = `${pages} pages`;
  bookDiv.appendChild(bookPages);

  // const bookStatus = document.createElement("p");
  // bookStatus.textContent = read_status ? "Read" : "Not read yet";
  // bookDiv.appendChild(bookStatus);

  const readBtn = document.createElement("button");

  if (read_status) {
    readBtn.textContent = "Completed";
    readBtn.classList.add("btn-read-status-y");
  } else {
    readBtn.textContent = "Not read yet";
    readBtn.classList.add("btn-read-status-n");
  }
  bookDiv.appendChild(readBtn);

  //   <span class="material-symbols-outlined">
  // delete
  // </span>
  const removeBtn = document.createElement("button");
  // const span = document.createElement("span");
  // span.classList.add("material-symbols-outlined");
  // removeBtn.appendChild(span);
  removeBtn.innerHTML=  '<span class="material-symbols-outlined">delete</span> Remove' ;
  // removeBtn.textContent = "Remove";
  removeBtn.classList.add("btn-remove");
  bookDiv.appendChild(removeBtn);
  bookDiv.setAttribute("data-index", myLibrary.length);

  const shelf = document.querySelector(".shelf");
  shelf.appendChild(bookDiv);

  //Attaching event listener to each remove button
  removeBtn.addEventListener("click", (e) => {
    const bookIndex = bookDiv.getAttribute("data-index") - 1;
    //removing from the myLibrary
    myLibrary.splice(bookIndex, 1);

    //removing from the parent shelf
    removeBtn.parentElement.remove();

    console.log("removed book at index " + bookIndex);
  });

  readBtn.addEventListener("click", (e) => {
    const bookIndex = bookDiv.getAttribute("data-index") - 1;

    //if read status is yes
    if (myLibrary[bookIndex].read_status) {
      myLibrary[bookIndex].read_status = null;
      readBtn.textContent = "Not read yet";
      readBtn.classList.remove("btn-read-status-y");
      readBtn.classList.add("btn-read-status-n");
    } else {
      myLibrary[bookIndex].read_status = "on";
      readBtn.textContent = "Completed";
      readBtn.classList.remove("btn-read-status-n");
      readBtn.classList.add("btn-read-status-y");
    }
  });
}

function displayBook(title, author, pages, read_status) {
  // const bookDiv = document.createElement("div");
  // bookDiv.classList.add("book");
  // //e.preventDefault();
  // const bookName = document.createElement("p");
  // bookName.setAttribute("id", "book-name");
  // bookName.textContent = title;
  // bookDiv.appendChild(bookName);
  // const author_elem = document.createElement("p");
  // author_elem.textContent = author;
  // bookDiv.appendChild(author_elem);
  // const pages_elem = document.createElement("p");
  // pages_elem.textContent = pages;
  // bookDiv.appendChild(pages_elem);
  // const readBtn = document.createElement("button");
  // readBtn.classList.add("btn-read-status");
  // if (read_status) {
  //   readBtn.textContent = "Read";
  // } else {
  //   readBtn.textContent = "Not read";
  //   readBtn.style.backgroundColor = "brown";
  // }
  // bookDiv.appendChild(readBtn);
  // const removeBtn = document.createElement("button");
  // removeBtn.classList.add("btn-remove");
  // removeBtn.textContent = "Remove";
  // bookDiv.appendChild(removeBtn);
  // // Add the book div to the shelf class
  // const shelf = document.querySelector(".shelf");
  // shelf.appendChild(bookDiv);
  // bookDiv.setAttribute("data-index", i);
  // i += 1;
  // shelf.style.minHeight = "100vh";
}

// capturing form data
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  let title = formData.get("title");
  let author = formData.get("author");
  let pages = formData.get("pages");
  let read_status = formData.get("read_status");
  addBookToLibrary(title, author, pages, read_status);
  // displayBook(title, author, pages, read_status);
  form.reset();
});
