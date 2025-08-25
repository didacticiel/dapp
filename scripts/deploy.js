const hre = require("hardhat");
const  fs  =  require('fs');

async function main() {
 
  const TitreFoncierContract = await hre.ethers.getContractFactory("TitreFoncierContract");
  const titreFoncier = await TitreFoncierContract.deploy();

  await titreFoncier.waitForDeployment();

  // adresse  du contrat
  const contractAddress =  await titreFoncier.getAddress() 
  const contractData =  {
    'address': contractAddress
  }

  console.log("✅ Contrat déployé à :",  contractAddress);

  //  enregistrement du contract dans  un ficher
  fs.writeFile('contract.json', JSON.stringify(contractData), (err)=>{
      if(err){
        console.log('Erreur lors  de la création de  fichier  de  contract')
      }
      console.log('✅ Fichier  de  contract  créer  avec  succès!');
  });
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});