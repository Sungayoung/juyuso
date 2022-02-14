import Vue from 'vue'
import VueRouter from 'vue-router'

// accounts
import Login from '@/views/accounts/login.vue'
import MyData from '@/views/accounts/mydata.vue'
import MyPage from '@/views/accounts/mypage.vue'
import Signup from '@/views/accounts/signup.vue'
import FriendPage from '@/views/accounts/friendpage.vue'

//tables
import TableList from '@/views/tables/table-list.vue'
import Table from '@/views/tables/table.vue'

//main
import Main from '@/views/main.vue'

//store
// import openvidu from '@/store/modules/openviduStore'

Vue.use(VueRouter)


const rejectAuthUser = (to, from, next) => {
  if (localStorage.getItem('jwt')) {
    console.log('로그인 접근을 reject함')
    alert('이미 로그인을 하셨습니다')
    next('/')
  }else {
    next()
  }
}

// const rejectEnter = (to, from, next) => {
//   if (openvidu.state.session.options.sessionId) {
//     // next(`/table/${openvidu.state.session.options.sessionId}`)
//     next('/tables')
//     // next()
//   } else {
//     next()
//   }
// }

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter: rejectAuthUser,
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    props: true
  },
  {
    path: '/signup/kakao',
    name: 'SignupKakao',
    component: () => import('@/views/accounts/signup-kakao'),
    props: true
  },
  {
    path: '/tables',
    name: 'TableList',
    component: TableList
  },
  {
    path: '/mypage/:userId',
    name: 'MyPage',
    component: MyPage
  },
  {
    path: '/friendpage/:userId',
    name: 'FriendPage',
    component: FriendPage
  },
  {
    path: '/mydata/:userId',
    name: 'MyData',
    component: MyData,
    props: true
  },
  {
    path: '/table/:roomId',
    name: 'Table',
    component: Table,
    props: true,
    // beforeEnter: rejectEnter
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router
