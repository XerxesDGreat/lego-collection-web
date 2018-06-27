export const countOfDivsContainingString = (divCollection, str) => {
    let divCount = 0;

    divCollection.forEach((div) => {
        if (div.props().children.includes(str)) {
            divCount += 1;
        }
    });
    return divCount;
};

const lifecycleMethods = [
    'render',
    'componentWillMount',
    'componentDidMount',
    'componentWillReceiveProps',
    'shouldComponentUpdate',
    'componentWillUpdate',
    'componentDidUpdate',
    'componentWillUnmount'
];

export const stubComponent = componentClass => {
    const originalPropTypes = componentClass.propTypes;

    beforeEach(() => {
        lifecycleMethods.forEach(method => {
            if(componentClass.prototype[method] !== undefined) {
                spyOn(componentClass.prototype, method).and.returnValue(null);
            }
        });
        componentClass.propTypes = {};
    });

    afterEach(() => {
        componentClass.propTypes = originalPropTypes;
    });
};

export const stubPresentationComponent = componentClass => {
    const originalPropTypes = componentClass.propTypes;

    beforeEach(() => {
        componentClass.propTypes = {};
    });

    afterEach(() => {
        componentClass.propTypes = originalPropTypes;
    });
};
