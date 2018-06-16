const { read, write } = Aventador;

describe('.read', () => {
    it('Should execute a callback', done => {
        read(() => done());
    });

    it('Should return a promise', done => {
        read(() => {}).then(() => done());
    });

    it('Should pass a returned value to the thenable', done => {
        read(() => 'a').then( value => {
            if(value === 'a'){
                done()    
            }
        });
    });
});

describe('.write', () => {
    it('Should execute a callback', done => {
        write(() => done());
    });

    it('Should return a promise', done => {
        write(() => 'a').then(value => done());
    });

    it('Should pass a returned value to the thenable', done => {
        write(() => 'a').then( value => {
            if(value === 'a'){
                done()    
            }
        });
    });
});

describe('.kill', () => {
    it('Should cancel pending jobs', done => {
        // write(() => done());
    });
});