import Mock from 'mockjs';

Mock.setup({
  timeout: '100 - 300'
})

function users () {
  const ret = {
    total: 24,
    data: []
  }
  for (let i = 0; i < ret.total; i++) ret.data.push(Mock.mock({
    name: Mock.mock('@cname'),
    county: Mock.mock('@county(true)'),
    date: Mock.mock('@date'),
    'money|100000-999999': 1,
    'age|18-60': 1,
  }))
  return ret
}
 
Mock.mock('users', 'get', users)