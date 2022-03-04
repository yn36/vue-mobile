const getters = {
  device: state => state.app.device,
  isWeixin:state => state.app.isWeixin,
  navTheme: state => state.app.navTheme,
  menuTheme: state => state.app.menuTheme,
  color: state => state.app.color,
  token: state => state.user.token,
  info: state => state.user.info,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  permis: state => state.user.permis,
  userInfo: state => state.user.userInfo,
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab,
  layout: state => state.app.layout,
  sidebar: state => state.app.sidebar,
  isLogin: state => state.user.isLogin,
}

export default getters
