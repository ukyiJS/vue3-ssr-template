import { Pinia } from 'pinia';
import { ParsedUrlQuery } from 'querystring';
import { ConfigThirdPartyScript, Render } from '@/types/ssr';
import { appConf } from './config';

const renderState = (store: Pinia) => {
  if (!store) return '';
  return `<script>window.__INITIAL_STATE__=${JSON.stringify(store.state.value)}</script>`;
};

const renderStyles = (styles: string) => `<style>${styles}</style>`;

const convertScriptConfigToHtml = (scriptConfig: ConfigThirdPartyScript) => `<script \
${scriptConfig.uri ? `src="${scriptConfig.uri}"` : ''}\
${scriptConfig.id ? `id="${scriptConfig.id}"` : ''}\
${scriptConfig.defer ? 'defer' : ''}\
${scriptConfig.async ? 'async' : ''}>\
${scriptConfig.body || ''}\
</script>`;

const renderThirdPartyScripts = (query: ParsedUrlQuery, headOrBody: 'head' | 'body') => {
  if (!appConf || !appConf.thirdPartyScripts || ('ignore-third-party' in query)) return '';

  return appConf.thirdPartyScripts
    .filter(entry => entry.node === headOrBody)
    .map(scriptConfig => convertScriptConfigToHtml(scriptConfig))
    .join('\n');
};

const renderDevServerScript = () => {
  if (process.env.VITE) return '<script type="module" src="/src/entry-client.ts"></script>';
  return '';
};

const render: Render = (req, res, templateHtml, htmlAttrs, headTags, bodyAttrs, styles, store, appHtml) => templateHtml
  .replace('<html>', `<html ${htmlAttrs}>`)
  .replace('<!-- head-tags  -->', headTags)
  .replace('<body>', `<body ${bodyAttrs}>`)
  .replace('<!-- initial-state -->', renderState(store))
  .replace('<!-- styles -->', renderStyles(styles))
  .replace('<!-- third-party-head -->', renderThirdPartyScripts(req.query as ParsedUrlQuery, 'head'))
  .replace('<!-- third-party-body -->', '')
  .replace('<!-- dev-server-script -->', renderDevServerScript())
  .replace('<!-- app-html -->', appHtml);

export default render;
