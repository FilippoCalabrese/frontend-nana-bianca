import React from 'react';

import { storiesOf } from '@storybook/react';
import {Lines, Table} from '../App.js';
import {Form} from "../App";



storiesOf('Lines', module)
    .add('default', () => {
        const elements = [
            {
                "titolo": 'Lorem ipsum',
                "contenuto": 'lorem ipsum dolor sit amet',
            },
        ];
        return <Lines elements={elements}/>
    })
    .add('empty', () => {
        return <Lines elements={[]}/>;
    })

storiesOf('Table', module)
    .add('default', () => {
        const elements = [
            {
                "titolo": 'Lorem ipsum',
                "contenuto": 'lorem ipsum dolor sit amet',
            },
            {
                "titolo": 'Lorem ipsum',
                "contenuto": 'lorem ipsum dolor sit amet',
            },
        ];
        return <Table callback={null} elements={elements}/>
    })
    .add('empty', () => {
        return <Table callback={null} elements={[]}/>
    });

storiesOf('Form', module)
    .add('default', ()=> {
        return <Form callbackSubmit={null} callbackChange={null}/>
    });