export default class Section {
  constructor(containerSelector) {
    //this._items = items;
    //this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  rendererItems({ items, renderer }) {
    items.forEach((item) => {
      this._container.append(renderer(item));
    });
  }
}
