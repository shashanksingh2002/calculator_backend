const { databaseHistory } = require('../backend/database');

module.exports = {
    getHistory: async(req,res) => {
        const historyData = await databaseHistory();
        if(!historyData.length){
            res.send('No history');
        }
        let html = ``;
        historyData.forEach((element,idx) => {
            const tempHtml = `
                <div>
                    <p>Query ${idx+1}: ${element.query}</p>
                    <p>Answer: ${element.answer}</p>
                </div>
            `;
            html += tempHtml;
        });
        res.send(html);
    }
}