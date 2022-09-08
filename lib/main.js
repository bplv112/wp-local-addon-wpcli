"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// https://getflywheel.github.io/local-addon-api/modules/_local_main_.html
const LocalMain = __importStar(require("@getflywheel/local/main"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
function default_1(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const { electron } = context;
        const { ipcMain } = electron;
        // the save function.
        ipcMain.on('enable-globalcli', (event, siteData) => __awaiter(this, void 0, void 0, function* () {
            const site = LocalMain.SiteData.getSite(siteData.id);
            const socketPath = path_1.default.join(site.paths.runData, 'mysql', 'mysqld.sock');
            const phpConf = `<?php
			define('DB_HOST', 'localhost:${socketPath}');
			error_reporting(E_ERROR);
			define( 'WP_DEBUG', false );
			`;
            const buildConf = `path: app/public\nrequire:\n  - wp-cli.local.php`;
            yield fs_extra_1.default.writeFile(path_1.default.join(site.longPath, 'wp-cli.local.php'), phpConf);
            yield fs_extra_1.default.writeFile(path_1.default.join(site.longPath, 'wp-cli.local.yml'), buildConf);
        }));
    });
}
exports.default = default_1;
//# sourceMappingURL=main.js.map