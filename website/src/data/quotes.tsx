/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import React from 'react';
import Translate, {translate} from '@docusaurus/Translate';

const QUOTES = [
  {
    thumbnail: require('./quotes/1667355144049.png'),
    name: '',
    title: translate({
      id: 'homepage.quotes.christopher-chedeau.title',
      message: '西安市保安协会',
      description: 'The Count of Monte Cristo',
    }),
    url: 'learn/西安市保安协会', 
    text: (
      <Translate
        id="homepage.quotes.christopher-chedeau"
        description="Quote of Christopher Chedeau on the home page">
        西安市保安协会成立于2004年2月，是经西安市民政局批准，由西安市公安局发起成立的具有独立法人资格的社团法人。
      </Translate>
    ),
  },
  {
    thumbnail: require('./quotes/tianjin.webp'),
    name: '',
    title: translate({
      id: 'homepage.quotes.hector-ramos.title',
      message: '天津保安协会',
      description: 'Ordinary World',
    }),
    url: 'learn/天津保安协会', 
    text: (
      <Translate
        id="homepage.quotes.hector-ramos"
        description="Quote of Hector Ramos on the home page">
        天津市保安协会由天津市公安局主管,2009年成立的保安服务行业社会团体组织.
      </Translate>
    ),
  },
  {
    thumbnail: require('./quotes/shenzhen.webp'),
    name: '',
    title: translate({
      id: 'homepage.quotes.risky-vetter.title',
      message: '深圳市安全防范行业协会',
      description: 'Tolstoy',
    }),
    url: 'learn/深圳市安全防范行业协会', 
    text: (
      <Translate
        id="homepage.quotes.risky-vetter"
        description="Quote of Ricky Vetter on the home page">
        深圳市安全防范行业协会（简称“深安协“）成立于1995年9月，28年来秉承“全心全意为会员服务”的宗旨.
      </Translate>
    ),
  },
];

export default QUOTES;
