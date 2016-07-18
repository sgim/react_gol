let images = {
  list: [],
  store: function () {
    
  },
  remove: function () {
    
  }
};
let stored = localStorage.storedImages;

if(!stored) {
  let list = [
    {
      src: 'http://vignette4.wikia.nocookie.net/mario/images/e/e4/Mario_Sprite.jpg/revision/latest?cb=20130828225140',
      title: 'Mario',
      author: 'Miyamoto',
    },
    {
      src: "http://vignette4.wikia.nocookie.net/deathbattle/images/2/21/Sonic_the_hedgehog_sprite_by_toshirofrog-d5h7hzc.png/revision/latest?cb=20131216153114",
      title: 'Sonic',
      author: 'Naka',
    },
    {
      src: "http://vignette3.wikia.nocookie.net/green-kirby-air-ride/images/6/62/Mega_man_sprite.jpg/revision/latest?cb=20150119041852",
      title: 'Mega Man',
      author: "Inafune"
    },
    {
      src: "http://vignette1.wikia.nocookie.net/zelda/images/1/18/Link_(Sprite)_The_Legend_of_Zelda.png/revision/latest?cb=20130117162823",
      title: 'Link',
      author: 'Miyamoto',
    },
    {
      src: "http://orig01.deviantart.net/0326/f/2008/354/c/2/crono___chrono_trigger_by_edwardvalentine.jpg",
      title: 'Chrono',
      author: 'Toriyama',
    },
  ];
  list.push(...list, ...list, ...list);
  localStorage.storedImages = JSON.stringify(list);
  images.list = list;
} else {
  images.list = JSON.parse(stored);
}

export default images;
