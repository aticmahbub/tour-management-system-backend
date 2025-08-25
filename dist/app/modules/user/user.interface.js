"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.isActive = void 0;
var isActive;
(function (isActive) {
    isActive["ACTIVE"] = "ACTIVE";
    isActive["INACTIVE"] = "INACTIVE";
    isActive["BLOCKED"] = "BLOCKED";
})(isActive || (exports.isActive = isActive = {}));
var Role;
(function (Role) {
    Role["SUPER_ADMIN"] = "SUPER_ADMIN";
    Role["ADMIN"] = "ADMIN";
    Role["USER"] = "USER";
    Role["GUIDE"] = "GUIDE";
})(Role || (exports.Role = Role = {}));
