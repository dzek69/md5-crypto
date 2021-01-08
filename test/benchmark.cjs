const md5 = require("md5");
const md5Crypto = require("./../dist").default;

const SHORT_COUNT = 100000;
const LONG_COUNT = 100;

const longString = Array(100000).fill("x").join("");
const generateLongString = () => Array(100000).fill(String(Math.random()).substr(4, 1)).join("");

const run = (fn, times) => {
    const start = Date.now();

    for (let i = 0; i < times; i++) {
        fn();
    }

    return Date.now() - start;
};

const results = (md5Result, md5CryptoResult, times, on) => {
    console.log("`md5` module takes", md5Result, `ms to run ${times} times`, `on ${on}`);
    console.log("`md5-crypto` module takes", md5CryptoResult, `ms to run ${times} times`, `(${md5Result - md5CryptoResult} ms and ${(md5Result/md5CryptoResult).toFixed(2)} times better)`, `on ${on}`);
    console.log("");
};

console.log("");

results(
    run(() => md5("Hello"), SHORT_COUNT),
    run(() => md5Crypto("Hello"), SHORT_COUNT),
    SHORT_COUNT,
    "short string",
);

results(
    run(() => md5(longString), LONG_COUNT),
    run(() => md5Crypto(longString), LONG_COUNT),
    LONG_COUNT,
    "long string (100k bytes)",
);

results(
    run(() => md5(generateLongString()), LONG_COUNT),
    run(() => md5Crypto(generateLongString()), LONG_COUNT),
    LONG_COUNT,
    "long string (100k bytes, random-same-character string each time)",
);
