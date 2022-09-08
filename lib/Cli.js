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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const local_components_1 = require("@getflywheel/local-components");
const electron_1 = require("electron");
const os_1 = require("os");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
class Cli extends react_1.Component {
    // constructors
    constructor(props) {
        super(props);
        this.state = {
            enabled: false,
        };
        this.enableGlobalCli = this.enableGlobalCli.bind(this);
        this.checkIfEnabled = this.checkIfEnabled.bind(this);
        this.checkIfEnabled();
    }
    // initial check.
    componentDidMount() {
        this.checkIfEnabled();
    }
    // check on site switch.
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.site.id !== prevProps.site.id) {
            this.checkIfEnabled();
        }
    }
    // Enable global cli.
    enableGlobalCli() {
        this.setState({
            enabled: true,
        });
        electron_1.ipcRenderer.send('enable-globalcli', this.props.site);
    }
    // Check if global cli files are there.
    checkIfEnabled() {
        const homeDir = os_1.homedir();
        // TODO - fetch this from local `longPath`.
        const homePath = this.props.site.path.replace("~", homeDir);
        if (fs_extra_1.default.existsSync(path_1.default.join(homePath, 'wp-cli.local.yml'))) {
            this.setState({
                enabled: true,
            });
        }
        else {
            this.setState({
                enabled: false,
            });
        }
    }
    // render
    render() {
        return (react_1.default.createElement("li", { ClassName: "TableListRow" },
            react_1.default.createElement("strong", null, "Global Cli"),
            react_1.default.createElement("div", null,
                react_1.default.createElement(local_components_1.TextButton, { size: "tiny", style: { padding: '0' }, onClick: this.enableGlobalCli, disabled: this.state.enabled }, this.state.enabled ? 'Enabled' : 'Enable'))));
    }
}
exports.default = Cli;
// Proptypes
Cli.propTypes = {
    enable: prop_types_1.default.bool,
};
//# sourceMappingURL=Cli.js.map