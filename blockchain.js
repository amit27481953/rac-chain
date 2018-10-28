const Block = require('./block');

class BlockChain{
    constructor(){
        this.chain = [Block.genesis()];
    }
    addBlock(data){
        const block = Block.mineBlock(this.chain[this.chain.length-1],data);
        this.chain.push(block);
        return block;
    }

    isValidChain(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
        for(var i=1; i<chain.length;i++){
            const block = chain[i];
            const lastBlock = chain[i-1];
            if(block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)){
                return false;
            }
        }
        return true;
    }
    replaceChain(newChain){
        if(newChain.length<=this.chain.length){
            console.log("Recived chain not longer then currnet chain");
            return;
        }else if(!this.isValidChain(newChain)){
            console.log("Recived chain is not valid");
            return;
        }

        console.log("Replacing the chain");
        this.chain = newChain;
    }
}
    
module.exports = BlockChain;