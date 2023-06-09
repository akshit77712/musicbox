
class MenuScreen {
  constructor(submitMenu) {
    this.submitMenu = submitMenu;

    this.songChoices = [];
    this.onSongJsonReady = this.onSongJsonReady.bind(this);
    this.onGifJsonReady = this.onGifJsonReady.bind(this);
    this.submit = this.submit.bind(this);
    this.loadSongChoices();

    this.themes = ['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space'];

    this.choosePlaceholder();

    const submitButton = document.querySelector("#submit-button");
    submitButton.addEventListener('click', this.submit);

    const textContainer = document.querySelector("#query-input");
    textContainer.addEventListener('input', this.reset);
  }

  submit(event) {
    event.preventDefault();
    this.loadGifData();
  }

  reset(event) {
    const errorContainer = document.querySelector("#error");
    errorContainer.classList.add("inactive");
  }

  choosePlaceholder() {
    const themes = ['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space'];
    const textContainer = document.querySelector("#query-input");
    const randInd = Math.floor(Math.random() * themes.length);
    textContainer.value = themes[randInd];
  }

  loadGifData() {
    const textBox = document.querySelector("#query-input");
    const endpoint = "https://api.giphy.com/v1/gifs/search?q=" + textBox.value +
      "&api_key=OU45Ywtsgw8wZQcR6n1RyHOXerYtvUhs&limit=25&rating=g";
    fetch(endpoint)
    .then(response => response.json())
    .then(this.onGifJsonReady);
  }

  onGifJsonReady(json){
    const data = json.data;
    if (data.length < 2) {
      const errorContainer = document.querySelector("#error");
      errorContainer.classList.remove("inactive");
    }
    else {
      const songSelector = document.querySelector("#song-selector");
      const songURL = songSelector.options[songSelector.selectedIndex].value;
      this.submitMenu(songURL, data);
    }
  }

  loadSongChoices() {
    fetch("https://yayinternet.github.io/hw4-music/songs.json")
      .then(response => response.json())
      .then(this.onSongJsonReady);
  }

  onSongJsonReady(json){
    this.songChoices = json;
    const optionsContainer = document.querySelector("#song-selector");
    for (const song in this.songChoices) {
      const option = document.createElement("option");
      option.value = this.songChoices[song].songUrl;
      option.text = this.songChoices[song].title;
      optionsContainer.add(option);
    }
  }
}
