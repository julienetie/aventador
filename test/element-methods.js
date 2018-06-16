const { register, e } = Aventador;


const boxElement = document.createElement('div');
const divWithUniqueId = document.createElement('div');
divWithUniqueId.id = 'unique-id 2000';
boxElement.appendChild(divWithUniqueId);
document.body.appendChild(boxElement);

// Register box. 
register.box = boxElement;


describe('e', () => {
    it('Should contain the box method', done => {
        expect(e.box).to.be.a('function');
        done();
    });
});

describe('.box', () => {
    beforeEach(() => {
        register.box = boxElement;
    });

    it('Should return an Element when called', done => {
        if (e.box() instanceof Element) done();
    });

    it('Should execute the presentCallback if the element is referenced', done => {
        e.box(() => {
            done();
        });
    });

    it('Should execute the absentCallback only if the element is null', done => {
        register.box = null;
        e.box(() => {
            console.log('presentCallback')
        }, () => {
            console.log('absentCallback')
            done();
        });
    });

    it('Should have a read method that provides the element', done => {
        e.box.read(e => {
            if (e instanceof Element) {
                done();
            }
        });
    });

    it('Should have a write method that provides the element', done => {
        e.box.write(e => {
            if (e instanceof Element) {
                done();
            }
        });
    });

    it('Should feature a kill method', done => {
        if(typeof e.box.kill === 'function'){
        	done();
        }
    });

    it('Should find a unique-id using queryId', done => {
        e.box
    });
});