//SPDX-License-Identifier: MIT

var ELEN_E6883_NFT = artifacts.require("./ELEN_E6883_NFT.sol");

function getErrorMessage(error) {
    if (error instanceof Error) return error.message
    return String(error)
}

const transferNFT = async (unique_id, newOwner) => {
    try {
        const nftContract = await ELEN_E6883_NFT.deployed();
        const txn = await nftContract.transferNFTOwnership(unique_id, newOwner);
        return txn;
    } catch(err) {
        console.log('Doh! ', getErrorMessage(err));
    }
}

module.exports = transferNFT;
