class Link {
  constructor(fn, prev = null) {
    this.fn = fn;
    this.prev = prev;
  }
}

export default class Chain {
  links = {};
  current = null;
  register = (name, fn, prev) => (this.links[name] = new Link(fn, prev));
  set = name => (this.current = name);
  dispatch = () => {
    const currentLink = this.links[this.current];
    if (!currentLink) return;
    currentLink.fn();
  };
  pop = () => {
    const currentLink = this.links[this.current];
    if (!currentLink) return;
    this.current = currentLink.prev;
  };
}
