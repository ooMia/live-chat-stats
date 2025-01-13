/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./cats/dto/create-cat.dto"), { "CreateCatDto": {} }], [import("./cats/dto/update-cat.dto"), { "UpdateCatDto": {} }], [import("./cats/entities/cat.entity"), { "Cat": {} }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: String } }, "CatsController": { "findAll": { type: String } } }], [import("./cats/cats.controller"), { "CatsController": { "create": { type: String }, "findAll": { type: String }, "findOne": { type: String }, "update": { type: String }, "remove": { type: String } } }]] } };
};