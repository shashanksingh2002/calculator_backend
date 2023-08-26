<!DOCTYPE html>
<html>
<body>
    <h1>Calculator Backend App</h1>
    <h2>Overview</h2>
    <p>This is a calculator backend app that performs various mathematical operations. It's built using Node.js, Express, MongoDB, JavaScript, HTML, and CSS.</p>
    <h2>Features</h2>
    <ul>
        <li>Perform arithmetic calculations through a JSON API.</li>
        <li>Retrieve the last 20 calculation history.</li>
        <li>Navigate to the homepage.</li>
    </ul>
    <h2>Getting Started</h2>
    <ol>
        <li>Clone this repository:</li>
        <code>git clone https://github.com/your-username/calculator-backend.git</code>
        <li>Navigate to the project directory:</li>
        <code>cd calculator-backend</code>
        <li>Install dependencies:</li>
        <code>npm install</code>
        <li>Start the server:</li>
        <code>npm start</code>
    </ol>
    <h2>Usage</h2>
    <p>Once the server is running, you can use the following API endpoints to perform calculations and retrieve history:</p>
    <ul>
        <li><code>GET /{query}</code>: Perform a calculation based on the provided query. For example: <code>/2/add/4/minus/3</code></li>
        <li><code>GET /history</code>: Retrieve the last 20 calculation history.</li>
        <li><code>GET /</code>: Navigate to the homepage.</li>
    </ul>
    <h2>Supported Operations</h2>
    <p>The following operations are supported:</p>
    <ul>
        <li><code>plus</code>: Addition (e.g., <code>/3/plus/5</code> results in <code>8</code>).</li>
        <li><code>minus</code>: Subtraction (e.g., <code>/5/minus/4</code> results in <code>1</code>).</li>
        <li><code>into</code>: Multiplication (e.g., <code>/3/into/3</code> results in <code>9</code>).</li>
        <li><code>divide</code>: Division (e.g., <code>/5/divide/3</code> results in <code>1.6666666666666667</code>).</li>
        <li><code>intdiv</code>: Integer Division (e.g., <code>/4/intdiv/5</code> results in <code>0</code>).</li>
        <li><code>mod</code>: Modulo (e.g., <code>/4/mod/4</code> results in <code>0</code>).</li>
        <li><code>pow</code>: Exponentiation (e.g., <code>/4/pow/5</code> results in <code>1024</code>).</li>
    </ul>
    <h2>API Endpoints</h2>
    <ul>
        <li><code>GET /{query}</code>: Parameters: <code>{query}</code> should be a sequence of numbers and operators, e.g., <code>/2/add/4/minus/3</code>. Response: JSON object with the calculated result.</li>
        <li><code>GET /history</code>: Response: JSON object containing the history of the last 20 calculations.</li>
        <li><code>GET /</code>: Response: HTML homepage.</li>
    </ul>
    <h2>Acknowledgments</h2>
    <p>This app was created as a part of an assignment. Special thanks to Kalvium for creating such wonderful assignments that help us learn and build practical applications.</p>
</body>
</html>
