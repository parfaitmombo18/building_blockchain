// Import
const Block = require('./block');

// Create Blockchain class
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    // create a method to generate the first block of the chain (genesis block)
    createGenesisBlock() {
        const genesisDate = '11/03/2020';
        return new Block('Genesis Block', 0, genesisDate, '0');
    }

    // Create a method to generate last Block
    getLastBlock() {
        return this.chain[this.chain.length - 1 ];
    }

    // Create a method to add a new Block
    addNewBlock(ourNewBlock) {
        ourNewBlock.previousHash = this.getLastBlock().hash;
        ourNewBlock.index = this.getLastBlock().index + 1;
        ourNewBlock.hash = ourNewBlock.calculateHash();
        ourNewBlock.miningBlock(this.difficulty);
        this.chain.push(ourNewBlock);
    }

    // Create a method to validate the chain
    isChainValid() {
        const chain = this.chain;

        for (let i = 0; i < chain.length; i++) {
            if (chain[i].hash !== chain[i].calculateHash()){
                console.log(`Block ${ i } has been corrupted`);
                return false;
            }

            if (i > 0 && chain[i].previousHash !== chain[i - 1].hash){
                console.log(`Block ${ i - 1 } has been corrupted`);
                return false;
            }
        }
        console.log('Chain is valid.')
        return true;

    }

}

let numberOfBlock = 3;
const myChain = new Blockchain();

// Populate our octoChain
for (i = 0; i < numberOfBlock; i++) {
    myChain.addNewBlock(new Block(
        {
            sender: 'parfaitmombo18',
            receiver: 'lucky-you',
            message: `Block ${myChain.chain.length} has been added.`
        }
    ));

}

// Check chain validity
// console.log(myChain.isChainValid());

// Tempered block
// myChain.chain[2].data = 
// {
//     sender: 'parfaitmombo18',
//     receiver: 'lucky-you',
//     message: "The block has been changed"
// };

myChain.chain.forEach((block) => {
    console.log(block);

    // Calculate hash again after data change
    // console.log(block.calculateHash());
});

// console.log(myChain.isChainValid());