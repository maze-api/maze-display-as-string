const request = require('request');
require('dotenv').config();

const mazeId = process.argv[2];

const options = { 
  method: 'GET',
  url: `https://maze-api.herokuapp.com/api/mazes/${mazeId}`,
  headers: 
   { 'cache-control': 'no-cache',
     Connection: 'keep-alive',
     'Accept-Encoding': 'gzip, deflate',
     Host: 'maze-api.herokuapp.com',
     'Postman-Token': '4453a60e-7fa2-427d-9665-eca4b7800f4c,9892bb7e-0365-4b7e-b8a6-8137441fe122',
     'Cache-Control': 'no-cache',
     Accept: '*/*',
     'User-Agent': 'PostmanRuntime/7.17.1',
     Authorization: `${process.env.MAZE_API_KEY}`,
     'Content-Type': 'application/json' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  const maze = JSON.parse(body);

  if(maze.error) {
    console.log(maze.error);
    return;
  }

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
