import { 
    Keypair, 
    Connection,
    PublicKey, 
} from "@solana/web3.js";

import { 
    getOrCreateAssociatedTokenAccount,
    transfer,
 } from "@solana/spl-token";

import wallet from "../test.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const mint = new PublicKey("9HQUDxeBBD1E7wSbES6s5ugDyDdQrN1bMzDpP8Dpo86W");

const fromAta = new PublicKey("3PVDEYFDGBXVyWF921wCzYmkMitpUpwQkAztTzoGidtj");

const to = Keypair.generate();
console.log("To: ", to.publicKey.toBase58());

(async () => {

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection, 
        keypair,
        mint,
        to.publicKey,
    );

    const toAta = tokenAccount.address;
    console.log("Token Account: ", toAta.toBase58());

    const amountToAta = tokenAccount.amount;
    console.log("Amount token account: ", amountToAta.toString());

    const amount = 30e6;

    await transfer(
        connection,
        keypair,
        fromAta,
        toAta,
        keypair,
        amount
    );

    console.log("Transferred", amount, "from token account: ", fromAta.toBase58(), "to token account: ", toAta.toBase58());
})()