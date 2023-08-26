const { getCalulations } = require("../src/stack");

module.exports = {
    calculate: async(req,res) => {
        const url = req.params[0];
        const parameters = url.split('/').filter(part => part !== '');
        const calculatedData = await getCalulations(parameters,res);
        return res.json(calculatedData);
    }
}