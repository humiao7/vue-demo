import TabBar from '../views/tab-bar'
import MyInformation from '../views/my-information'

let route = [
  {
    path: '/tab-bar',
    name: 'tab-bar',
    component: TabBar,
  },
  {
    path: '/my-information',
    name: 'my-information',
    component: MyInformation,
  }
];

export default route
