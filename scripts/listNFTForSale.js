//SPDX-License-Identifier: MIT

var ELEN_E6883_NFT = artifacts.require("./ELEN_E6883_NFT.sol");

function getErrorMessage(error) {
    if (error instanceof Error) return error.message
    return String(error)
}

const listNFTForSale = async (unique_id, price) => {
    try {
        const nftContract = await ELEN_E6883_NFT.deployed();
        const txn = await nftContract.listNFTForSale(unique_id, price);
        return txn;
    } catch(err) {
        console.log('Doh! ', getErrorMessage(err));
    }
}

module.exports = listNFTForSale;
