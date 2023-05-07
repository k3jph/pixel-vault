const createNFT = require("../scripts/createNFT.js");
const getURIData = require("../scripts/getURIData.js");
const ownerOf = require("../scripts/ownerOf.js");
const transferNFT = require("../scripts/transferNFT.js");
const ELEN_E6883_NFT = artifacts.require("./ELEN_E6883_NFT.sol");

contract("ELEN_E6883_NFT", function ([acct1, acct2, acct3, acct4]) {
    it("TC1: create a NFT with unique ID.", async () => {
        const name = "Test NFT #1";
        const desc = "This is a test NFT description for test case 1";

        const txnData = await createNFT(1216, name, desc);
        const dataURI = await getURIData(1216);

        const jsonObj = atob(dataURI.substring(29));
        const result = JSON.parse(jsonObj);

        assert.equal(name, result.name, "The name was not stored.");
        assert.equal(desc, result.description, "The description was not stored.");
    });

    //*** VK added code #3 ***
    it("TC2: transfer ownership.", async () => {
        const name = "Test NFT #2";
        const desc = "This is a test NFT description for test case 2";

        const tokenID = await createNFT(1217, name, desc);
        const dataURI = await getURIData(1217);

        await transferNFT(1217, "0x51ad24020e97def8a779e50cbfc28439a73dd398");
        const currOwner = await ownerOf(1217);
        assert.equal(currOwner, "0x51ad24020e97def8a779e50cbfc28439a73dd398", "The owners should be the same.");
    });
    
    it("TC3: List NFT.", async () => {
        await createSale (1216, 110)
        const price = await getPrice(1216);
        assert.equal(price, 1216, "The price does not match.");
    });
    
    it("TC4: delist NFT.", async () => {
        await delistNFT (1216)
        const aOwner = await getOwner(1216);
        assert.equal(aOwner, NaN, "Delist NFT was not done.");
    });
    
    it("TC5: Sell NFT.", async () => {
        const currOwner = await getOwner(1216);
        await sellNFT (1216);
        const newOwner = await getOwner(1216);
        assert.notEqual(currOwner, newOwner, "Sell unsucessful.");
    });

    it("TC6: Unsuccessful Sell NFT.", async () => {
        const currOwner = await getOwner(1216);
        await cancelSale (1216);
        const newOwner = await getOwner(1216);
        assert.equal(currOwner, newOwner, "Sell Cancel order failed.");
    });
    //*** VK end code #3 ***    
});