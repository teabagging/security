/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Translate, {translate} from '@docusaurus/Translate';

export type FeatureItem = {
  title: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
  text: JSX.Element;
  url?: string;
};

const FEATURES: FeatureItem[] = [
  {
    title: translate({
      message: '用心守护平凡岗位的安防女神',
      id: 'homepage.features.powered-by-mdx.title',
    }),
    image: {
      src: '/img/1710123459176.jpg',
      width: 1009.54,
      height: 717.96,
    },
    text: (
      <Translate id="homepage.features.powered-by-mdx.text">
        她们在平凡的岗位上默默付出，时刻以客户安全为己任，诠释着让社会更安全、让生活更安心的庄严承诺。她们虽无惊涛，却如涓涓细流在坚守中直抵人心，克己担当。
      </Translate>
    ),
    url: 'learn/安防女神',
  },
  {
    title: translate({
      message: ' 武汉市深入开展警保联勤联动工作',
      id: 'homepage.features.built-using-react.title',
    }),
    image: {
      src: '/img/d792728f83e32f2fa6c74701518f432b.jpg',
      width: 1108,
      height: 731.18,
    },
    text: (
      <Translate id="homepage.features.built-using-react.text">
     ✅共筑平安防线 守护城市安宁 武汉市深入开展警保联勤联动工作，创新模式 打造“黄鹤卫士”品牌，“平安地铁联盟” 共筑安全防线
      </Translate>
    ),
    url: 'learn/警保联勤联动工作',
  },
  {
    title: translate({
      message: '浙江保安行业吹响安保决战冲锋号',
      id: 'homepage.features.ready-for-translations.title',
    }),
    image: {
      src: '/img/1690536398343787.png',
      width: 1137,
      height: 776.59,
    },
    text: (
      <Translate id="homepage.features.ready-for-translations.text">
       迎杭州亚运！浙江保安行业吹响安保决战冲锋号,闻令而动、鼓足干劲，将以更饱满的热情、最好的姿态迎接世界嘉宾的检验，在第19届亚运盛会安保中展示浙江保安的勇敢和担当。
      </Translate>
    ),

    url: 'learn/安保决战冲锋号',
  },
  {
    title: translate({
      message: '金融护卫的千锤百炼',
      id: 'homepage.features.document-versioning.title',
    }),
    image: {
      src: '/img/251638271ihy.jpg',
      width: 1038.23,
      height: 693.31,
    },
    text: (
      <Translate id="homepage.features.document-versioning.text">
         🔥金融护卫的千锤百炼,集团押运分公司开展应急演练,向社会展示了其守护金融安全坚定决心与强大实力。在未来的工作中，押运分公司继续秉持专业精神，不断磨砺应急利剑.
      </Translate>
    ),
    url: 'learn/金融护卫的千锤百炼',
  },
  {
    title: translate({
      message: '驻翠微路支行保安队工作纪实',
      id: 'homepage.features.content-search.title',
    }),
    image: {
      src: '/img/12624382.png',
      width: 1137.97,
      height: 736.21,
    },
    text: (
      <Translate id="homepage.features.content-search.text">
        在保安服务工作中依靠严格管理和创新教育理念，引领保安员恪守“爱岗敬业、品行规范、服务社会、甘于奉献”的首都保安精神，全体保安员在工作中立足岗位、恪尽职守、忠诚担当、规范服务，圆满完成了各项安保服务，为翠微路支行的经营发展保驾护航。
      </Translate>
    ),
    url: 'learn/驻翠微路支行保安队工作纪实',
  },
];

export default FEATURES;
