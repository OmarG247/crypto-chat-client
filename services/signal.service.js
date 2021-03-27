import {encode} from "base64-arraybuffer";
// import libsignal from "signal-protocol";

// console.log(libsignal);

const util = {
    ab2str: buf => {
        return String.fromCharCode.apply(null, new Uint16Array(buf));
    },
    str2ab: str => {
        var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
        var bufView = new Uint16Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }
};

function SignalProtocolStore() {
    this.store = {};
}

SignalProtocolStore.prototype = {
    Direction: {
        SENDING: 1,
        RECEIVING: 2,
    },

    getIdentityKeyPair: function () {
        return Promise.resolve(this.get('identityKey'));
    },
    getLocalRegistrationId: function () {
        return Promise.resolve(this.get('registrationId'));
    },
    put: function (key, value) {
        if (key === undefined || value === undefined || key === null || value === null)
            throw new Error("Tried to store undefined/null");
        this.store[key] = value;
    },
    get: function (key, defaultValue) {
        if (key === null || key === undefined)
            throw new Error("Tried to get value for undefined/null key");
        if (key in this.store) {
            return this.store[key];
        } else {
            return defaultValue;
        }
    },
    remove: function (key) {
        if (key === null || key === undefined)
            throw new Error("Tried to remove value for undefined/null key");
        delete this.store[key];
    },

    isTrustedIdentity: function (identifier, identityKey, direction) {
        if (identifier === null || identifier === undefined) {
            throw new Error("tried to check identity key for undefined/null key");
        }
        if (!(identityKey instanceof ArrayBuffer)) {
            throw new Error("Expected identityKey to be an ArrayBuffer");
        }
        const trusted = this.get('identityKey' + identifier);
        if (trusted === undefined) {
            return Promise.resolve(true);
        }
        return Promise.resolve(encode(identityKey) === encode(trusted));
    },
    loadIdentityKey: function (identifier) {
        if (identifier === null || identifier === undefined)
            throw new Error("Tried to get identity key for undefined/null key");
        return Promise.resolve(this.get('identityKey' + identifier));
    },
    saveIdentity: function (identifier, identityKey) {
        if (identifier === null || identifier === undefined)
            throw new Error("Tried to put identity key for undefined/null key");

        if (typeof identifier !== 'string' || !identifier.match(/.*\.\d+/)) {
            throw new Error('Invalid SignalProtocolAddress string');
        }
        const [name, _] = identifier.split('.');

        const existing = this.get('identityKey' + name);
        this.put('identityKey' + name, identityKey)

        if (existing && encode(identityKey) !== encode(existing)) {
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }

    },

    /* Returns a prekeypair object or undefined */
    loadPreKey: function (keyId) {
        let res = this.get('25519KeypreKey' + keyId);
        if (res !== undefined) {
            res = {pubKey: res.pubKey, privKey: res.privKey};
        }
        return Promise.resolve(res);
    },
    storePreKey: function (keyId, keyPair) {
        return Promise.resolve(this.put('25519KeypreKey' + keyId, keyPair));
    },
    removePreKey: function (keyId) {
        return Promise.resolve(this.remove('25519KeypreKey' + keyId));
    },

    /* Returns a signed keypair object or undefined */
    loadSignedPreKey: function (keyId) {
        let res = this.get('25519KeysignedKey' + keyId);
        if (res !== undefined) {
            res = {pubKey: res.pubKey, privKey: res.privKey};
        }
        return Promise.resolve(res);
    },
    storeSignedPreKey: function (keyId, keyPair) {
        return Promise.resolve(this.put('25519KeysignedKey' + keyId, keyPair));
    },
    removeSignedPreKey: function (keyId) {
        return Promise.resolve(this.remove('25519KeysignedKey' + keyId));
    },

    loadSession: function (identifier) {
        return Promise.resolve(this.get('session' + identifier));
    },
    storeSession: function (identifier, record) {
        return Promise.resolve(this.put('session' + identifier, record));
    },
    removeSession: function (identifier) {
        return Promise.resolve(this.remove('session' + identifier));
    },
    removeAllSessions: function (identifier) {
        for (let id in this.store) {
            if (id.startsWith('session' + identifier)) {
                delete this.store[id];
            }
        }
        return Promise.resolve();
    }
};

export default SignalProtocolStore;