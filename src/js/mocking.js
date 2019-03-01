import Mock from 'mockjs'

import MOCK_USERINFO from '../../mock/userinfo.mock'

const mocking = () => {
  Mock.setup({ timeout: '300-1000' })

  Mock.mock('http://api.drresource.com/v1/mine/userinfo', MOCK_USERINFO)


}

export default mocking