const kiotaVersion = 'v1.1.3';

import followRedirects from 'follow-redirects';
const { https } = followRedirects;
import * as fs from 'fs';
import * as path from 'path';
import decompress from 'decompress';
import childProcess from 'child_process';
const { exec } = childProcess;

const platform = process.platform;
const architecture = process.arch;

let os = ''
if (platform === 'win32') {
  os = 'win';
} else if (platform === 'linux') {
  os = 'linux';
} else if (platform === 'darwin') {
  os = 'osx';
} else {
  throw new Error(`Unsupported platform: ${platform}`);
}

let arch = '';
if (architecture === 'x64') {
  arch = 'x64';
} else if (architecture === 'x86') {
    arch = 'x86';
} else if (architecture === 'arm64') {
    arch = 'arm64'
} else {
  throw new Error(`Unsupported architecture: ${architecture}`);
}

const kiotaUrl = `https://github.com/microsoft/kiota/releases/download/${kiotaVersion}/${os}-${arch}.zip`;

const tmpPath = path.join(process.cwd(), '.kiota');
const downloadPath = path.join(tmpPath, `kiota-${kiotaVersion}`);
const execPath = path.join(tmpPath, `${kiotaVersion}`);

fs.mkdirSync(execPath, { recursive: true });

const execBinary = path.join(process.cwd(), '.kiota', `${kiotaVersion}`, 'kiota');
const kiotaCommand = execBinary + ' generate -l typescript -d openapi-authz-v1alpha.yaml -c Authz -o ./api --clean-output true --clear-cache true --log-level Error';

if (fs.existsSync(downloadPath) && fs.existsSync(execBinary)) {
  console.log(`Kiota binary version ${kiotaVersion} already downloaded at ${downloadPath}.`);

  exec(kiotaCommand, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
} else {
  console.log(`Downloading Kiota binary version ${kiotaVersion} for platform ${platform} and architecture ${architecture}...`);
  https.get(kiotaUrl, (res) => {
    const statusCode = res.statusCode;
    let error;

    if (statusCode !== 200) {
      error = new Error(`Request Failed.\nStatus Code: ${statusCode}`);
    }

    if (error) {
      console.error(error.message);
      res.resume();
      return;
    }

    const writeStream = fs.createWriteStream(downloadPath);

    res.pipe(writeStream);

    writeStream.on('finish', () => {
      console.log(`Kiota binary version ${kiotaVersion} downloaded at ${downloadPath}.`);

      decompress(downloadPath, execPath)
        .then(() => {
          exec(kiotaCommand, (err, stdout, stderr) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
          });
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    });

    writeStream.on('error', (err) => {
      console.error(`Failed to write Kiota binary version ${kiotaVersion} to ${downloadPath}: ${err.message}`);
    });
  }).on('error', (err) => {
    console.error(`Failed to download Kiota binary version ${kiotaVersion}: ${err.message}`);
  });
}
