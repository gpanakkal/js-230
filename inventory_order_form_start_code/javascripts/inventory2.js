const select = (selector) => document.querySelector(selector);

class Inventory {
  constructor(document) {
    this.documentBody = document.body;
    this.lastId = 0;
    this.collection = [];
    this.setDate();
    this.cacheTemplate();
    this.bindEvents();
  }

  setDate() {
    const date = new Date();
    select('#order_date').textContent = date.toUTCString();
  }

  cacheTemplate() {
    const itemTemplate = select('#inventory_item');
    if (itemTemplate) itemTemplate.remove();
    this.template = itemTemplate.innerHTML;
  }

  bindEvents() {
    select('#add_item').addEventListener('click', this.newItem.bind(this));
    select('#inventory').addEventListener('click', this.deleteItem.bind(this));

    const boundNewItem = this.newItem.bind(this);
    select('#inventory').addEventListener('blur', (e) => {
      const inputs = ['input', 'textarea', 'select', 'button'];
      console.log({newItemContext: this});
      if (!inputs.includes(e.target.tagName)) return;
      return boundNewItem(e);
    });
  }

  add() {
    this.lastId += 1;
    const item = {
      id: this.lastId,
      name: '',
      stock_number: '',
      quantity: 1,
    };
    this.collection.push(item);
    return item;
  }

  remove(id) {
    this.collection = this.collection.filter((item) => item.id !== id);
  }

  get(id) {
    return this.collection.find((item) => item.id === id) ?? false;
  }

  update(itemElement) {
    const id = this.findID(itemElement);
    const item = this.get(id);

    item.name = document.querySelector('input[name^=item_name]').value;
    item.stock_number = document.querySelector('input[name^=item_stock_number]').value;
    item.quantity = document.querySelector('input[name^=item_quantity]').value;
  }

  newItem(e) {
    e.preventDefault();
    const item = this.add();
    console.log({template: this.template})
    const itemElement = select(this.template.replace(/ID/g, item.id));
    select('#inventory').append(itemElement);
  }

  findParent(e) {
    const parentNodes = [];
    let next = e.target;
    while (true) {
      if (!next) break;
      parentNodes.push(next);
      next = next.parentNode;
    }
    return parentNodes.find((node) => node.tagName === 'TR');
  }

  findID (itemElement) {
    return Number(itemElement.querySelector('input[type=hidden]').value);
  }

  deleteItem(e) {
    e.preventDefault();
    const itemElement = this.findParent(e).remove();
    this.remove(this.findID(itemElement));
  }

  updateItem(e) {
    const itemElement = this.findParent(e);
    this.update(itemElement);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const inventory = new Inventory(document);
});
