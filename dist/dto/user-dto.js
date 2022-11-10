"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    generateUserDto(userModel) {
        return {
            email: userModel.email,
            id: userModel._id,
            isActivated: userModel.isActivated,
        };
    },
};
//# sourceMappingURL=user-dto.js.map