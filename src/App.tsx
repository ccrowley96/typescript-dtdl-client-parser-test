import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { createParser, ModelParsingOption, ParsingError } from '@azure/dtdl-parser';
import TeslaModels from './DtdlModels/TeslaExampleModels.json';

class DTDLModelParser {
    static async parseStringModels(modelStrings: Array<string>) {
        const modelParser = createParser(
            ModelParsingOption.PermitAnyTopLevelElement
        );
        modelParser.options = ModelParsingOption.PermitAnyTopLevelElement;
        const modelDict = await modelParser.parse(modelStrings);
        console.log(modelDict);
        return modelDict;
    }
}


function App() {
  useEffect(() => {
    const parseModelsAsync = async () => {
      try {
        const modelDict = await DTDLModelParser.parseStringModels(TeslaModels.map(m => JSON.stringify(m)))
        console.log(modelDict)  
      } catch (err: any) {
        if (err._parsingErrors) {
          const parsingErrors: Array<ParsingError> = err._parsingErrors;
          console.log(parsingErrors)
          
        } else {
          console.error(err);
        }
      }
      
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
