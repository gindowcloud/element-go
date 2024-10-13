import Mock from 'mockjs'

Mock.setup({
  timeout: '0 - 1'
})
 
Mock.mock('users', 'get', () => {
  const per_page = 15
  const current_page = 1
  const total = per_page * 40000
  const mock = Mock.mock({
    ["data|" + per_page]: [{
      id: '@id',
      name: '@cname',
      phone: /^1(5|3|7|8)[0-9]{9}$/,
      address: {
        province: '@province(true)',
        city: '@city',
        county: '@county',
      },
      money: '100000-999999',
      age: '18-60',
      state: '@boolean',
      date: '@date'
    }]
  })
  
  return {
    code: 200,
    data: mock.data,
    meta: { pagination: { per_page, current_page, total } }
  }
})
