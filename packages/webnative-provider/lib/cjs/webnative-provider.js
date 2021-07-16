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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebNativeProvider = void 0;
const wn = __importStar(require("webnative"));
class WebNativeProvider {
    constructor(state, publish) {
        this.state = state;
        this.publish = publish;
    }
    set(name, content, options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state && this.state.authenticated && this.state.fs) {
                const args = name.split('/');
                const startFs = args[0] === 'private' || args[0] === 'public' ? '' :
                    options && options.encrypt ? 'private' : 'public';
                yield this.state.fs.write(wn.path.file(startFs, ...args), content);
                if (this.publish) {
                    yield ((_b = (_a = this.state) === null || _a === void 0 ? void 0 : _a.fs) === null || _b === void 0 ? void 0 : _b.publish());
                }
            }
            return name;
        });
    }
    get(name, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state && this.state.authenticated && this.state.fs) {
                const args = name.split('/');
                const startFs = args[0] === 'private' || args[0] === 'public' ? '' :
                    options && options.encrypt ? 'private' : 'public';
                const file = yield this.state.fs.cat(wn.path.file(startFs, ...args));
                return file.toString();
            }
            return '';
        });
    }
    delete(name, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state && this.state.authenticated && this.state.fs) {
                const args = name.split('/');
                const startFs = args[0] === 'private' || args[0] === 'public' ? '' :
                    options && options.encrypt ? 'private' : 'public';
                yield this.state.fs.rm(wn.path.file(startFs, ...args));
            }
        });
    }
}
exports.WebNativeProvider = WebNativeProvider;
