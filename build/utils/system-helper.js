"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateObjectId = exports.genrateString = void 0;
const genrateString = (length) => {
    const prefix = 'VR';
    const suffix = 'AJ';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return prefix + randomString + suffix;
};
exports.genrateString = genrateString;
const validateObjectId = (id) => {
    const regex = /^VR.*AJ$/; // regular expression
    const valid = regex.test(id);
    return valid;
};
exports.validateObjectId = validateObjectId;
