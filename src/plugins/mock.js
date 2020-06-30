import Mock from 'mockjs';

Mock.setup({
  timeout: '100 - 300'
})
 
Mock.mock('users', 'get', () => {
  const ret = {code: 200, data: [], meta: { total: 24 }}
  for (let i = 0; i < ret.meta.total; i++) ret.data.push(Mock.mock({
    name: Mock.mock('@cname'),
    phone: Mock.mock(/^1(5|3|7|8)[0-9]{9}$/),
    county: Mock.mock('@county(true)'),
    date: Mock.mock('@date'),
    'money|100000-999999': 1,
    'age|18-60': 1,
    "state|0-1": 1,
  }))
  return ret
})
