import { 
    Keypair, 
    Connection,
    PublicKey, 
} from "@solana/web3.js";

import { 
    mintTo,
    getOrCreateAssociatedTokenAccount,
 } from "@solana/spl-token";

import wallet from "../test.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

//deve contenere la chiave pubblica del mint creato con spl_init
const mint = new PublicKey("9HQUDxeBBD1E7wSbES6s5ugDyDdQrN1bMzDpP8Dpo86W");

(async () => {

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        keypair.publicKey,
    );

    const ata = tokenAccount.address;
    console.log("Token Account: ", ata.toBase58());

    const amount = 20e6;

    await mintTo(
        connection,
        keypair,
        mint,
        ata,
        keypair.publicKey,
        amount
    );

    console.log("Minted", amount, "to", ata.toBase58());

})()