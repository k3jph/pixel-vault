const createNFT = require("../scripts/createNFT.js");
const getPrice = require("../scripts/getPrice.js");
const getURIData = require("../scripts/getURIData.js");
const isNFTForSale = require("../scripts/isNFTForSale.js");
const listNFTForSale = require("../scripts/listNFTForSale.js");
const ownerOf = require("../scripts/ownerOf.js");
const removeNFTFromSale = require("../scripts/removeNFTFromSale.js");
const transferNFT = require("../scripts/transferNFT.js");
const ELEN_E6883_NFT = artifacts.require("./ELEN_E6883_NFT.sol");

var primaryOwner;

contract("ELEN_E6883_NFT", function ([acct1, acct2, acct3, acct4]) {
    it("TC1: create a NFT with unique ID.", async () => {
        const name = "Test NFT #1";
        const desc = "This is a test NFT description for test case 1";

        const txnData = await createNFT(1216, name, desc);
        const dataURI = await getURIData(1216);
        const primaryOwner = await ownerOf(1216);

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
        await transferNFT(1217, "0x51ad24020e97def8a779e50cbfc28439a73dd398");

        const currOwner = await ownerOf(1217);
        assert.equal(currOwner, "0x51ad24020e97def8a779e50cbfc28439a73dd398", "The owners should be the same.");
    });
    
    it("TC3: List NFT.", async () => {
        const name = "Test NFT #3";
        const desc = "This is a test NFT description for test case 3";

        const tokenID = await createNFT(1218, name, desc);
        await listNFTForSale(1218, 31415);

        const price = await getPrice(1218);
        assert.equal(price, 31415, "The price does not match.");
    });
    
    it("TC4: delist NFT.", async () => {
        const name = "Test NFT #4";
        const desc = "This is a test NFT description for test case 4";

        const tokenID = await createNFT(1219, name, desc);
        await listNFTForSale(1219, 31415);
        await removeNFTFromSale(1219);

        assert.equal(await isNFTForSale(1219), false, "The NFT is still for sale.");
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