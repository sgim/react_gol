import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import images from "./images";

const styles = {
  root: {
    display: 'flex',
    flexFlow: "row wrap",
    justifyContent: 'space-around',
    alignContent: "space-around",
    marginTop: 10
  },
  gridList: {
    width: "100%",
    height: 900,
    overflowY: 'auto',
    marginBottom: 24,
    marginTop: 24,
  },
  tile: {
    width: 200,
    height: 200,
    border: "6px black solid",
    borderRadius: "6px",
    marginTop: 10
  },
  img: {
    width: "50%",
  }
};

const determineColumns = () => window.innerWidth / 200 | 0;

const Gallery = () => (
  <div style={styles.root}>
    {images.list.map((tile, i) => (
    <div style={styles.tile} key={i} >
      <img style={styles.img} src={tile.src} />
    </div>
    ))}
  </div>
);

const Gallery2 = () => (
  <div style={styles.root}>
  <GridList
  cellHeight={200}
  cols={6}
  style={styles.gridList}
  >
  {images.list.map((tile, i) => (
    <GridTile
    key={i}
    title={tile.title}
    subtitle={<span>by <b>{tile.author}</b></span>}
    style={styles.tile}
    >
    <img style={styles.img} src={tile.src} />
    </GridTile>
  ))}
  </GridList>
  </div>
);

export default Gallery;
