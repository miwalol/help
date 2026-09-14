import H2 from './H2.astro';
import H3 from './H3.astro';
import H4 from './H4.astro';
import Pre from './Pre.astro';
import Code from './Code.astro';
import P from './P.astro';
import Ul from './Ul.astro';
import Ol from './Ol.astro';
import Img from './Img.astro';
import A from './A.astro';
import Th from './Th.astro';
import Td from './Td.astro';
import Badge from '../Badge.astro';

export const mdxComponents = {
  h2: H2,
  h3: H3,
  h4: H4,
  pre: Pre,
  code: Code,
  p: P,
  ul: Ul,
  ol: Ol,
  img: Img,
  a: A,
  th: Th,
  td: Td,
  Badge,
};
