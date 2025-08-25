const contractAbi =  [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id_ufci",
              "type": "uint256"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "npi",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "ifu",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "fullname",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "email",
                  "type": "string"
                }
              ],
              "internalType": "struct TitreFoncierContract.Person",
              "name": "proprietaire",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "id",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "topo_no",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "location",
                  "type": "string"
                }
              ],
              "internalType": "struct TitreFoncierContract.Domain",
              "name": "domain",
              "type": "tuple"
            }
          ],
          "indexed": false,
          "internalType": "struct TitreFoncierContract.TitreFoncier",
          "name": "_foncier",
          "type": "tuple"
        }
      ],
      "name": "Save",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_npi",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_ifu",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_fullname",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_location",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_idDomain",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_topoNo",
          "type": "uint256"
        }
      ],
      "name": "CreateTitreFoncier",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTitreFoncier",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_idFoncier",
          "type": "uint256"
        }
      ],
      "name": "getTitreFoncierState",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

var contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Replace with your contract's deployed address
var signer;
var contract;
var contractWithSigner;


window.addEventListener('DOMContentLoaded', () => {
        document.getElementById("saveTitreFoncier").addEventListener("submit", async (e) => {
            e.preventDefault(); // empêcher le rechargement de la page
            await saveTitreFoncier();
        });
        async function connectMetaMask() {
            var provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            return provider;
        }

        document.getElementById('connectorBtn').addEventListener('click',  async(e)=>{
            console.log('le  click sur  le  button');
        connectMetaMask().then(function(provider) {
            signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, contractAbi, provider);
            contractWithSigner = contract.connect(signer);
            getNumberOfTitreFonciers(contractWithSigner)
            console.log(contractWithSigner);
        });
    })
});







async function getNumberOfTitreFonciers(contractWithSigner) {
    console.log('avoir  le nombre  total de titre foncier');
    var result = await contractWithSigner.getTitreFoncier();
    console.log('Resultat  de  la récuperation');
    const totalTitreFoncier  = result.toNumber()
    console.log(totalTitreFoncier);

    document.getElementById("#totalTitreFoncier").innerHTMl = `${totalTitreFoncier}`;
}

async function saveTitreFoncier(e){
     
    /*
     uint _npi,
        uint _ifu,
        string memory _fullname,
        string memory _email, 
        string memory _location,
        uint _idDomain, 
        uint _topoNo
    */
    console.log("Enregistrement  de titre  foncier")
    const npi = document.getElementById('npi').value;
    const ifu = document.getElementById('ifu').value;
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const location = document.getElementById('location').value;
    const idDomain = document.getElementById('idDomain').value;
    const  topoNo = document.getElementById('topoNo').value;
    var result =  await contractWithSigner.CreateTitreFoncier(
        npi, ifu, fullname, email, location, idDomain, topoNo
    )
    console.log("retour  de  l'enregistremznt", result);
    console.log('Waiting for transaction to be mined...');
    await result.wait(); // Wait for the transaction to be mined
    console.log('Mined.');

}




