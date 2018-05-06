import React from 'react';
import { remote } from 'electron';

class SelectFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filePaths: props.initFilePath };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { dialog } = remote.require('electron');
    this.state.filePaths = dialog.showOpenDialog(
      { properties: ['openFile', 'multiSelections'],
        filters: [
          { name: 'Excels', extensions: ['xlsx', 'xls'] },
          { name: 'All Files', extensions: ['*'] },
        ],
      });
    if (this.state.filePaths !== undefined) {
      const excel2json = remote.getGlobal('services').excel2json;
      const json2table = remote.getGlobal('services').json2table;
      this.state.filePaths.forEach((x) => {
        const json = excel2json.readFromFile(x);
        const str = json2table.jsonToTable(json, 'E:/nodejs/test/lua.ejs');
        console.log(json);
        console.log(str);
      });
    }
  }

  render() {
    return (<div>
      <h2>the file path is {this.filePaths}</h2>
      <input type="text" value="" />
      <button onClick={this.handleClick}>选择文件</button>
    </div>);
  }
}

export default SelectFile;
