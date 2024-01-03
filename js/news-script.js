const apiKey = "7bab3c52657147049a950ea579972862";
let requestURL;

const container = document.querySelector('.container');
const optionContainer = document.querySelector('.options-container');

const country = "in";
const option = ["general","entertainment","health","science","sports","technology"];



const generateUI = (articles) => {
  for (let item of articles) {
    let card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML =
      `<div class="news-image-container">
        <img src="${item.urlToImage || "./newspaper.jpg"}" alt="" />
      </div>
      <div class="news-content">
        <div class="news-title">
          ${item.title}
        </div>
        <div class="news-description">
          ${item.description || item.content || ""}
        </div>
        <a href="${item.url}" target="_blank" class="view-button">Read more</a>
      </div>`;
    container.appendChild(card);
  }
};


//News API Call
const getNews = async () => {
  container.innerHTML = "";
  let response = await fetch(requestURL);
  if (!response.ok) {
    alert("Data unavailable at the moment, Please try again later");
    return false;
  }
  let data = await response.json();
  generateUI(data.articles);
};


//Category 
const selectCategory = (e, category) => {
  
  let options = document.querySelectorAll(".option");
  options.forEach((element) => {
    element.classList.remove("active");
  });

  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add("active");
  getNews();
}

// Option button
const createOptions = () => {
  for (let i of option) {
    optionContainer.innerHTML += `<button class="option ${i == "general" ? "active" : ""}"
    onclick="selectCategory(event,'${i}')">${i}<button/>`;
  }
};


const init = () => {
  optionContainer.innerHTML = "";
  getNews();
  createOptions();
};


window.onload = () => {
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
  init();
};





