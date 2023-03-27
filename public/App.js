import React from 'react';
import transformObject from './objectTransformer'; // import the objectTransformer.js file

function App() {
  const initialObject = {
    a: 123,
    b: 'abc',
    c: [1, 2, 3],
  };

  const transformedObject = transformObject(initialObject);

  console.log(transformedObject);

  return <div>Check the console for the transformed object</div>;
}

export default App;
