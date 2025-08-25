const { expect } = require("chai");
const hre = require("hardhat");

describe("TitreFoncierContract",async ()=>{
    it("Recuperer correctement le  nombre de  titre foncier", async function () {
        const  [admin, otherAccount] = await hre.ethers.getSigners();
    
        const titreFoncier = await hre.ethers.deployContract(
            "TitreFoncierContract"
        );
        expect( await titreFoncier.getTitreFoncier()).to.equal(0);
    });


    it("Creer correctement  un titre foncier", async function () {
        const  [admin, otherAccount] = await hre.ethers.getSigners();
    
        const titreFoncier = await hre.ethers.deployContract(
            "TitreFoncierContract"
        );


        await titreFoncier.CreateTitreFoncier(
            12345,
            67890,
            "Jean Dupont",
            "jean@example.com",
            "Cotonou",
            1,
            101
        );
        expect( await titreFoncier.getTitreFoncier()).to.equal(1);
    });


    it("Retourner une  erreur si pas admin", async function () {
        const  [admin, otherAccount] = await hre.ethers.getSigners();
    
        const titreFoncier = await hre.ethers.deployContract(
            "TitreFoncierContract"
        );


        await titreFoncier.CreateTitreFoncier(
            12345,
            67890,
            "Jean Dupont",
            "jean@example.com",
            "Cotonou",
            1,
            101
        );
        
        // await 
    });


     it("Récupérer correctement l'etat  d'un titre foncier", async function () {
        const  [admin, otherAccount] = await hre.ethers.getSigners();
    
        const titreFoncier = await hre.ethers.deployContract(
            "TitreFoncierContract"
        );


        const accountID = await titreFoncier.CreateTitreFoncier(
            12345,
            67890,
            "Jean Dupont",
            "jean@example.com",
            "Cotonou",
            1,
            101
        );

        expect( await titreFoncier.getTitreFoncierState(0)).to.equal(true);
    });



     it("Ne Récupérer pas  l'etat  d'un titre  foncier  non  existant", async function () {
        const  [admin, otherAccount] = await hre.ethers.getSigners();
    
        const titreFoncier = await hre.ethers.deployContract(
            "TitreFoncierContract"
        );

       await expect(  titreFoncier.getTitreFoncierState(0)).to.be.revertedWith('Foncier not found');
    });



})