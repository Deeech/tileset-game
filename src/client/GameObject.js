class GameObject {
	constructor(x = 20, y = 20) {
		this.x = x;
		this.y = y;
	}
	render(ctx, camera) {
		ctx.fillRect((this.x - 64/2) - camera.xView, (this.y - 64/2) - camera.yView, 64, 64);
	}
}
export { GameObject }
