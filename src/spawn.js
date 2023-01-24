import * as child_process from 'child_process';

export function spawn(cmd, args) {
  return new Promise((resolve, reject) => {
    const proc = child_process.spawn(cmd, args);
    const stdout = [];
    const stderr = [];
    proc.stdout.on('data', data => stdout.push(data));
    proc.stderr.on('data', data => stderr.push(data));

    const getResult = code => ({
      code,
      stdout: stdout.join(''),
      stderr: stderr.join(''),
    });

    proc.on('close', code => {
      if (code === 0) {
        resolve(getResult(code));
      } else {
        reject(getResult(code));
      }
    });
    proc.on('error', code => {
      reject(getResult(code));
    });
  });
}

export function spawnSync(cmd, args) {
  const result = child_process.spawnSync(cmd, args);
  return {
    stdout: result.output.join(''),
    stderr: result.stderr.toString(),
    code: result.status,
  };
}