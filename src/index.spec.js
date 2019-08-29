import md5 from "./index";

describe("md5-crypto", () => {
    describe("returns", () => {
        it("expected result", function() {
            md5("Jack").must.equal("40687c8206d15373954d8b27c6724f62");
        });

        it("doesn't force string values", function() {
            (() => md5("123")).must.not.throw();
            (() => md5(123)).must.throw(TypeError);
        });
    });

    describe("works", () => {
        const cryptoMock = {
            createHash: (...createArgs) => {
                cryptoMock.__createHash.push(createArgs);
                return {
                    update: (...updateArgs) => {
                        cryptoMock.__update.push(updateArgs);
                        return {
                            digest: (...digestArgs) => {
                                cryptoMock.__digest.push(digestArgs);
                            },
                        };
                    },
                };
            },
            __createHash: [],
            __update: [],
            __digest: [],
        };

        before(() => {
            md5.__Rewire__("crypto", cryptoMock);
        });

        after(() => {
            md5.__ResetDependency__("crypto");
        });

        beforeEach(() => {
            cryptoMock.__createHash.length = 0;
            cryptoMock.__update.length = 0;
            cryptoMock.__digest.length = 0;
        });

        it("by calling crypto methods as expected", function() {
            md5("Jack");
            cryptoMock.__createHash.must.eql([
                ["md5"],
            ]);
            cryptoMock.__update.must.eql([
                ["Jack"],
            ]);
            cryptoMock.__digest.must.eql([
                ["hex"],
            ]);
        });

        it("by ignoring additional arguments", function() {
            md5("Jack", "Black");
            cryptoMock.__createHash.must.eql([
                ["md5"],
            ]);
            cryptoMock.__update.must.eql([
                ["Jack"],
            ]);
            cryptoMock.__digest.must.eql([
                ["hex"],
            ]);
        });
    });
});
