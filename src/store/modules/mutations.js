import Vue from 'vue';
import storageRef from '../../main'; // eslint-disable-line
import page from './pages';
import cart from './namePerson'; // eslint-disable-line
import swapi from '../../api/swapi';
import searchModule from './search'; // eslint-disable-line
import views from './showComponents';
import common from './heroesWrapper';

export default {
  mutations: {
    requestPeopleAPI: () => {
      let tmpPeople = '';
      Vue.http.get(swapi.peopleAPI).then((response) => {
        if (page.state.isActive === false) {
          const pages = (Math.ceil(response.body.count / 10) + 1);
          for (let i = 2; i < pages; i++) { // eslint-disable-line
            page.state.listPages.push(i);
          }
        }
        page.state.isActive = true;
        cart.state.requestStatusPeople = response.ok;
        tmpPeople = response.body.results;
        tmpPeople.forEach((itemPeople) => {
          itemPeople.imageName = ''; // eslint-disable-line
          itemPeople.image = ''; // eslint-disable-line
          itemPeople.speciesName = ''; // eslint-disable-line
          itemPeople.imageName = itemPeople.name.charAt(0).toLowerCase() + itemPeople.name.slice(1); // eslint-disable-line
          itemPeople.imageName = itemPeople.imageName.replace('-', '').replace(' ', '').replace(' ', ''); // eslint-disable-line
          cart.state.images.forEach((item) => {
            if (itemPeople.imageName === item.imageName) {
              itemPeople.image = item.url; // eslint-disable-line
            }
          });
          cart.state.listCarts = tmpPeople;
          cart.state.speciesListCarts.push(itemPeople.species);
        });
      });
    },
    requestSpeciesAPI: () => {
      let tmpSpecies = [];
      const uniqSpecies = [];
      cart.state.speciesListCarts.forEach((item) => {
        item.forEach((species) => {
          tmpSpecies.push(species);
        });
      });
      cart.state.speciesListCarts = [];
      for (const str of tmpSpecies) { // eslint-disable-line  
        if (!uniqSpecies.includes(str)) {
          uniqSpecies.push(str);
        }
      }
      tmpSpecies = [];
      let statusSpeciesAPI = [];
      uniqSpecies.forEach((item) => {
        Vue.http.get(item).then((response) => {
          if (response.ok === true) {
            cart.state.counter++; // eslint-disable-line
          }
          tmpSpecies.push(response);
          cart.state.speciesListCarts = tmpSpecies.map((item) => { // eslint-disable-line
            return {
              species: item.body.name,
              url: item.url,
            };
          });
          statusSpeciesAPI = tmpSpecies.map((item) => { // eslint-disable-line
            return item.ok;
          });
          if (cart.state.counter === uniqSpecies.length) {
            tmpSpecies = [];
            for (const str of statusSpeciesAPI) { // eslint-disable-line
              if (!tmpSpecies.includes(str)) {
                tmpSpecies.push(str);
              }
            }
            if (!tmpSpecies.includes(false)) {
              cart.state.requestStatusSpecies = tmpSpecies[0]; // eslint-disable-line
            }
          }
        });
      });
    },
    mergeArray: () => {
      cart.state.listCarts.forEach((item) => {
        if (item.species.length === 0) {
          item.speciesName = 'species uknown'; // eslint-disable-line
        }
        item.species.forEach((itemURL) => {
          cart.state.speciesListCarts.forEach((itemSpecies) => {
            if (itemURL === itemSpecies.url) {
              item.speciesName = itemSpecies.species; // eslint-disable-line
            }
          });
        });
      });
      if (searchModule.state.isActiveSearch === false) {
        cart.state.listCharacters = cart.state.listCarts;
      } else {
        cart.state.searchListCharacters = cart.state.listCarts;
      }
      cart.state.mergeStatusArray = true;
      if (views.state.viewNameCarts === 'LoadingPage') {
        views.state.viewNameCarts = 'NamePerson';
      }
    },
    defaultWidth: () => {
      document.querySelector('body').style.overflowY = 'auto';
      document.querySelector('body').style.pointerEvents = 'auto';
      const withScroll = document.documentElement.clientWidth;
      const outScroll = window.innerWidth;
      const body = document.querySelector('body');
      const headerTitle = document.querySelector('#Header>.logo');
      const left = document.querySelectorAll('.left');
      if (withScroll < outScroll) {
        const delta = (outScroll - withScroll) * 100 / outScroll;
        const newDelta = parseFloat(delta.toFixed(2), 10);
        body.style.width = (100 + newDelta) + '%'; // eslint-disable-line
        body.style.overflowX = 'hidden';
        headerTitle.style.paddingLeft = -newDelta + '%'; // eslint-disable-line
        for (let i = 0; i < left.length; i++) { // eslint-disable-line
          left[i].style.paddingLeft = -newDelta + '%'; // eslint-disable-line
        }
      }
      if (outScroll <= 767) {
        body.style.width = outScroll;
      }
    },
    otherDefaultWidth: () => {
      common.state.showNavLists = true;
      document.querySelector('body').style.overflowY = 'auto';
      document.querySelector('body').style.pointerEvents = 'auto';
    },
    pagination: (state, payload) => {
      let tmpPeople = '';
      Vue.http.get(swapi.pagesAPI + payload).then((response) => {
        if (page.state.isActive === false) {
          const pages = (Math.ceil(response.body.count / 10) + 1);
          for (let i = 2; i < pages; i++) { // eslint-disable-line
            page.state.listPages.push(i);
          }
        }
        page.state.isActive = true;
        cart.state.requestStatusPeople = response.ok;
        tmpPeople = response.body.results;
        tmpPeople.forEach((itemPeople) => {
          itemPeople.imageName = ''; // eslint-disable-line
          itemPeople.image = ''; // eslint-disable-line
          itemPeople.speciesName = ''; // eslint-disable-line
          itemPeople.imageName = itemPeople.name.charAt(0).toLowerCase() + itemPeople.name.slice(1); // eslint-disable-line
          itemPeople.imageName = itemPeople.imageName.replace('-', '').replace(' ', '').replace(' ', ''); // eslint-disable-line
          cart.state.images.forEach((item) => {
            if (itemPeople.imageName === item.imageName) {
              itemPeople.image = item.url; // eslint-disable-line
            }
          });
          cart.state.listCarts = tmpPeople;
          cart.state.speciesListCarts.push(itemPeople.species);
        });
      });
    },
    paginationWidthStart: () => {
      document.querySelector('body').style.overflowY = 'hidden';
      document.querySelector('body').style.pointerEvents = 'none';
      document.querySelector('#AllHeroes').style.width = common.state.clientWidth + 'px'; // eslint-disable-line
      document.querySelector('#pagination').style.width = common.state.clientWidth + 'px'; // eslint-disable-line
      document.querySelector('footer').style.width = common.state.clientWidth + 'px'; // eslint-disable-line
      document.querySelector('header').style.width = common.state.clientWidth + 'px'; // eslint-disable-line
    },
    paginationWidthStop: () => {
      document.querySelector('body').style.overflowY = 'auto';
      document.querySelector('body').style.pointerEvents = 'auto';
      document.querySelector('#AllHeroes').style.width = common.state.clientWidth + 'px'; // eslint-disable-line
      document.querySelector('#pagination').style.width = common.state.clientWidth + 'px'; // eslint-disable-line
      document.querySelector('footer').style.width = common.state.clientWidth + 'px'; // eslint-disable-line
      document.querySelector('header').style.width = common.state.clientWidth + 'px'; // eslint-disable-line
    },
  },
};
