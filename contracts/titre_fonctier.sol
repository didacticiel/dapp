// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

/*
Ecrire  une structure pour representer  le titre   foncier
Deux  variable  d'etat: 
    - address  de  l'admin
    - le compteur   pour  titres  fonciers
Deux  mappings
 -titre UIN 
 -numero du  titre UINT => BOOL
Event de  titre  save

Construteurs 
    - initialiser  l'address  de  l'admin
Ecrire  un modifier onlyAdmin  pour  restreindre  certaines  fonctions : 
 enregistrer un titre : onlyadmin
 verifier  un titre par son  numero
 obtenir  nombre  total  de  titre

Ecrire le  deploy.js  pour  le deploiment de smart contract

Ecrire  le  fichier  tests  unit  du  contrat
*/

contract TitreFoncierContract{
    //event de titre save
    event Save(TitreFoncier _foncier);
    //struture pour enregistrer les proprietairene
    struct Person{
        uint npi;
        uint ifu;
        string fullname;
        string email;
    }

    //structure pour enregistrer le domaine
    struct Domain{
        uint id;
        uint topo_no;
        string location;
    }
    //structure pour enregister le titre foncier
    struct TitreFoncier{
        uint id_ufci;
        Person proprietaire;
        Domain domain;
    }
    //créer deux variables d'état
    address admin;
    uint foncierCount = 0;
    //créer deux mapping pour stocker le titre foncier et le numéro du titre foncier
    mapping(uint => TitreFoncier) titreFonciers;
    mapping(uint => bool) foncierStates;
    //créer un constructeur pour initialiser l'adresse de l'admin
    constructor(){
        admin = msg.sender; 
    }

    //Ecrir un modifier (onlyAdmin) pour restreidre les fonctions
    modifier onlyAdmin(){
        require(msg.sender == admin, "You are not admin");
        _;
    }

    //Ecrire une fonction  poue créer un  titre foncier
    function CreateTitreFoncier(
        uint _npi,
        uint _ifu,
        string memory _fullname,
        string memory _email, 
        string memory _location,
        uint _idDomain, 
        uint _topoNo
    ) public onlyAdmin returns(uint) { 
        Person memory proprietaire = Person(
            {
                npi: _npi,
                ifu:_ifu,
                fullname:_fullname, 
                email: _email
            }
        );
        Domain memory area = Domain(_idDomain,_topoNo,_location);
        
        titreFonciers[foncierCount] = TitreFoncier({
            id_ufci : foncierCount,
            proprietaire : proprietaire,
            domain : area
        });
        emit Save(titreFonciers[foncierCount]);
        foncierStates[foncierCount] = true;
        foncierCount ++;

        return foncierCount-1;
    }

    //Ecrire une fonction pour vérifier un titre foncier par son numéro
    function getTitreFoncierState(uint _idFoncier) public view returns(bool) {
        require(_idFoncier < foncierCount , 'Foncier not found');
        return foncierStates[_idFoncier];
    }

    //Ecrire une fonction pour obtenir le nombre total de titre foncier
    function getTitreFoncier() public view returns(uint) {
        return foncierCount;
    }

}