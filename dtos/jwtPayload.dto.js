module.exports = class JwtPayloadDto {
    id;
    username;
    isActive;

    constructor(model) {
        this.id = model.id;
        this.username = model.username;
        this.isActive = model.isActive;
    }
}