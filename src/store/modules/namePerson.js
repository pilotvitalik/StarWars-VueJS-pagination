import storageRef from '../../main'; // eslint-disable-line

export default {
  state: {
    images: '', // list of fotos of characters
    speciesListCarts: [],
    listCarts: '',
    listCharacters: '', // array for namePerson component
    searchListCharacters: '', // array for namePerson component with result's search
    requestStatusPeople: false,
    requestStatusSpecies: false,
    mergeStatusArray: false,
    counter: 0,
  },
  mutations: {
    receiveImg: (state) => {
      let tempImage = [];
      storageRef.child('people').listAll().then((response) => {
        tempImage = response.items.map((item) => {
          let index = '';
          index = item.name.indexOf('.');
          return {
            imageName: item.name.slice(0, index),
            imageURL: item.fullPath,
            url: '',
          };
        });
        tempImage.forEach((item) => {
          storageRef.child(item.imageURL).getDownloadURL().then((url) => {
            item.url = url; // eslint-disable-line
          });
        });
        state.images = tempImage;
      });
    },
  },
};
