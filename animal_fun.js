const fs = require("fs");
const http = require('http');
const querystring = require('querystring');

// const animals = [];
// fs.readFile('./animal.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     data.split('\n').forEach(el => {
//       if (el[0] === process.argv[2]) {
//         animals.push(el);
//       }
//     });
//     fs.writeFile(`./${process.argv[2]}_animals.txt`, animals.join("\n"), error => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("file successfully written!");
//       }
//     });
//   }
// });

// console.log(process.argv);

const cache = {};

const server = http.createServer((req, res) => {
  let query = querystring.parse();
  if (query.letter) {
    const animals = [];
    fs.readFile('./animal.txt', 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        data.split('\n').forEach(el => {
          if (el[0] === query.letter) {
            animals.push(el);
          }
        });
        res.write(animals.join("\n"));
      }
    });
  } else {
    fs.readFile('./animal.txt', 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.write(data);
      }
    });
  }
  res.end();
});

server.listen(8000, () => console.log("I'm listening on port 8000!"));
