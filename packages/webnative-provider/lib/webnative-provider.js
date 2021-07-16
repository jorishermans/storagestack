var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as wn from 'webnative';
export class WebNativeProvider {
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
