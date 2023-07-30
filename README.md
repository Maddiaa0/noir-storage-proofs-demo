<img align="right" width="150" height="150" top="100" src="./assets/readme.png">

# Noir Storage Proofs Demo

Short and easy source code demonstrating how to perform storage proofs in noir. An accompanying node script is included to fetch proofs from an ethereum node.

## Getting Started

**Required Tools**
- Nargo
- Node

- You will first need to have noir and nargo installed, you can find installation instructions [here](https://noir-lang.org/getting_started/nargo_installation). (Alternatively the github repo lives [here](https://github.com/noir-lang/noir))

- The typescript portion of this code uses the alchemy sdk (I yoinked the get proof code from their docs, its useful as it also includes the state root in one call), so you will require an alchemy key to run it. Alternatively the code can be refactored it use your own node.

- This circuit was tested with noir version @ commit [f3800c52c81a27d3b52cfe23f45e764234b1c268](https://github.com/noir-lang/noir/commit/f3800c52c81a27d3b52cfe23f45e764234b1c268)

**Building**
To run the typescript to get the proof you can run:
```bash
cd ts
npm install
ts-node index.ts
```

To create proofs:
```bash
# assuming you are already in the root of the repo
# generates a file "p.proof"
nargo prove p

# create a solidity verifier using
nargo codegen-verifier
```

## Acknowledgements

- [noir-trie-proofs](https://github.com/aragonzkresearch/noir-trie-proofs)

## Disclaimer

_This code is provided as is. No guarantee, representation or warranty is being made, express or implied, as to the safety or correctness of the circuits or smart contracts. They have not been audited and as such there can be no assurance they will work as intended, and users may experience delays, failures, errors, omissions, loss of transmitted information or loss of funds. The creators are not liable for any of the foregoing. Users should proceed with caution and use at their own risk._