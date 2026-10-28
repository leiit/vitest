import { expect, test } from 'vitest'
import * as testUtils from '../../test-utils'

const variants = {
  plain: {},
  preParse: { experimental: { preParse: true } },
  tagsFilter: { tags: [{ name: 'unstable' }], tagsFilter: ['!unstable'] },
  'preParse + tagsFilter': {
    experimental: { preParse: true },
    tags: [{ name: 'unstable' }],
    tagsFilter: ['!unstable'],
  },
}

test.each(Object.entries(variants))('--shard=1/2 exits with 0 (%s)', async (_name, options) => {
  const { exitCode } = await testUtils.runVitest({ root: './fixtures/shard', shard: '1/2', ...options })

  expect(exitCode).toBe(0)
})
