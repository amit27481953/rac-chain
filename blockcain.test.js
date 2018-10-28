const BlockChain = require('./blockchain');
const Block = require('./block');
describe('Blockchain',()=>{
    let bc, bc2;

    beforeEach(()=>{
         bc = new BlockChain();
         bc2 = new BlockChain();
    });

    it ('it start with gensis block',()=>{
        expect(bc.chain[0]).toEqual(Block.genesis());
    });
    it('add new block',()=>{
        const data = 'foo';
        bc.addBlock(data);
        expect(bc.chain[bc.chain.length-1].data ).toEqual(data)
    });

    it('it validate the chain',()=>{
        bc2.addBlock('foo');
        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });

    it('it invalidate the chain with a corrupt gensis block',()=>{
        bc2.chain[0].data = 'Bad Data';

        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });
    it('it invalidate the chain with a corrupt gensis block',()=>{
        bc2.addBlock('foo');
        bc2.chain[1].data = 'not foo';

        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('replace the chain with valid chain',()=>{
        bc2.addBlock('goo');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).toEqual(bc2.chain);


    });

    it('does not replace the chain if chain length has less then current length',()=>{
        bc.addBlock('goo');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).not.toEqual(bc2.chain);
        

    });
});