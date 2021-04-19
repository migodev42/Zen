import { CardInterface, CardProps } from 'antd/lib/card';
import React, { useState, useEffect } from 'react';
import style from './index.module.css';

function withCardStyle(Card: CardInterface) {


  return class extends React.Component<CardProps> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    // constructor(props) {
    //   super(props);
    // }
    render() {
      const { children, ...other_props } = this.props;

      return <Card className={style.Card} {...other_props} >{children}</Card>
    }
  }
}

export default withCardStyle;