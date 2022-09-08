"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cli_1 = __importDefault(require("./Cli"));
function default_1(context) {
    const { React, hooks } = context;
    hooks.addContent('SiteInfoOverview_TableList', (site) => React.createElement(Cli_1.default, { key: "globalize-cli", site: site }));
}
exports.default = default_1;
//# sourceMappingURL=renderer.js.map