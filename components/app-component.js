import Home from './home-component.js'
import About from './about-component.js'
import NotFound from './not-found.js'

const routes = {
  '/': Home,
  '/about': About
}

export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  },

  template: ` <a href="#/">Home</a> |
  <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />`
  // template: `
  //   <div>
  //     <nav>
  //       <ul>
  //         <li><router-link to="/">Home</router-link></li>
  //         <li><router-link to="/about">About</router-link></li>
  //       </ul>
  //     </nav>
  //     <router-view></router-view>
  //   </div>
  // `,
  // data() {
  //   return { }
  // },
};