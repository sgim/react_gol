import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

const style = {
  margin: 12,
  textAlign: "center",
};

const sizeOptions = (sizes=[10,20,30,40,50]) => sizes.map((size) => (
  <MenuItem key={size} value={size} primaryText={size} />
));

const Sizes = (val, func, text) => (
  <SelectField
  value={val}
  onChange={func}
  floatingLabelText={"set grid "+text}
  floatingLabelFixed={true}>
  {sizeOptions()}
  </SelectField>
);

export default class Menu extends React.Component{
  constructor() {
    super();
    this.toggleOptions = this.toggleOptions.bind(this);
    this.state = {
      open: false
    };
  }
  toggleOptions() {
    this.setState({open: !this.state.open});
  }
  // I need to add more style to these buttons
  render() {
    let {state: {width, height, isPlaying},
      changeWidth, autoPlay, changeHeight,
      pauseGame, playGame, setupCells} = this.props.options;
    return (
    <div>
      <RaisedButton label={isPlaying ? "Pause": "Play"}
        onTouchTap={isPlaying ? pauseGame: autoPlay} style={style} />
      <RaisedButton label="Step" onTouchTap={playGame} style={style} />
      <RaisedButton label="Reset" onTouchTap={setupCells} primary={true} style={style} />
      <RaisedButton label="Options"
      secondary={true}
      style={style}
      onTouchTap={this.toggleOptions}/>
      <br />
      <Drawer open={this.state.open} >
        {Sizes(width, changeWidth, "width")}
        {Sizes(height, changeHeight, "height")}
        <RaisedButton label="CLOSE"
        onTouchTap={this.toggleOptions}
        primary={true}
        style={style}/>
      </Drawer>
    </div>
    )
  }
};

