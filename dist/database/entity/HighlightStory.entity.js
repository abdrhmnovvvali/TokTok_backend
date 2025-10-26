"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighlightStoryEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const Story_entity_1 = require("./Story.entity");
const Highlight_entity_1 = require("./Highlight.entity");
let HighlightStoryEntity = class HighlightStoryEntity extends typeorm_1.BaseEntity {
    id;
    highlightId;
    storyId;
    highlight;
    story;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, highlightId: { required: true, type: () => Number }, storyId: { required: true, type: () => Number }, highlight: { required: true, type: () => require("./Highlight.entity").HighlightEntity }, story: { required: true, type: () => require("./Story.entity").StoryEntity } };
    }
};
exports.HighlightStoryEntity = HighlightStoryEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], HighlightStoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], HighlightStoryEntity.prototype, "highlightId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], HighlightStoryEntity.prototype, "storyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Highlight_entity_1.HighlightEntity, (highlight) => highlight.highlightStories, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "highlightId" }),
    __metadata("design:type", Highlight_entity_1.HighlightEntity)
], HighlightStoryEntity.prototype, "highlight", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Story_entity_1.StoryEntity, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "storyId" }),
    __metadata("design:type", Story_entity_1.StoryEntity)
], HighlightStoryEntity.prototype, "story", void 0);
exports.HighlightStoryEntity = HighlightStoryEntity = __decorate([
    (0, typeorm_1.Entity)("highlight_stories")
], HighlightStoryEntity);
//# sourceMappingURL=HighlightStory.entity.js.map