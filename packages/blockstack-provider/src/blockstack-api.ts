import { UserSession, Person, lookupProfile } from 'blockstack';

export class BlockStackApi {

    private user: {person: Person, username: string} | undefined = undefined;
    private _userSession: UserSession;

    constructor() {
        this._userSession = new UserSession();
    }

    public lookForUserData() {
        const session = this._userSession;
        let userData;
        if (session.isUserSignedIn()) {
            userData = session.loadUserData();
            const person = new Person(userData.profile);
            const username = userData.username;
            this.user = { person, username };
        } else if (session.isSignInPending()) {
            session.handlePendingSignIn()
                .then((x: any) => {
                    window.location = window.location.origin as any;
                });
        }
        const user = this.user;
        return { userData, user, session };
    }

    public redirectToSignIn(scopes?: string[] | undefined, manifestURI?: string | undefined) {
        const origin = window.location.origin;
        const lmanifestURI = manifestURI ? manifestURI :  origin + '/manifest.json'; 
        this._userSession.redirectToSignIn(origin, lmanifestURI, scopes ? scopes : ['store_write', 'publish_data']);
    }

    public signUserOut() {
        const origin = window.location.origin;
        this._userSession.signUserOut(origin);
    }

    public isUserSignedIn() {
        return this._userSession.isUserSignedIn();
    }

    public async getFile(path: string, options: object): Promise<string> {
        const s = await this._userSession.getFile(path, options);
        if (typeof s === 'string') {
            return s;
        } else {
            let content: string = '';
            (new Uint8Array(s)).forEach((byte: number) => {
                content += String.fromCharCode(byte);
            });
            return content;
        }
    }

    public putFile(path: string, content: string, options: object): Promise<string> {
        return this._userSession.putFile(path, content, options);
    }

    public deleteFile(path: string): Promise<void> {
        return this._userSession.deleteFile(path);
    }

    public signOut(redirectUrl?: string) {
        this._userSession.signUserOut(redirectUrl);
    }

    public async lookupProfile(userName: string) {
        return await lookupProfile(userName);
    }

    public get currentUser() { return this.user; }

    public get userSession() { return this.userSession };
 }
