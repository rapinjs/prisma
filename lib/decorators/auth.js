"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const helpers_1 = require("../helpers");
exports.Auth = () => {
    return (target, propertyKey, descriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            if (helpers_1.getRegistry()) {
                if (helpers_1.getRegistry()
                    .get('user')
                    .isLogged()) {
                    return originalMethod.apply(this, args);
                }
                else {
                    helpers_1.getRegistry()
                        .get('error')
                        .set('unauthorized');
                }
            }
        };
    };
};
//# sourceMappingURL=auth.js.map