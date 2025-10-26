"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAttemptType = exports.UserProvider = void 0;
var UserProvider;
(function (UserProvider) {
    UserProvider["LOCAL"] = "local";
    UserProvider["FIREBASE"] = "firebase";
})(UserProvider || (exports.UserProvider = UserProvider = {}));
var UserAttemptType;
(function (UserAttemptType) {
    UserAttemptType["FORGET_PASSWORD"] = "forget_password";
    UserAttemptType["WRONG_OTP_CODE"] = "wrong_otp_code";
})(UserAttemptType || (exports.UserAttemptType = UserAttemptType = {}));
//# sourceMappingURL=User.enum.js.map