use dep::proof;

fn main(
    // Trie proof
    proof: [u8; 2660], 
    
    // The storage slot we would like to prove
    key: [u8;32], 

    // The storage root we would like to prove against
    storage: [u8; 32], 

    // The value in the storage slot
    value: [u8; 32], 
) {
    // Perform trie proof of depth 5
    let depth = 5;

    let trie_proof = proof::TrieProof {
        key,
        proof,
        depth,
        value
    };

    // Constrain the proof to be valid
    assert(trie_proof.verify_storage_root(storage));
}