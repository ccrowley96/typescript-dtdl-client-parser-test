import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { ModelParserFactory, ModelParsingOption } from 'azure-iot-parser-node';
import TeslaModels from './DtdlModels/TeslaExampleModels.json';

function App() {

  useEffect(() => {
    const parseModelsAsync = async () => {
      const parser = ModelParserFactory.create(ModelParsingOption.PermitAnyTopLevelElement);
      const modelDict = await parser.parse(TeslaModels.map(m => JSON.stringify(m)))
      console.log(modelDict)
    }

    parseModelsAsync();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Test DTDL Parsing via azure-iot-parser-node</h2>
      </header>
    </div>
  );
}

export default App;
