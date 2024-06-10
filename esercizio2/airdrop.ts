import { 
    Keypair, 
    Connection, 
    LAMPORTS_PER_SOL 
} from "@solana/web3.js";

import wallet from "../test.json";

const connection = new Connection("https://api.devnet.solana.com", "finalized");

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

(async () => {
    try {
        
        // da notare che nel metodo airdrop non è specificato chi ci invia i SOL , questo perché i SOL verranno inviati 
        // dalla faucet (rubinetto) di SOLANA
        const airdropSignature = await connection.requestAirdrop(
            keypair.publicKey,    
            1 * LAMPORTS_PER_SOL    
        );

        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${airdropSignature}?cluster=devnet`);
        
    } catch (error) {
        console.error(error);
    }
})();