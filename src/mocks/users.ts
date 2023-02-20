import Mock from 'mockjs'

Mock.setup({
  timeout: '300 - 500'
})
 
Mock.mock('users', 'get', () => {
  const per_page = 15
  const current_page = 1
  const total = 150
  const data = []

  for (let i = 0; i < per_page; i++) {
    data.push(Mock.mock({
      id: Mock.mock('@id'),
      name: Mock.mock('@cname'),
      phone: Mock.mock(/^1(5|3|7|8)[0-9]{9}$/),
      county: Mock.mock('@county(true)'),
      date: Mock.mock('@date'),
      'money|100000-999999': 1,
      'age|18-60': 1,
      "state|0-1": 1
    }))
  }
  
  return {
    code: 200,
    data: data,
    meta: { pagination: { per_page, current_page, total } }
  }
})
