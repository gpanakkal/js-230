const Autocomplete = {
  wrapInput() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('autocomplete-wrapper');
    this.input.parentNode.appendChild(wrapper);
    wrapper.appendChild(this.input);
  },

  createUI() {
    const wrapper = this.input.parentNode;
    const listUI = document.createElement('ul');
    listUI.classList.add('autocomplete-ui');

    wrapper.appendChild(listUI);
    this.listUI = listUI;

    const overlay = document.createElement('div');
    overlay.classList.add('autocomplete-overlay');
    overlay.style.width = `${this.input.clientWidth}px`;

    wrapper.appendChild(overlay);
    this.overlay = overlay;
  },

  bindEvents() {
    this.input.addEventListener('input', this.valueChanged.bind(this));
    this.input.addEventListener('keydown', this.handleKeydown.bind(this));
    this.listUI.addEventListener('mousedown', this.handleMousedown.bind(this));
  },

  handleKeydown(event) {
    switch(event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (this.selectedIndex === null || this.selectedIndex === this.matches.length - 1) {
          this.selectedIndex = 0;
        } else {
          this.selectedIndex += 1;
        }
        this.bestMatchIndex = null;
        this.draw();
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.selectedIndex === null || this.selectedIndex === 0) {
          this.selectedIndex = this.matches.length - 1;
        } else this.selectedIndex -= 1;
        this.bestMatchIndex = null;
        this.draw();
        break;
      case 'Tab':
        if (this.bestMatchIndex !== null && this.matches.length > 0) {
          event.preventDefault();
          this.input.value = this.matches[this.bestMatchIndex].name;
        }
        this.reset();
        break;
      case 'Enter':
        this.reset();
        break;
      case 'Escape':
        this.input.value = this.previousValue;
        this.reset();
        break;
    }
  },

  handleMousedown(event) {
    // identify the country highlighted
    const country = event.target.textContent;
    // set the value of the input to the country
    this.input.value = country;
    // call reset
    this.reset();
  },

  valueChanged() {
    const { value } = this.input;
    this.previousValue = value;
    console.log({previous: this.previousValue});

    if (value.length > 0) {
      this.fetchMatches(value, (matches) => {
        this.visible = true;
        this.matches = matches;
        this.bestMatchIndex = 0;
        this.selectedIndex = null;
        this.draw();
      });
    } else {
      this.reset();
    }
  },

  fetchMatches(query, callback) {
    const request = new XMLHttpRequest();
    request.open('GET', `${this.url}${encodeURIComponent(query)}`);
    request.responseType = 'json';

    request.addEventListener('load', (e) => {
      callback(request.response);
    });

    request.send();
  },

  draw() {
    while (this.listUI.lastChild) {
      this.listUI.removeChild(this.listUI.lastChild);
    }

    if (!this.visible) {
      this.overlay.textContent = '';
      return;
    }

    if (this.bestMatchIndex !== null && this.matches.length !== 0) {
      const selected = this.matches[this.bestMatchIndex];
      this.overlay.textContent = this.generateOverlayContent(this.input.value, selected);
    } else {
      this.overlay.textContent = '';
    }

    this.matches.forEach((match, index) => {
      const li = document.createElement('li');
      li.classList.add('autocomplete-ui-choice');

      if (index === this.selectedIndex) {
        li.classList.add('selected');
        this.input.value = match.name;
      }

      li.textContent = match.name;
      this.listUI.appendChild(li);
    });
  },

  generateOverlayContent(value, match) {
    const end = match.name.slice(value.length);
    return value + end;
  },

  reset() {
    this.visible = false;
    this.matches = [];
    this.bestMatchIndex = null;
    this.selectedIndex = null;
    this.previousValue = null;

    this.draw();
  },

  init() {
    this.input = document.querySelector('input');
    this.url = '/countries?matching=';

    this.listUI = null;
    this.overlay = null;
    // this.visible = false;
    // this.matches = [];

    this.wrapInput();
    this.createUI();
    this.bindEvents();

    this.reset();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Autocomplete.init();
});