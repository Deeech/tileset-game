class Entity {
	constructor(x = 20, y = 20) {
		this.id = null;
		this.x = x;
		this.y = y;
		this.sprite = null;
		this.animations = null;
		this.currentAnimation = null;
	}
	render(ctx, camera) {
		ctx.fillRect((this.x - 64/2) - camera.xView, (this.y - 64/2) - camera.yView, 64, 64);
	}
}
export { Entity }
