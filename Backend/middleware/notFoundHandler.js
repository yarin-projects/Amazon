const notFoudHandler = (req, res) => {
   res.status(404).send({ message: 'Route was not found' });
};

export default notFoudHandler;
