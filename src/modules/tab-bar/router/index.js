import Login from '../views/login'
import TabBar from '../views/tab-bar'
import Seting from '../views/seting'
import MyInformation from '../views/my-information'

let route = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/tab-bar',
    name: 'tab-bar',
    component: TabBar,
  },
  {
    path: '/my-information',
    name: 'my-information',
    component: MyInformation,
  },
  {
    path: '/seting',
    name: 'seting',
    component: Seting,
  }
];

export default route
