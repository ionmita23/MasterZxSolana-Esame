import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();

//La chiave privata può essere salvata in un file test.json e non va condivisa con nessuno, non deve essere caricata su GitHub 

console.log("Hai generato il tuo nuovo wallet: ",keypair.publicKey.toBase58()," \n\n Per salvare il tuo wallet, copia e incolla il seguente JSON in un file: ",keypair.secretKey.toString())
