import {encode, decode} from "base64-arraybuffer";
import libsignal from "../signal-protocol";

function SignalProtocolStore() {
    this.store = {};
}

SignalProtocolStore.prototype = {
    Direction: {
        SENDING: 1,
        RECEIVING: 2,
    },

    getIdentityKeyPair: function () {
        return Promise.resolve(this.get("identityKey"));
    },
    getLocalRegistrationId: function () {
        return Promise.resolve(this.get("registrationId"));
    },
    put: function (key, value) {
        if (
            key === undefined ||
            value === undefined ||
            key === null ||
            value === null
        )
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
        const trusted = this.get("identityKey" + identifier);
        if (trusted === undefined) {
            return Promise.resolve(true);
        }
        return Promise.resolve(encode(identityKey) === encode(trusted));
    },
    loadIdentityKey: function (identifier) {
        if (identifier === null || identifier === undefined)
            throw new Error("Tried to get identity key for undefined/null key");
        return Promise.resolve(this.get("identityKey" + identifier));
    },
    saveIdentity: function (identifier, identityKey) {
        if (identifier === null || identifier === undefined)
            throw new Error("Tried to put identity key for undefined/null key");

        if (typeof identifier !== "string" || !identifier.match(/.*\.\d+/)) {
            throw new Error("Invalid SignalProtocolAddress string");
        }
        const [name, _] = identifier.split(".");

        const existing = this.get("identityKey" + name);
        this.put("identityKey" + name, identityKey);

        if (existing && encode(identityKey) !== encode(existing)) {
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    },

    /* Returns a prekeypair object or undefined */
    loadPreKey: function (keyId) {
        let res = this.get("25519KeypreKey" + keyId);
        if (res !== undefined) {
            res = {pubKey: res.pubKey, privKey: res.privKey};
        }
        return Promise.resolve(res);
    },
    storePreKey: function (keyId, keyPair) {
        return Promise.resolve(this.put("25519KeypreKey" + keyId, keyPair));
    },
    removePreKey: function (keyId) {
        return Promise.resolve(this.remove("25519KeypreKey" + keyId));
    },

    /* Returns a signed keypair object or undefined */
    loadSignedPreKey: function (keyId) {
        let res = this.get("25519KeysignedKey" + keyId);
        if (res !== undefined) {
            res = {pubKey: res.pubKey, privKey: res.privKey};
        }
        return Promise.resolve(res);
    },
    storeSignedPreKey: function (keyId, keyPair) {
        return Promise.resolve(this.put("25519KeysignedKey" + keyId, keyPair));
    },
    removeSignedPreKey: function (keyId) {
        return Promise.resolve(this.remove("25519KeysignedKey" + keyId));
    },

    loadSession: function (identifier) {
        return Promise.resolve(this.get("session" + identifier));
    },
    storeSession: function (identifier, record) {
        return Promise.resolve(this.put("session" + identifier, record));
    },
    removeSession: function (identifier) {
        return Promise.resolve(this.remove("session" + identifier));
    },
    removeAllSessions: function (identifier) {
        for (let id in this.store) {
            if (id.startsWith("session" + identifier)) {
                delete this.store[id];
            }
        }
        return Promise.resolve();
    },
};
const {KeyHelper, SignalProtocolAddress, SessionBuilder, SessionCipher} = libsignal;

const DEVICE_ID = 0;
let preKeyId = 1;
let signedPreKeyId = 1;

const store = new SignalProtocolStore();

const util = {
    ab2str: (buf) => {
        return String.fromCharCode.apply(null, new Uint16Array(buf));
    },
    str2ab: (str) => {
        var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
        var bufView = new Uint16Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    },
};

export const initService = async () => {
    await KeyHelper.ensureSecure();
    await verifyIndetity();
    return Promise.resolve();
};

const verifyIndetity = async () => {
    const identityKeyPair = await store.getIdentityKeyPair();
    const localRegistrationId = await store.getLocalRegistrationId();

    if (
        !identityKeyPair ||
        identityKeyPair === undefined ||
        !localRegistrationId ||
        localRegistrationId === undefined
    ) {
        console.log("keys do not exist, generating new identity");
        await generateIdentity();
    }

    return Promise.resolve();
};

function generateIdentity() {
    return Promise.all([
        KeyHelper.generateIdentityKeyPair(),
        KeyHelper.generateRegistrationId(),
    ]).then(function (result) {
        store.put("identityKey", result[0]);
        store.put("registrationId", result[1]);
    });
}

// Creates preKey bundle as a string for a userId
export function generatePreKeyBundle(userId) {
    return Promise.all([
        store.getIdentityKeyPair(),
        store.getLocalRegistrationId(),
    ]).then(function (result) {
        console.log(`generating bundle for: ${userId}`);
        var identity = result[0];
        var registrationId = result[1];

        return Promise.all([
            KeyHelper.generatePreKey(preKeyId),
            KeyHelper.generateSignedPreKey(identity, signedPreKeyId),
        ]).then(function (keys) {
            var preKey = keys[0];
            var signedPreKey = keys[1];

            store.storePreKey(preKeyId, preKey.keyPair);
            store.storeSignedPreKey(signedPreKeyId, signedPreKey.keyPair);

            const preKeyBundle = {
                userId: userId,
                identityKey: encode(identity.pubKey),
                registrationId: registrationId,
                preKey: {
                    keyId: preKeyId,
                    publicKey: encode(preKey.keyPair.pubKey),
                },
                signedPreKey: {
                    keyId: signedPreKeyId,
                    publicKey: encode(signedPreKey.keyPair.pubKey),
                    signature: encode(signedPreKey.signature),
                },
            };

            preKeyId = preKeyId + 1;
            signedPreKeyId = signedPreKeyId + 1;

            return JSON.stringify(preKeyBundle);
        });
    });
}

// Must be called after initializeSession and when a message is sent
// Returns promise of signal message
export function encryptMessage(plaintext, recipientUserId, recipientDeviceId) {
    console.log(`Encrypting: ${plaintext}`);
    const bytes = util.str2ab(plaintext);

    const recipientAddress = new SignalProtocolAddress(recipientUserId, DEVICE_ID);
    const sessionCipher = new SessionCipher(
        store,
        recipientAddress
    );

    return sessionCipher.encrypt(bytes)
}

// Returns promise of decrypted plaintext
// TODO: What if you receive a whisper message for an address you have already processed a prekey for?
export function decryptMessage(message, senderUserId, senderDeviceId) {
    const senderAddress = new SignalProtocolAddress(senderUserId, DEVICE_ID);
    const sessionCipher = new SessionCipher(
        store,
        senderAddress
    );

    if (message.type === 3) {
        return sessionCipher.decryptPreKeyWhisperMessage(
            message.body,
            "binary"
        ).then(function (decryptedMessageBytes) {
            return util.ab2str(decryptedMessageBytes)
        });
    } else {
         return sessionCipher.decryptWhisperMessage(
            message.body,
            "binary"
        ).then(function (decryptedMessageBytes) {
             return util.ab2str(decryptedMessageBytes);
         });
    }
}

// Call this function after scanning QR code
// Returns promise of promised pre key
// TODO: What if two bundles are processed for the same address?
// TODO: What if both users process each others bundles and try sending messages?
export function initializeSession(preKeyBundleString, recipientDeviceId) {
    // decode pre key bundle
    const preKeyBundle = JSON.parse(preKeyBundleString);
    preKeyBundle.identityKey = decode(preKeyBundle.identityKey);
    preKeyBundle.preKey.publicKey = decode(preKeyBundle.preKey.publicKey);
    preKeyBundle.signedPreKey.publicKey = decode(preKeyBundle.signedPreKey.publicKey);
    preKeyBundle.signedPreKey.signature = decode(preKeyBundle.signedPreKey.signature);

    // Create address object for recipient
    const recipientAddress = new SignalProtocolAddress(preKeyBundle.userId, DEVICE_ID);
    // Creation session builder object for address
    const builder = new SessionBuilder(store, recipientAddress);
    // Process Pre Key for the session
    return builder.processPreKey(preKeyBundle);
}