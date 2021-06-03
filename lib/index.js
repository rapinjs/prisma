"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const plugin_1 = require("./plugin");
const helpers_1 = require("./helpers");
const lodash_1 = require("lodash");
__exportStar(require("./decorators"), exports);
class KnexPlugin {
    afterInitRegistry({ registry }) {
        return __awaiter(this, void 0, void 0, function* () {
            registry.set('prisma', new client_1.PrismaClient());
        });
    }
    onBeforeRequest({ registry, ctx }) {
        return __awaiter(this, void 0, void 0, function* () {
            helpers_1.initRegistry({ registry });
            registry.set('user', new plugin_1.User(registry));
            const token = !lodash_1.isUndefined(ctx.request.headers.token)
                ? ctx.request.headers.token
                : false;
            if (token) {
                yield registry.get('user').verify(token);
            }
            else {
                const authToken = !lodash_1.isUndefined(ctx.request.headers.authorization)
                    ? ctx.request.headers.authorization
                    : false;
                if (authToken) {
                    yield registry.get('user').verify(authToken);
                }
            }
        });
    }
}
exports.default = KnexPlugin;
//# sourceMappingURL=index.js.map