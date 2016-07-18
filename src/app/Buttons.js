import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

const style = {
  margin: 12,
  textAlign: "center",
};

export default class Buttons extends React.Component{
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this.changeWidth = this.changeWidth.bind(this);
    this.changeHeight = this.changeHeight.bind(this);
    this.state = {
      open: false,
      width: 20,
      height: 20
    };
  }
  showOptions() {
    this.setState({open: !this.state.open});
  }
  changeHeight(e, i, height) {
    this.setState({height});
  }
  changeWidth(e, i, width) {
    this.setState({width});
  }
  onClick() {
    this.props.func();
  }
  // I need to add more style to these buttons
  render() {
    return (
    <div>
    <RaisedButton label="Play"
      onTouchTap={this.onClick} style={style} />
    <RaisedButton label="Reset" primary={true} style={style} />
    <RaisedButton label="Random" secondary={true} style={style} />
    <RaisedButton label="Options"
    secondary={true}
    style={style}
    onTouchTap={this.showOptions}/>
    <br />
    <Drawer open={this.state.open}>
      <MenuItem>Menu Item</MenuItem>
      <MenuItem>Menu Item 2</MenuItem>
      <SelectField value={this.state.width} onChange={this.changeWidth}>
      {[10,20,30,40,50].map((value) => (
        <MenuItem key={value} value={value} primaryText={value} />
      ))}
      </SelectField>
      <SelectField value={this.state.height} onChange={this.changeHeight}>
      {[10,20,30,40,50].map((value) => (
        <MenuItem key={value} value={value} primaryText={value} />
      ))}
      </SelectField>
    </Drawer>
    </div>
    )
  }
};

