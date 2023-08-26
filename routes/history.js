const { databaseHistory } = require('../backend/database');

module.exports = {
    getHistory: async(req) => {
        const historyData = await databaseHistory();
        if(!historyData.length){
            return `<p>No History</p>`;
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
        return html;
    }
}