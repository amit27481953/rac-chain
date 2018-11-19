const Block = require('./block');
const {DIFFICULITY} = require('../config');
describe('Block',()=>{
    let data, lastBlock, block;
    
    beforeEach(()=>{
        data = 'bar';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock,data);
    });
    it('sets the `data` to match the input',()=>{
        expect(block.data).toEqual(data);
    });
    it('sets the `lastHash` to match the hash of the last block',()=>{
        expect(block.lastHash).toEqual(lastBlock.hash);
    }); 

    it('genrate the hash matches the difficulity',()=>{
        expect(block.hash.substring(0,block.difficulty)).toEqual('0'.repeat(block.difficulty));
    })

    it('lower the difficulty for slower mine block',()=>{
        expect(Block.adjustDifficulty(block,block.timeStampS+36000)).toEqual(block.difficulty-1);
    })

    it('raise the difficulty for quickly mine block',()=>{
        expect(Block.adjustDifficulty(block,block.timeStamp+1)).toEqual(block.difficulty+1);
    })


});