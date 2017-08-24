import * as React from 'react';
import {render} from 'react-dom';

import todos from './todos';
import App from './components/App';

render(<App initialData = {todos}/>, document.getElementById('root'));