<template>
  <div class="app-wrap">
    <div class="navbar navbar-color-bg select-disable">
      <div class="navbar-header">
        <el-button type="text" @click="toggleNavbar" class="navbar-toggle">
          <i class="fa fa-align-justify"></i>
        </el-button>
        <a class="logo">
          <img src="assets/images/logo_zh-cn.png" height="48"/>
        </a>
      </div>
      <div class="other-buttons">
        <el-dropdown @command="handleCommand" style="padding-right:20px;cursor:pointer;">
          <span class="el-dropdown-link" style="color:white;">
            {{realname}}
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="passwd">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div :class="'navbar-collapse collapse'+ (navbarCollapsed?' in':'')">
        <el-menu mode="horizontal" theme="primary" :default-active="activeMenu">
          <template v-for="menu in menus">
            <el-menu-item v-if="menu.meta && menu.meta.title" :index="menu.path" :key="menu.path" @click="onSelectMenun(menu)">
              <i :class="menu.meta.icon"></i> <span class="menu-title">{{menu.meta.title}}</span></el-menu-item>
          </template>
        </el-menu>
        <el-menu mode="horizontal" theme="primary" :default-active="activeMenu" class="visible-on-mobile">
          <template v-for="menu in systemMenus">
            <el-menu-item v-if="menu.meta && menu.meta.title" :key="menu.path" @click="onSelectMenun(menu)">
              <i :class="menu.meta.icon"></i> <span class="menu-title">{{menu.meta.title}}</span></el-menu-item>
          </template>
        </el-menu>
      </div>

    </div>

    <router-view :key="routerName"></router-view>
  </div>
</template>
<script>
import routes from '../router/'
import util from '../utils/'

window.axiosMock = window.axiosMock || new AxiosMockAdapter(axios, { delayResponse: 1000 })

const menus = util.assign([], routes, 'component')

export default {
  data() {
    let routePath = this.$route.path
    if(routePath && routePath.split('/').length>2){
      routePath = routePath.split('/').slice(0,2).join('/')
    }
    return {
      realname: localStorage.realname || 'demo',
      routerName: this.$route.name || '/',
      menus: menus,
      activeMenu: routePath,
      navbarCollapsed: false, // 导航是否展开
    }
  },
  watch: {
    '$route.name'(val, oldVal) {
      this.routerName = this.$route.name || '/'
    }
  },
  methods: {
    onSelectMenun(menu) {
      let hash = menu.children && ('/' + menu.children[0].path) || ''
      hash = menu.path + hash
      window.location.hash = hash
      if (this.navbarCollapsed) {
        this.navbarCollapsed = false
      }
      localStorage.lastRoutePath = hash
    },
    toggleNavbar() {
      this.navbarCollapsed = !this.navbarCollapsed
    },
    handleCommand(cmd) {
      if (cmd == 'logout') {
        console.warn('todo: ')
      }
      if (cmd == 'passwd') {
        console.warn('todo: ')
      }
    }
  }
}
</script>

<style scoped>
.app-wrap {
  width: 100%;
  height: 100%;
  position: relative;
}

.navbar {
  height: 50px;
  line-height: 50px;
  box-shadow: 2px 0px 2px rgba(0, 0, 0, 1.05);
  padding: 0;
  background-color: #7386E6;
  color: #DDE3FF;
  border-radius: 0;
}
.navbar .el-menu--horizontal {
  background-color: transparent;
}
.navbar .el-menu--horizontal .el-menu-item {
  color: #fff;
  height: 50px;
  line-height: 50px;
}

.navbar .el-menu--horizontal .el-menu-item:hover,
.navbar .el-menu--horizontal .el-menu-item.is-active {
  background-color: #5C71CE;
  border-bottom: 5px solid #3B51A8;
}


.logo {
  padding-left: 5px;
  width: 200px;
  max-width: 200px;
  display: inline-block;
  font-size: 16px;
  color: #eeee99;
  background-color: #667CDB;
}

.navbar-collapse {
  position: relative;
}
.other-buttons {
  text-align: right;
  float: right;
  -webkit-app-region: no-drag;
  position: relative;
  z-index: 103;
}

.other-buttons button {
  padding: 3px;
  color: #fff;
}
.collapse.in {
  background-color: #31A66C;
  padding: 0;
}

@media (max-width: 576px) {
  .navbar-collapse {
    z-index: 102;
    transition: all 0.3s;
  }
  .logo {
    background-color: transparent;
  }
  .other-buttons {
    display: none;
  }
  .navbar-toggle {
    width: 55px;
    line-height: 30px;
  }
  .collapse.in .el-menu--horizontal .el-menu-item {
    float: none;
    border-bottom-width: 1px;
  }
}

@media (min-width: 576px) {
  .navbar-toggle {
    display: none;
  }
}

.visible-on-mobile.el-menu .el-menu-item {
  padding-left: 40px;
}

.el-menu-item .menu-title{
  font-size:12pt;
}
</style>
