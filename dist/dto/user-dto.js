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
    removeUserPassword(userModel) {
        return userModel
            ? {
                email: userModel.email,
                _id: userModel._id,
                isActivated: userModel.isActivated,
                name: userModel.name,
                surname: userModel.surname,
                sex: userModel.sex,
                birthday: userModel.birthday,
                city: userModel.city,
                zip: userModel.zip,
                country: userModel.country,
                address: userModel.address,
                avatar: userModel.avatar,
                phone: userModel.phone,
                activationLink: userModel.activationLink,
            }
            : {
                email: '',
                _id: ' userModel._id',
                isActivated: false,
                name: '',
                surname: '',
                sex: 0,
                birthday: '',
                city: '',
                zip: '',
                country: '',
                address: '',
                avatar: '',
                phone: '',
                activationLink: '',
            };
    },
};
//# sourceMappingURL=user-dto.js.map