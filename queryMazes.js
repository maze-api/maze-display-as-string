const request = require('request');
require('dotenv').config();

const dimension = process.argv[2];
const cellShape = process.argv[3];
const algo = process.argv[4];

var options = { 
  method: 'GET',
  url: 'https://maze-api.herokuapp.com/api/mazes/',
  qs: { number: '50', width: `${dimension}`, cellShape: `${cellShape}`, algorithm: `${algo}` },
  headers: 
   { 'cache-control': 'no-cache',
     Connection: 'keep-alive',
     'Accept-Encoding': 'gzip, deflate',
     Host: 'maze-api.herokuapp.com',
     'Postman-Token': '37934330-b4aa-46e6-83fc-a134a6960e67,eaef9afb-3911-416e-a095-967bc7dc3b96',
     'Cache-Control': 'no-cache',
     Accept: '*/*',
     'User-Agent': 'PostmanRuntime/7.17.1',
     Authorization: `${process.env.MAZE_API_KEY}`,
     'Content-Type': 'application/json' } 
    };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  const mazes = JSON.parse(body);

  if(mazes.length === 0) {
    console.log('No results found.');
    return;
  }
  const maze = mazes[Math.floor(Math.random() * mazes.length)];

  console.log(`
${maze.displayStringWithSolutionPath}















MazeId: ${maze._id}

Dimensions: width: ${maze.dimensions.width}  height: ${maze.dimensions.height}
Algorithm: "${maze.algorithm}"
Average Path Length: ${maze.averagePathLength}  (connectivity = ${maze.connectivity})
Solution Length ${maze.solutionLength}

${maze.displayString}
  `);

});
