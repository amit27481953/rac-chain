const SHA256 = require('crypto-js/sha256');

const {DIFFICULITY,MINE_RATE} = require('../config');
class Block{
        constructor(timeStamp,lastHash,hash,data,nonce,difficulty){  
            this.timeStamp = timeStamp; 
            this.lastHash =lastHash;
            this.hash =hash;
            this.data=data;
            this.nonce = nonce;
            this.difficulty = difficulty||DIFFICULITY;

        }

        toString(){
            return `Block-
                TimeStamp  :- ${this.timeStamp}
                LastHash   :- ${this.lastHash.toString(0,10)}
                Hash       :- ${this.hash.toString(0,10)}
                Nonce      :- ${this.nonce}
                Difficulty :- ${this.difficulty}
                Data       :- ${this.data}`;
        }

        static genesis(){
            return new this('Gensis Time','----','f1r5-hy56',[],0,DIFFICULITY);
        }

        static mineBlock(lastBlock,data){

            let hash, timeStamp;
            const lastHash = lastBlock.hash;
            let {difficulty} = lastBlock;
            let nonce = 0;
            
            do{
                nonce++;
                timeStamp = Date.now();
                difficulty = Block.adjustDifficulty(lastBlock, timeStamp);
                hash = Block.hash(timeStamp,lastHash,data,nonce,difficulty);
            }while(
                hash.substring(0,difficulty)!=='0'.repeat(difficulty)
            );

            return new this(timeStamp,lastHash,hash,data,nonce,difficulty);

        }

        static hash(timeStamp,lastHash,data,nonce,difficulty){

            return SHA256(`${timeStamp},${lastHash},${data},${nonce},${difficulty}`).toString();

        }
        
        static blockHash(block){
            const {timeStamp, lastHash, data,nonce,difficulty} = block;
            return Block.hash(timeStamp,lastHash,data,nonce,difficulty);
        }

        static adjustDifficulty(lastBlock,currentTime){
            let {difficulty} = lastBlock;
            difficulty = lastBlock.timeStamp + MINE_RATE > currentTime?difficulty+1:difficulty-1;
            return difficulty;
        }
    }

        module.exports = Block;