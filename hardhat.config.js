
const { task } = require("hardhat/config");

require("@nomicfoundation/hardhat-toolbox");
/*require("@nomiclabs/hardhat-ethers");*/


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks : {
  hardhat: {
    count: 20,
    accountsBalance: "1000000000000"
  }
}
};
//  les  comptes,  les  balance de  compte,  une  balance  par son   adresse




task('accounts',  'It  is list  of  accounts',async (taskArgs, hre)=>{
  const accounts =  await  hre.ethers.getSigners();
  for(const account of  accounts){
    console.log(account.address);
  }
});



task('balances',  'It  is list  of  balances',async (taskArgs, hre)=>{
  const accounts =  await  hre.ethers.getSigners();
  for(const account of  accounts){
    const  balance =  await  hre.ethers.provider.getBalance(account.address);

    console.log(account.address,  " : ",  balance, 'ETH');
  }
});

task("getBalanceByAddress", "Récupèration de la balance d'un compte spécifique")
.addParam("accountAddress", "L'adresse du compte à passer en Param avec --account-address <string>")
.setAction(async (taskArgs, hre) => {
  const {accountAddress} = taskArgs;
  const balance = await hre.ethers.provider.getBalance(accountAddress);
  console.log("lA balance du compte est :", parseFloat(balance)/parseFloat(1e18), "ETH");
});


//pour test ----------
// npx hardhat getBalanceByAddress --account-address "0xdD2FD4581271e230360230F9337D5c0430Bf44C0" 