import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const files = ['privacy.html', 'terms.html'];
const forbiddenTerms = [
  'DashScope',
  'Qwen',
  'ASR',
  '百炼',
  '模型名称',
  '模型服务',
  '服务端代理',
  '供应商服务',
  '热词处理',
  '技术日志',
  '具体技术方案'
];

for (const file of files) {
  const source = await readFile(new URL(`../${file}`, import.meta.url), 'utf8');

  assert.ok(
    source.includes('Support@shangzhiai.cn'),
    `${file} should include the public contact email`
  );

  for (const term of forbiddenTerms) {
    assert.ok(!source.includes(term), `${file} should not expose implementation detail: ${term}`);
  }
}
