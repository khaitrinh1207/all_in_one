import {createCipheriv, createDecipheriv, randomBytes} from "crypto";

function encrypt(password: string) {
    const key = randomBytes(32);
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return JSON.stringify({
        key,
        iv,
        encrypted,
    });
}

function decrypt(password: any) {
    const obj = JSON.parse(password);
    const { key, iv, encrypted } = obj;
    const decipher = createDecipheriv(
        'aes-256-cbc',
        Buffer.from(key.data),
        Buffer.from(iv.data),
    );
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

const pass = '123456';
// console.log(encrypt(pass));
console.log(decrypt(encrypt(pass)));