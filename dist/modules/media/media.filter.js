"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaFileFilter = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const media_constants_1 = require("../../shared/constants/media.constants");
const mediaFileFilter = (req, file, callback) => {
    let ext = (0, path_1.extname)(file.originalname).slice(1);
    const checkMimeType = media_constants_1.UPLOAD_MEDIA_ALLOWED_MIME_TYPES.includes(file.mimetype);
    const checkFileType = media_constants_1.UPLOAD_MEDIA_ALLOWED_TYPES.includes(ext);
    if (!checkMimeType || !checkFileType)
        return callback(new common_1.BadRequestException('Imge type is not correct'), false);
    callback(null, true);
};
exports.mediaFileFilter = mediaFileFilter;
//# sourceMappingURL=media.filter.js.map