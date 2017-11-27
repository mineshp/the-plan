const mockEvent = () => ({
    preventDefault: jest.fn(),
    target: {
        value: '123'
    }
});

export default mockEvent;
