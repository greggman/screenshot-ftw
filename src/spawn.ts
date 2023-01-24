import * as child_process from 'child_process';

type SpawnResults = {
  code: number;
  stdout: string;
  stderr: string;
};

export function spawn(cmd: string, args: string[]): Promise<SpawnResults> {
  return new Promise((resolve, reject) => {
    const proc = child_process.spawn(cmd, args);
    const stdout: string[] = [];
    const stderr: string[] = [];
    proc.stdout.on('data', (data: string) => stdout.push(data));
    proc.stderr.on('data', (data: string) => stderr.push(data));

    const getResult = (code: number) => ({
      code,
      stdout: stdout.join(''),
      stderr: stderr.join(''),
    });

    proc.on('close', (code: number) => {
      if (code === 0) {
        resolve(getResult(code));
      } else {
        reject(getResult(code));
      }
    });
    proc.on('error', (code: number) => {
      reject(getResult(code));
    });
  });
}

export function spawnSync(cmd: string, args: string[]): SpawnResults {
  const result = child_process.spawnSync(cmd, args);
  return {
    stdout: result.output.join(''),
    stderr: result.stderr.toString(),
    code: result.status === null ? 1 : result.status,
  };
}