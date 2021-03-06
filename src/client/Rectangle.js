class Rectangle {
  constructor(left = 0, top = 0, width = 0, height = 0) {
    this.width  = width;
    this.height = height;
    this.left   = left;
    this.top    = top;
    this.right  = this.left + this.width;
    this.bottom = this.top + this.height;
  }

  set(left, top, width, height) {
    this.width  = width || this.width;
    this.height = height || this.height;
    this.left   = left;
    this.top    = top;
    this.right  = (this.left + this.width);
    this.bottom = (this.top + this.height);
  }

  within(r) {
    return (
      r.left    <= this.left  &&
      r.right   >= this.right &&
      r.top     <= this.top   &&
      r.bottom  >= this.bottom
    );
  }

  overlaps() {
    return (
      this.left < r.right     &&
         r.left < this.right  &&
      this.top  < r.bottom    &&
         r.top  < this.bottom
    );
  }
}

export { Rectangle }
