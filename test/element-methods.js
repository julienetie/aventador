const { register, e } = Aventador;


const elementElement = document.createElement('div');
const divWithUniqueId = document.createElement('div');
divWithUniqueId.id = 'unique-id 2000';
elementElement.appendChild(divWithUniqueId);
document.body.appendChild(elementElement);

// Register element. 
register.element = elementElement;


describe('e', () => {
    it('Should contain the element method', done => {
        expect(e.element).to.be.a('function');
        done();
    });
});

describe('.<elementWrapper>', () => {
    beforeEach(() => {
        register.element = elementElement;
    });

    it('Should return an Element when called', done => {
        if (e.element() instanceof Element) done();
    });

    it('Should execute the presentCallback if the element is referenced', done => {
        e.element(() => {
            done();
        });
    });

    it('Should execute the absentCallback only if the element is null', done => {
        register.element = null;
        e.element(() => {
            console.log('presentCallback')
        }, () => {
            console.log('absentCallback')
            done();
        });
    });

    it('Should have a read method that provides the element', done => {
        e.element.read(e => {

            if (e instanceof Element) {
                done();
            }
            return 1
        });
    });

    it('Should have a write method that provides the element', done => {
        e.element.write(e => {
            if (e instanceof Element) {
                done();
            }
        });
    });

    it('Should feature a kill method', done => {
        if(typeof e.element.kill === 'function'){
        	done();
        }
    });

    // it('Should find a unique-id using queryId', done => {
    //     e.element
    // });
});