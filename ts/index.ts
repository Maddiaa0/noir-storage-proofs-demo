import { Network, Alchemy } from "alchemy-sdk";
import TOML from "@iarna/toml";
import fs from "fs";

type Serial ={
    proof: number[];
    key: number[]
    value: number[]
    storage: number[]
}

function serialise(val: string, pad: boolean = false) {
    let x = val.replace("0x","")
    if (pad) { 
        x = x.padStart(64, '0')
    }
    return Array.from(Buffer.from(x, "hex"))

}

// Setup: npm install alchemy-sdk
// Github: https://github.com/alchemyplatform/alchemy-sdk-js
async function main() {
    // Optional config object, but defaults to demo api-key and eth-mainnet.
    const settings = {
      apiKey: "YOUR_API_KEY_HERE",
      network: Network.ETH_MAINNET, 
    };
    const alchemy = new Alchemy(settings);

    // Data to get the first owner of cryptopunk #1
    const res = await alchemy.core.send('eth_getProof', [
      '0xb47e3cd837dDF8e4c57f05d70ab865de6e193bbb',
      ["0xbbc70db1b6c7afd11e79c0fb0051300458f1a3acb8ee9789d9b6b26c61ad9bc7"],
      "latest",
    ]);

    const MAX_TRIE_NODE_LENGTH = 532;
    const {storageProof, storageHash} = res;
    const punkProof = storageProof[0];

    let proofPath: string = "";
    for (let i = 0; i < punkProof.proof.length; i++) {
        let layer = punkProof.proof[i];
        layer = layer.replace("0x","").padEnd(MAX_TRIE_NODE_LENGTH * 2, '0')
        proofPath = proofPath + layer
    }

    // encode this into bytes which can be interpreted by the prover
    // The rlp encoded proof path is right padded at each node with 0s and then concatenated
    const key = serialise(punkProof.key);
    const value = serialise(punkProof.value, true)
    const proof = serialise(proofPath);
    const storage = serialise(storageHash);

    const proofData: Serial = {
     proof,
     key,
     storage,
     value,
    };

    const proofAsToml = TOML.stringify(proofData);
    fs.writeFileSync("Prover.toml", proofAsToml);
}

main();

