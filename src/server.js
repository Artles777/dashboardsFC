// const path = require('path');
// const fs = require('fs');
// const readline = require('readline');
// const { google } = require('googleapis');
//
// const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// const TOKEN_PATH = 'token.json';
//
// function getNewToken(oAuth2Client, callback) {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES,
//   });
//   console.log('Authorize this app by visiting this url:', authUrl);
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   rl.question('Enter the code from that page here: ', (code) => {
//     rl.close();
//     oAuth2Client.getToken(code, (err, token) => {
//       if (err) console.error('Error while trying to retrieve access token', err);
//       oAuth2Client.setCredentials(token);
//       fs.writeFile(TOKEN_PATH, JSON.stringify(token), (error) => {
//         if (error) console.error(error);
//         console.log('Token stored to', TOKEN_PATH);
//       });
//       callback(oAuth2Client);
//     });
//   });
// }
//
// function listMajors(auth) {
//   const sheets = google.sheets({ version: 'v4', auth });
//   sheets.spreadsheets.values.get({
//     spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
//     range: 'Class Data!A2:E',
//   }, (err, res) => {
//     if (err) {
//       console.log(`The API returned an error: ${err}`);
//     }
//     const rows = res.data.values;
//     if (rows.length) {
//       console.log('Name, Major:');
//       rows.map((row) => console.log(`${row[0]}, ${row[4]}`));
//     } else {
//       console.log('No data found.');
//     }
//   });
// }
//
// function authorize(credentials, callback) {
//   const oAuth2Client = new google.auth.OAuth2(
//     credentials.installed.client_id,
//     credentials.installed.client_secret,
//     credentials.installed.redirect_uris[0],
//   );
//
//   fs.readFile(TOKEN_PATH, (err, token) => {
//     if (err) getNewToken(oAuth2Client, callback);
//     oAuth2Client.setCredentials(JSON.parse(token));
//     callback(oAuth2Client);
//   });
// }
//
// fs.readFile(path.resolve(__dirname, 'credentials.json'), (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   return authorize(JSON.parse(content), listMajors);
// });

const path = require('path');
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = require('express')();

const PORT = 7500 || process.env.PORT;
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = path.resolve(__dirname, 'token.json');

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (error) => {
        if (error) console.error(error);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function listMajors(auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  sheets.spreadsheets.values.get({
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    range: 'Class Data!A2:E',
  }, (err, res) => {
    if (err) {
      console.log(`The API returned an error: ${err}`);
    }
    const rows = res.data.values;
    if (rows.length) {
      console.log('Name, Major:');
      rows.map((row) => console.log(`${row[0]}, ${row[4]}`));
    } else {
      console.log('No data found.');
    }
  });
}

function authorize(credentials, callback) {
  const oAuth2Client = new google.auth.OAuth2(
    credentials.installed.client_id,
    credentials.installed.client_secret,
    credentials.installed.redirect_uris[0],
  );

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

fs.readFile(path.resolve(__dirname, 'credentials.json'), (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  return authorize(JSON.parse(content), listMajors);
});
// app.get('/', (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'application/json' });
//   const readStream = fs.createReadStream(
//   path.resolve(__dirname, 'listDashboards.xlsx'), 'utf-8'
//   );
//   // const result = excelToJson({
//   //   sourceFile: ,
//   //   header: {
//   //     rows: 1,
//   //   },
//   readStream.on('data', () => {
//     readStream.pipe(res);
//   });
// });

// app.get('/', (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'application/json' });
//   const readStream = fs.createReadStream(
//     path.resolve(__dirname, 'listDashboards.xlsx'), { encoding: 'base64' },
//   );
//   // res.send(readStream);
//   readStream.on('data', () => readStream.pipe(res));
// });

app.listen(PORT, () => {
  console.log(`Server run on http://localhost:${PORT}/`);
});
