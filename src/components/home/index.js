import React, { Component } from 'react';
import {TextField, DatePicker, Slider, RaisedButton, CircularProgress} from 'material-ui';
import Classnames from 'classnames';
import areIntlLocalesSupported from 'intl-locales-supported';
import {areAllKeysEmpty} from '../../utils/index'
import {Modal, Button} from 'react-bootstrap'
import Moment from 'react-moment';


export default class Home extends Component {

  constructor(props) {
  super(props);
  };

  render() {

    return (
      <div>
        Hi
      </div>
    )
  }
}