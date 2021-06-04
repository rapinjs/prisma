"use strict";
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
exports.User = void 0;
const jwt = require("jsonwebtoken");
const lodash_1 = require("lodash");
class User {
    constructor(registry) {
        this.registry = registry;
        this.prisma = this.registry.get('prisma');
        this.crypto = this.registry.get('crypto');
        this.token = '';
        this.userId = 0;
        this.firstName = '';
        this.middleName = '';
        this.lastName = '';
        this.email = '';
        this.telephone = '';
        this.image = '';
        this.roleType = '';
    }
    login(email, password, override = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findFirst({
                where: {
                    email
                }
            });
            let userInfo = {};
            if (override) {
                userInfo = user;
            }
            else {
                const passwordHash = this.crypto.getHashPassword(password, user.salt);
                userInfo = yield this.prisma.user.findFirst({ where: { email, password: passwordHash.hash, salt: passwordHash.salt } });
            }
            if (!lodash_1.isEmpty(userInfo)) {
                this.token = jwt.sign(lodash_1.toPlainObject(userInfo), process.env.SECRET_KEY, {
                    expiresIn: 21600,
                });
                this.userId = userInfo.id;
                this.firstName = userInfo.firstName;
                this.middleName = userInfo.middleName;
                this.lastName = userInfo.lastName;
                this.email = userInfo.email;
                this.telephone = userInfo.telephone;
                this.image = userInfo.image;
                this.roleType = userInfo.roleId;
                return this.token;
            }
            else {
                return false;
            }
        });
    }
    getToken(email, password, expiresIn = 21600) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findFirst({
                where: {
                    email
                }
            });
            if (!user) {
                return false;
            }
            let userInfo;
            if (password === '') {
                userInfo = user;
            }
            else {
                const passwordHash = this.crypto.getHashPassword(password, user.salt);
                userInfo = yield this.prisma.user.findFirst({ where: { email, password: passwordHash.hash, salt: passwordHash.salt } });
            }
            if (!lodash_1.isEmpty(userInfo)) {
                const token = jwt.sign(lodash_1.toPlainObject(userInfo), process.env.SECRET_KEY, {
                    expiresIn,
                });
                return token;
            }
            else {
                return false;
            }
        });
    }
    verify(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = jwt.verify(token, lodash_1.toString(process.env.SECRET_KEY));
                const userInfo = yield yield this.prisma.user.findFirst({
                    where: {
                        email: user.email
                    }
                });
                if (userInfo) {
                    this.token = token;
                    this.userId = userInfo.id;
                    this.firstName = userInfo.firstName;
                    this.middleName = userInfo.middleName;
                    this.lastName = userInfo.lastName;
                    this.email = userInfo.email;
                    this.telephone = userInfo.telephone;
                    this.image = userInfo.image;
                    this.roleType = userInfo.roleId;
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (e) {
                return false;
            }
        });
    }
    getId() {
        return this.userId;
    }
    getFirstName() {
        return this.firstName;
    }
    getMiddleName() {
        return this.middleName;
    }
    getLastName() {
        return this.lastName;
    }
    getEmail() {
        return this.email;
    }
    getTelephone() {
        return this.telephone;
    }
    getImage() {
        return this.image;
    }
    getRoleType() {
        return this.roleType;
    }
    isLogged() {
        return !!this.token;
    }
}
exports.User = User;
//# sourceMappingURL=plugin.js.map