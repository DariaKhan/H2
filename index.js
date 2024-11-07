class Library {
  #books = [];

  constructor() {
    // Начинаем с пустой библиотеки
    this.#books = [];
  }

  get books() {
    return this.#books;
  }

  addBook(title, author) {
    for (let book of this.#books) {
      if (book.title === title && book.author === author) {
        throw new Error("Такая книга уже есть в библиотеке");
      }
    }
    this.#books.push({ title, author });
  }

  removeBook(title, author) {
    const index = this.#books.findIndex(
      (book) => book.title === title && book.author === author
    );
    if (index !== -1) {
      this.#books.splice(index, 1);
    } else {
      throw new Error("Такой книги нет в библиотеке");
    }
  }

  hasBook(title) {
    for (let book of this.#books) {
      if (book.title === title) {
        console.log(`Книга есть в библиотеке. Автор: ${book.author}, Название: ${book.title}`);
        return true;
      }
    }
    console.log("Такой книги нет в библиотеке");
    return false;
  }

  printAllBooks() {
    for (let book of this.#books) {
      console.log(`Автор: ${book.author}, Название: ${book.title}`);
    }
  }
}

const library = new Library();

library.addBook("Властелин колец", "Джон Толкин");
library.addBook("Война и мир", "Лев Толстой");
library.addBook("Мастер и Маргарита", "Михаил Булгаков");
library.addBook("1984", "Джордж Оруэлл");
library.addBook("Мертвые души", "Николай Гоголь");

library.printAllBooks();
console.log();

library.removeBook("Властелин колец", "Джон Толкин");
library.removeBook("1984", "Джордж Оруэлл");
library.printAllBooks();
console.log();

library.hasBook("Мастер и Маргарита");

////////////

const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      { id: "1", text: "Отличный телефон! Батарея держится долго." },
      { id: "2", text: "Камера супер, фото выглядят просто потрясающе." },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      { id: "3", text: "Интересный дизайн, но дорогой." },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      { id: "4", text: "Люблю играть на PS5, графика на высоте." },
    ],
  },
];

function loadInitialReviews() {
  const reviewsContainer = document.getElementById("reviewsContainer");
  initialData.forEach(product => {
    product.reviews.forEach(review => {
      const reviewElement = document.createElement("p");
      reviewElement.textContent = `${product.product}: ${review.text}`;
      reviewsContainer.appendChild(reviewElement);
    });
  });
}


function submitReview() {
  const reviewInput = document.getElementById("reviewInput");
  const reviewText = reviewInput.value.trim();
  const productSelect = document.getElementById("productSelect").value;

  try {
    addReview(productSelect, reviewText);
    reviewInput.value = "";
  } catch (error) {
    alert(error.message);
  }
}


function addReview(product, text) {
  if (text.length < 50 || text.length > 500) {
    throw new Error("Отзыв должен содержать от 50 до 500 символов.");
  }

  const productData = initialData.find(item => item.product === product);
  if (!productData) {
    throw new Error("Продукт не найден.");
  }


  const newId = (initialData.flatMap(p => p.reviews).length + 1).toString();
  const newReview = { id: newId, text };

  productData.reviews.push(newReview);

  const reviewsContainer = document.getElementById("reviewsContainer");
  const reviewElement = document.createElement("p");
  reviewElement.textContent = `${product}: ${text}`;
  reviewsContainer.appendChild(reviewElement);
}


loadInitialReviews();


document.getElementById("submitReviewButton").addEventListener("click", submitReview);

